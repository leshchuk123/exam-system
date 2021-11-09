import { FC, useEffect, useState } from "react";
import { withRouter , RouteComponentProps } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';
import { Button } from 'primereact/button';

import { IDataSpeciality, IDataUser } from "../../../interfaces/data";
import { ROLES } from "../../../constants/data";
import { comparator, isOK, range, translit } from "../../../helpers";
import { add, get, list, update } from "../../../reducers/api/table";

interface IProps {
    id?: number
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
const GRADES = range(1, 16, (i: number) => ({ value: i, text: `${i} грейд` }));

const collection = "users";

const UserForm: FC<IProps & RouteComponentProps> = (props): JSX.Element => {
    const [specialities, setSpecialities] = useState<IDataSpeciality[]>([]);
    const [dataError, setDataError] = useState<string>();
    const [fetchError, setFetchError] = useState<string>();
    const [saveError, setSaveError] = useState<string>();
    const [data, setData] = useState<IDataUser>(defaults);
    const [initials, setInitials] = useState<IDataUser>({ ...defaults });
    const [dirty, setDirty] = useState(false);

    const fetchSpec = () => {
        setFetchError(undefined);
        list("specialities", 1, 100, {})
            .then(res => {
                if (isOK(res)) return res.json();
            })
            .then(json => {
                setSpecialities(json.data)
            })
            .catch((err: Error | string) => {
                const error = err instanceof Error ?
                    `${err.name}: ${err.message}` : err;
                setFetchError(error);
            })
    }
    const fetchData = (id: number) => {
        setDataError(undefined);
        get(collection, id)
            .then(res => {
                if (isOK(res)) return res.json();
            })
            .then(json => {
                setData(json.users);
                setInitials({ ...json.users });
            })
            .catch((err: Error | string) => {
                const error = err instanceof Error ?
                    `${err.name}: ${err.message}` : err;
                setDataError(error);
            });
    };

    const doSave = () => {
        setSaveError(undefined)
        const promise = data.id === undefined ? add : update;
        promise(collection, data)
            .then(res => {
                if (isOK(res)) 
                    props.history.replace(`/${collection}`);
            })
            .catch((err: Error | string) => {
                const error = err instanceof Error ?
                    `${err.name}: ${err.message}` : err;
                setSaveError(error);
            });
    }
    const doReset = () => {
        setData(initials);
    }
    const doCancel = () => {
        if (props.history.length > 1) props.history.goBack();
        else props.history.replace("/");
    }

    useEffect(() => {
        if (props.id !== undefined) fetchData(props.id);
        fetchSpec();
    }, []);
    useEffect(() => {
        const isSame = comparator(data, initials, false);
        setDirty(!isSame);
    }, [data, initials]);
    useEffect(() => {
        setData({ ...data, email: `${translit(data.firstName || "")}.${translit(data.lastName || "")}@realize.dev`.toLowerCase() });
    }, [data.firstName, data.lastName]);

    return <div className="form">
        <div className="record-form">
            {!!(dataError || fetchError || saveError) &&
                <div className="message warn flex-v gap-20">
                {
                    [dataError, fetchError, saveError]
                        .filter(msg => !!msg)
                        .map(msg => <div className="msg">{msg}</div>)
                }
                </div>
            }
            <div>UID: {data.userUid}</div>
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
            <fieldset className="flex flex-v-center gap-20">
                <Button label="Сохранить" className="p-button-success" onClick={doSave} disabled={!dirty} />
                <Button label="Очистить" className="p-button-secondary" onClick={doReset} disabled={!dirty} />
                <Button label="Отмена" className="p-button-secondary" onClick={doCancel} />
            </fieldset>
        </div>
    </div>
}

export default withRouter(UserForm);
