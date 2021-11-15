import { FC, useEffect, useRef, useState } from "react";
import { withRouter , RouteComponentProps } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';
import { Button } from 'primereact/button';

import { IDataSpeciality, IDataUser } from "../../../interfaces/data";
import { ROLES } from "../../../constants/data";
import { comparator, isOK, range } from "../../../helpers";
import { errToStr, translit } from "../../../helpers/format";
import { add, get, list, update } from "../../../reducers/api/table";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { fetchTableData } from "../../../reducers/actions/table";

interface OwnProps {
    id?: number
}

const mapState = (state: RootState, props: OwnProps) => {
    const user = state.users.data.filter(v => v.id === props.id)[0];
    return {
        user,
        specialities: state.specialities.data,
        // modes: state.modes.data,
    }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetchSpecialities: () => fetchTableData("specialities", 1, 100, {}, dispatch),
        // fetchModes: () => fetchTableData("modes", 1, 100, {}, dispatch),
    }
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IIsFetching {
    data: boolean
    specialities: boolean
}
interface IErrors {
    data?: string
    specialities?: string
    save?: string
}
const defaults: IDataUser = {
    userUid: uuidv4(),
    firstName: "",
    lastName: "",
    email: "",
    speciality: undefined,
    grade: 1,
    hiringDate: undefined,
    accessDate: undefined,
    roles: 1,
};
const defFetchingState = {
    data: false,
    specialities: false,
}
const GRADES = range(1, 16, (i: number) => ({ value: i, text: `${i} грейд` }));

const collection = "users";

const UserForm: FC<OwnProps & PropsFromRedux & RouteComponentProps> = (props): JSX.Element => {
    const {
        id,
        user,
        specialities,
        fetchSpecialities,
    }=props
    const [errors, setErrors] = useState<IErrors>({});
    const [fetching, setFetching] = useState<IIsFetching>(defFetchingState);
    const [dirty, setDirty] = useState(false);

    const [data, setData] = useState<IDataUser>({ ...defaults, ...(user || {}) });
    const initials = useRef<IDataUser>({ ...defaults, ...(user || {}) });

    useEffect(() => {
        if (!specialities.length && !fetching.specialities && fetchSpecialities) {
            setFetching({ ...fetching, specialities: true });
            fetchSpecialities();
        } else if (specialities.length) {
            setFetching({ ...fetching, specialities: false });
        }
    }, [specialities, fetching, fetchSpecialities]);

    useEffect(() => {
        if (id && !data && !fetching.data) {
            setFetching({ ...fetching, data: true });
            get(collection, id)
                .then(res => {
                    if (isOK(res)) return res.json();
                })
                .then(json => {
                    setData(json);
                })
                .catch(err => {
                    setErrors({ ...errors, data: errToStr(err) });
                })
                .finally(() => {
                    setFetching({ ...fetching, data: true });
                });
        }
    }, [id, data, fetching]);

    useEffect(() => {
        const isSame = comparator(data, initials.current, false);
        setDirty(!isSame);
    }, [data, initials]);

    const doSave = () => {
        setErrors({ ...errors, data: undefined });
        const promise = data.id === undefined ? add : update;
        promise(collection, data)
            .then(res => {
                if (isOK(res)) 
                    props.history.replace(`/${collection}`);
            })
            .catch((err) => {
                setErrors({ ...errors, save: errToStr(err) });
            });
    }
    const doReset = () => {
        setData(initials.current);
    }
    const doCancel = () => {
        if (props.history.length > 1) props.history.goBack();
        else props.history.replace("/");
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
                    id="firstName"
                    name="firstName"
                    value={data.firstName}
                    onChange={(e) => {
                        setData({ ...data, firstName: e.target.value });
                    }}
                />
                <label htmlFor="firstName">Имя</label>
            </span>
            <span className="p-float-label">
                <InputText
                    id="lastName"
                    name="lastName"
                    value={data.lastName}
                    onChange={(e) => {
                        setData({ ...data, lastName: e.target.value });
                    }}
                />
                <label htmlFor="lastName">Фамилия</label>
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
                <label htmlFor="lastName">E-mail</label>
            </span>
            <span className="p-float-label">
                <Dropdown
                    id="speciality"
                    name="speciality"
                    value={data.speciality}
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
                    return <div className="flex gap-10 p-field-checkbox" key={uuidv4()}>
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
                <Button label="Сохранить" className="p-button-success" onClick={doSave} disabled={!dirty} />
                <Button label="Очистить" className="p-button-secondary" onClick={doReset} disabled={!dirty} />
                <Button label="Отмена" className="p-button-secondary" onClick={doCancel} />
            </fieldset>
        </div>
    </div>
}

export default connector(withRouter(UserForm));
