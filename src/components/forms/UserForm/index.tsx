/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import {
    Checkbox,
    CheckboxChangeParams
} from 'primereact/checkbox';
import { Button } from 'primereact/button';

import { RootState } from "../../../store";
import { add, get, update } from "../../../reducers/api/table";
import { fetchTableData } from "../../../reducers/actions/table";
import { getId, GRADES, isEqual, isOK } from "../../../helpers";
import { errToStr } from "../../../helpers/format";

import { IDataUser } from "../../../interfaces/data";
import { ROLES } from "../../../constants/data";
import { IErrors, IIsFetching } from "./interfaces";
import { defaults, defFetchingState } from "./constants";

interface IProps {
    id?: number
}

const UserForm: FC<IProps> = (props): JSX.Element => {
    const { id } = props;

    const [errors, setErrors] = useState<IErrors>({});
    const [fetching, setFetching] = useState<IIsFetching>(defFetchingState);
    const [dirty, setDirty] = useState(false);

    const user = useSelector((state: RootState) => {
        return state.users.data.find(user => user.id === id)
    });
    const specialities = useSelector((state: RootState) => {
        return state.specialities.data;
    });

    const [data, setData] = useState<IDataUser>({
        ...defaults, ...(user || {})
    });
    const initials = useRef<IDataUser>({
        ...defaults, ...(user || {})
    });
    
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!specialities.length && !fetching.specialities) {
            setFetching({ ...fetching, specialities: true });
            fetchTableData("specialities", 1, 100, {}, dispatch);
        } else if (specialities.length) {
            setFetching({ ...fetching, specialities: false });
        }
    }, [specialities]);

    useEffect(() => {
        if (id && !data && !fetching.data) {
            setFetching({ ...fetching, data: true });
            get("users", id)
                .then(res => {
                    if (isOK(res)) return res.json();
                })
                .then(json => {
                    setData(json);
                })
                .catch(err => {
                    setErrors({
                        ...errors, data: errToStr(err)
                    });
                })
                .finally(() => {
                    setFetching({
                        ...fetching, data: true
                    });
                });
        }
    }, [id, data]);

    useEffect(() => {
        const isSame = isEqual(data, initials.current, false);
        setDirty(!isSame);
    }, [data, initials]);

    const doSave = () => {
        setErrors({ ...errors, save: undefined });
        const promise = data.id === undefined ? add : update;
        promise("users", data)
            .then(res => {
                if (isOK(res)) 
                    history.replace(`/users`);
            })
            .catch((err) => {
                setErrors({
                    ...errors, save: errToStr(err)
                });
            });
    }
    const doReset = () => {
        setData(initials.current);
    }
    const doCancel = () => {
        if (history.length > 1) history.goBack();
        else history.replace("/");
    }

    return <div className="form">
        <div className="record-form">
            {Object.values(errors).filter(v => !!v).length > 0 &&
                <div className="message warn flex-v gap-20">
                {
                    Object.values(errors).filter(v => !!v)
                        .map(msg => <div className="msg">{msg}</div>)
                }
                </div>
            }
            <span className="p-float-label">
                <InputText
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => {
                        setData({ ...data, name: e.target.value });
                    }}
                />
                <label htmlFor="name">Имя</label>
            </span>
            <span className="p-float-label">
                <InputText
                    id="surname"
                    name="surname"
                    value={data.surname}
                    onChange={(e) => {
                        setData({ ...data, surname: e.target.value });
                    }}
                />
                <label htmlFor="surname">Фамилия</label>
            </span>
            <span className="p-float-label">
                <InputText
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => {
                        setData({ ...data, email: e.target.value });
                    }}
                />
                <label htmlFor="email">E-mail</label>
            </span>
            <span className="p-float-label">
                <Dropdown
                    id="speciality"
                    name="speciality"
                    value={getId(data.speciality)}
                    options={specialities}
                    onChange={(evt) => {
                        setData({ ...data, speciality: evt.value });
                    }}
                    optionValue="id"
                    optionLabel="name"
                />
                <label htmlFor="speciality">Специальность</label>
            </span>
            <span className="p-float-label">
                <Dropdown
                    id="grade"
                    name="grade"
                    value={data.grade}
                    options={GRADES}
                    onChange={(evt) => {
                        setData({ ...data, grade: evt.value });
                    }}
                    optionValue="value"
                    optionLabel="text"
                />
                <label htmlFor="grade">Грейд</label>
            </span>
            <span className="p-float-label">
                <Calendar
                    id="hiringDate"
                    name="hiringDate"
                    value={data.hiringDate ? new Date(data.hiringDate) : undefined}
                    dateFormat="dd MM yy"
                    onChange={(evt) => {
                        setData({
                            ...data,
                            hiringDate: evt.value === undefined || !evt.value ?
                                undefined : (evt.value as Date).toISOString()
                        });
                    }}
                />
                <label htmlFor="hiringDate">Дата найма</label>
            </span>
            <span className="p-float-label">
                <Calendar
                    id="accessDate"
                    name="accessDate"
                    value={data.accessDate ? new Date(data.accessDate) : undefined}
                    dateFormat="dd MM yy"
                    onChange={(evt) => {
                        setData({
                            ...data,
                            accessDate: evt.value === undefined || !evt.value ?
                                undefined : (evt.value as Date).toISOString()
                        });
                    }}
                />
                <label htmlFor="accessDate">Дата последнего экзамена</label>
            </span>
            <fieldset className="flex flex-v-center gap-20">
                <legend>Группы</legend>
                {ROLES.map((role, i) => {
                    return <div
                        className="flex gap-10 p-field-checkbox"
                        key={uuidv4()}
                    >
                        <Checkbox
                            inputId={`role${i}`}
                            name="role"
                            value={role.value}
                            onChange={(e: CheckboxChangeParams) => {
                                setData({
                                    ...data,
                                    roles: e.checked ?
                                        ((data.roles || 0) | role.value) :
                                        ((data.roles || 0) ^ role.value)
                                });
                            }}
                            checked={((data.roles || 0) & role.value) > 0}
                        />
                        <label htmlFor={`role${i}`}>{role.text}</label>
                    </div>
                })}
            </fieldset>
            <fieldset className="flex flex-center gap-20">
                <Button
                    label="Сохранить"
                    className="p-button-success"
                    onClick={doSave} disabled={!dirty} />
                <Button
                    label="Очистить"
                    className="p-button-secondary"
                    onClick={doReset} disabled={!dirty} />
                <Button
                    label="Отмена"
                    className="p-button-secondary"
                    onClick={doCancel} />
            </fieldset>
        </div>
    </div>
}

export default UserForm;
