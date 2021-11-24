/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { v4 as uuidv4 } from "uuid";

import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';

import { isEqual, getId, isOK, range } from '../../../helpers';
import { IDataOption, IDataTask } from '../../../interfaces/data';
import { fetchTableData } from '../../../reducers/actions/table';
import { AppDispatch, RootState } from '../../../store';
import { get, add, update } from '../../../reducers/api/table';
import { errToStr } from '../../../helpers/format';
import { getTaskOptions } from '../../../reducers/api/tasks';
import { Checkbox } from 'primereact/checkbox';

interface OwnProps {
    id?: number
}

const mapState = (state: RootState, props: OwnProps) => {
    const task = state.tasks.data.filter(v => v.id === props.id)[0];
    return {
        task,
        specialities: state.specialities.data,
        modes: state.modes.data,
    }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetchSpecialities: () => fetchTableData("specialities", 1, 100, {}, dispatch),
        fetchModes: () => fetchTableData("modes", 1, 100, {}, dispatch),
    }
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const defaults: IDataTask = {
    text: "",
    speciality: 1,
    grade: 1,
    mode: 1,
};

const GRADES = range(1, 16, (i: number) => ({ value: i, text: `${i} грейд` }));
const collection = "tasks";

interface IIsFetching {
    data: boolean
    specialities: boolean
    modes: boolean
    options: boolean
}
interface IErrors {
    data?: string
    specialities?: string
    modes?: string
    options?: string
    save?: string
}
interface ITask extends IDataTask {
    options?: IDataOption[]
}
const defFetchingState = {
    data: false,
    specialities: false,
    modes: false,
    options: false,
}
const TaskForm: FC<OwnProps & PropsFromRedux & RouteComponentProps> = (props): JSX.Element => {
    const {
        id,
        task,
        specialities,
        modes,
        fetchSpecialities,
        fetchModes,
    } = props;
    const [errors, setErrors] = useState<IErrors>({});
    const [fetching, setFetching] = useState<IIsFetching>(defFetchingState);
    const [dirty, setDirty] = useState(false);

    const [data, setData] = useState<ITask>({ ...defaults, ...(task || {}) });
    const initials = useRef<ITask>({ ...defaults, ...(task || {}) });

    const doSave = () => {
        setErrors({ ...errors, save: undefined });
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

    useEffect(() => {
        if (!specialities.length && !fetching.specialities && fetchSpecialities) {
            setFetching({ ...fetching, specialities: true });
            fetchSpecialities();
        } else if (specialities.length) {
            setFetching({ ...fetching, specialities: false });
        }
    }, [specialities, fetching, fetchSpecialities]);
    useEffect(() => {
        if (!modes.length && !fetching.modes && fetchModes) {
            setFetching({ ...fetching, modes: true });
            fetchModes();
        } else if (modes.length) {
            setFetching({ ...fetching, modes: false });
        }
    }, [modes, fetching, fetchModes]);
    useEffect(() => {
        if (id && !data && !fetching.data) {
            setFetching({ ...fetching, data: true });
            setErrors({...errors, data: undefined});
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
                    setFetching({ ...fetching, data: false });
                });
        } else if (id && !data.options?.length && !fetching.options) {
            setFetching({ ...fetching, options: true });
            setErrors({...errors, options: undefined});
            getTaskOptions(id)
                .then(res => {
                    if (isOK(res)) return res.json();
                })
                .then(json => {
                    setData({ ...data, options: json });
                })
                .catch(err => {
                    setErrors({ ...errors, options: errToStr(err) });
                })
                .finally(() => {
                    setFetching({ ...fetching, options: false });
                });
        }
    }, [id, data]);

    useEffect(() => {
        const isSame = isEqual(data, initials.current, false);
        setDirty(!isSame);
    }, [data, initials]);
    
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
                <InputTextarea
                    id="text"
                    name="text"
                    value={data.text || ""}
                    onChange={(e) => {
                        setData({ ...data, text: e.target.value });
                    }}
                    autoResize={true}
                    rows={3}
                    cols={80}
                />
                <label htmlFor="text">Текст задания</label>
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
                <Dropdown
                    id="mode"
                    name="mode"
                    value={getId(data.mode)}
                    options={modes}
                    onChange={(evt) => {
                        setData({ ...data, mode: evt.value });
                    }}
                    optionValue="id"
                    optionLabel="name"
                />
                <label htmlFor="speciality">Режим ответа</label>
            </span>
            <fieldset className="flex-v gap-20">
                {data.options?.map(op => {
                    return <div className="flex flex-v-center flex-between gap-20" key={uuidv4()}>
                        <span className="p-float-label">
                            <InputTextarea
                                id="text"
                                name="text"
                                value={op.text || ""}
                                // onChange={(e) => {
                                //     setData({ ...data, text: e.target.value });
                                // }}
                                autoResize={true}
                                rows={1}
                                cols={60} />
                            <label htmlFor="text">Вариант ответа</label>
                        </span>
                            {getId(data.mode) === 1 ? 
                                <div className="p-field-radiobutton">
                                    <RadioButton checked={op.correct} />
                                    <label>Правильный ответ</label>
                                </div>
                                :
                                <div className="p-field-checkbox">
                                    <Checkbox checked={op.correct} />
                                    <label>Правильный ответ</label>
                                </div>
                            }
                    </div>;
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

export default connector(withRouter(TaskForm));
