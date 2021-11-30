/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from "uuid";

import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';

import { isEqual, getId, isOK } from '../../../helpers';
import { fetchTableData } from '../../../reducers/actions/table';
import { RootState } from '../../../store';
import { get, add, update } from '../../../reducers/api/table';
import { errToStr } from '../../../helpers/format';
import { getTaskOptions } from '../../../reducers/api/tasks';
import { Checkbox } from 'primereact/checkbox';

import { IErrors, IIsFetching, ITask } from './interfaces';
import { defaults, defFetchingState, GRADES } from './constants';

interface IProps {
    id?: number
}

const TaskForm: FC<IProps> = (props): JSX.Element => {
    const { id } = props;

    const [errors, setErrors] = useState<IErrors>({});
    const [fetching, setFetching] = useState<IIsFetching>(defFetchingState);
    const [dirty, setDirty] = useState(false);

    const task = useSelector((state: RootState) => {
        return state.tasks.data.find(v => v.id === props.id);
    });
    const specialities = useSelector((state: RootState) => {
        return state.specialities.data;
    });
    const modes = useSelector((state: RootState) => {
        return state.modes.data;
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const [data, setData] = useState<ITask>({
        ...defaults, ...(task || {})
    });
    const initials = useRef<ITask>({
        ...defaults, ...(task || {})
    });

    const doSave = () => {
        setErrors({ ...errors, save: undefined });
        const promise = data.id === undefined ? add : update;
        promise("tasks", data)
            .then(res => {
                if (isOK(res)) 
                    history.replace(`/tasks`);
            })
            .catch((err) => {
                setErrors({ ...errors, save: errToStr(err) });
            });
    }
    const doReset = () => {
        setData(initials.current);
    }
    const doCancel = () => {
        if (history.length > 1) history.goBack();
        else history.replace("/");
    }

    useEffect(() => {
        if (!specialities.length && !fetching.specialities) {
            setFetching({ ...fetching, specialities: true });
            fetchTableData("specialities", 1, 100, {}, dispatch);
        } else if (specialities.length) {
            setFetching({ ...fetching, specialities: false });
        }
    }, [specialities, fetching]);
    useEffect(() => {
        if (!modes.length && !fetching.modes) {
            setFetching({ ...fetching, modes: true });
            fetchTableData("modes", 1, 100, {}, dispatch);
        } else if (modes.length) {
            setFetching({ ...fetching, modes: false });
        }
    }, [modes, fetching]);
    useEffect(() => {
        if (id && !data && !fetching.data) {
            setFetching({ ...fetching, data: true });
            setErrors({...errors, data: undefined});
            get("tasks", id)
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
                    return <div
                        className="flex flex-v-center flex-between gap-20"
                        key={uuidv4()}
                    >
                        <span className="p-float-label">
                            <InputTextarea
                                id="text"
                                name="text"
                                value={op.text || ""}
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
                <Button
                    label="Сохранить"
                    className="p-button-success"
                    onClick={doSave}
                    disabled={!dirty} />
                <Button
                    label="Очистить"
                    className="p-button-secondary"
                    onClick={doReset}
                    disabled={!dirty} />
                <Button
                    label="Отмена"
                    className="p-button-secondary"
                    onClick={doCancel} />
            </fieldset>
        </div>
    </div>
}

export default TaskForm;
