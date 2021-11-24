/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useRef, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { getExamTasks } from "../../../reducers/api/exams";
import { AppContext } from "../../../app/App";
import { IDataAnswer, IDataAttempt, IDataOption, IDataSpeciality, IDataTask } from "../../../interfaces/data";
import { add, get } from "../../../reducers/api/table";
import { getId, isOK, range } from "../../../helpers";
import { v4 as uuidv4 } from "uuid";

import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';

import "./examform.scss";
import Options, { OptionsChangeHandler } from "./Options";
import Countdown, { COMMAND } from "../components/Countdown";
import { MS } from "../../../constants/data";
import { errToStr } from "../../../helpers/format";

export interface ITask extends IDataTask {
    options: IDataOption[]
    selected: number[]
    correct?: boolean
}

enum STATE {
    NONE, // загрузка компонента
    FETCHING, // получение данных
    ERROR, // произошла ошибка при получении данных
    READY, // данные получены (окно пиглашения)
    STARTED, // начало выполнения теста
    PROCESS, // тест выполнен частично
    DONE, // тест выполнен полностью и готов к отправке
    SUBMITING, // сохранение результатов
    ABORTED, // тест прерван пользователем
    TERMINATED, // истек таймер на выполнение теста
    RESOLVED, // результаты теста сохранены
}

const ExamForm: FC<RouteComponentProps> = (props): JSX.Element => {
    const { history } = props;
    // данные пользователя из контекста приложения
    const { user } = useContext(AppContext);

    // массив данных задач для теста
    const [tasks, setTasks] = useState<ITask[]>([]);
    // наименование специальности
    const [specName, setSpecName] = useState("");
    const [grade, setGrade] = useState<number>();
    // флаг текущего состояния
    const [state, setState] = useState(STATE.NONE);
    // номер активного задания теста
    const [activeTask, setActiveTask] = useState(0);
    const [doneTasks, setDoneTasks] = useState<boolean[]>(range(0, 10, false));
    const [timerCommand, setTimerCommand] = useState(COMMAND.STOP);
    const start = useRef<number>();
    const [error, setError] = useState("");

    useEffect(() => {
        const { userUid, speciality, grade } = user;
        if (!!userUid && Number(grade) < 16) {
            // если пользователь авторизован
            // и его грейд меньше максимального,
            // то он может проходить тест
            setState(STATE.FETCHING);

            setGrade(Number(grade));
            setError("");

            // запрос на получение данных для теста
            // по идентификатору специальности 
            // и текущему грейду пользователя
            getExamTasks(getId(speciality), Number(grade) + 1)
                .then(res => {
                    if (isOK(res)) return res.json();
                })
                .then(json => {
                    setTasks(json as ITask[]);
                    setState(STATE.READY);
                })
                .catch((error: Error | string) => {
                    setError(errToStr(error));
                    setState(STATE.ERROR);
                });

            if (!(speciality as IDataSpeciality).id) {
                get("specialities", Number(speciality))
                    .then(res => {
                        if (isOK(res)) return res.json();
                    })
                    .then(json => {
                        setSpecName(json.speciality.name);
                    });
            } else {
                setSpecName((speciality as IDataSpeciality).name);
            }
        } else {
            // если пользователь не авторизован
            // или у него максимальный грейд,
            // то он перенаправляется на главную страницу
            history.replace("/");
        }
    }, [user, history]);

    useEffect(() => {
        switch (state) {
            case STATE.SUBMITING:
            case STATE.ABORTED:
            case STATE.TERMINATED:
                doSave();
                break;
            case STATE.RESOLVED:
                history.replace("/history");
                break;
        }
    }, [state]);

    useEffect(() => {
        const todo = doneTasks.filter(v => !v);
        setState(
            todo.length === 0 ? STATE.DONE :
                todo.length === doneTasks.length ? STATE.STARTED :
                    STATE.PROCESS
        );
    }, [doneTasks]);

    const doStart = () => {
        start.current = Date.now();
        setState(STATE.STARTED);
        setTimerCommand(COMMAND.START);
    }
    const doSubmit = () => {
        setState(STATE.SUBMITING)
    }
    const doAbort = () => {
        if (window.confirm("Прервать выполнение теста?")) {
            setState(STATE.ABORTED);
        }
    }

    const onTimerOver = () => {
        setState(STATE.TERMINATED);
    }
    const onOptionChange: OptionsChangeHandler = (index, value, correct) => {
        tasks[index].selected = value;
        tasks[index].correct = correct;
        const done = [...doneTasks];
        done[index] = value.length > 0;
        setTasks(tasks);
        setDoneTasks(done);
    };

    const doSave = () => {
        setTimerCommand(COMMAND.STOP);

        const result: number = tasks.map(v => v.correct ? 1 : 0)
            .reduce((prev: number, next: number) => prev + next, 0);
        
        const attempt: IDataAttempt = {
            user: user.id,
            examDate: new Date().toISOString(),
            result
        };
        add<IDataAttempt>("attempts", attempt)
            .then(res => {
                if (isOK(res)) return res.json();
            })
            .then(json => {
                const id = json.id;
                const answers: IDataAnswer[] = [];
                tasks.forEach(task => {
                    if (task.selected.length > 0) {
                        answers.push(...task.selected.map(option => ({
                            attempt: id,
                            task: task.id,
                            option,
                        })));
                    } else {
                        answers.push({
                            attempt: id,
                            task: task.id,
                        });
                    }
                });
                answers.forEach(async answer => {
                    await add("answers", answer);
                })
                setState(STATE.RESOLVED);
        })
    }

    return <div className="content">
        <div className="flex flex-v-center flex-between">
            <h1>
                Тест [{specName.toLowerCase()}:
                грейд {Number(grade) + 1}]
            </h1>
            <Countdown
                className="task-timer"
                seed={MS.MINUTE * 3 * tasks.length}
                command={timerCommand}
                callback={onTimerOver}
            />
        </div>

        {state === STATE.READY && <div className="message flex-v flex-center gap-20">
            <div className="">
                Тест состоит из {tasks.length} заданий,
                на выполнение которых отводится {tasks.length * 3} мин.
            </div>
            <Button
                label="Начать тест"
                icon="pi pi-check"
                className="p-button-lg p-button-success"
                onClick={doStart}
            />
        </div>}

        {state === STATE.FETCHING && <div className="message info flex-v">Загрузка данных...</div>}

        {state === STATE.ERROR && <div className="message warn flex-v">{error}</div>}
        
        {(state === STATE.STARTED || state === STATE.PROCESS || state === STATE.DONE) && <>
            <TabView activeIndex={activeTask} onTabChange={(e) => setActiveTask(e.index)} scrollable>
                {tasks.map((task, i) => {
                    return (
                        <TabPanel
                            key={uuidv4()}
                            header={
                                <span className={`task-tab ${doneTasks[i] ? "done" : ""}`}>
                                    {i + 1}
                                </span>
                            }
                        >
                            <div className="message flex-v gap-20">
                                <div className="task-title">Задание {i + 1}</div>
                                <div className="task-text">{task.text}</div>
                                <Options 
                                    options={task.options} 
                                    selected={task.selected} 
                                    mode={Number(task.mode)} 
                                    index={i} 
                                    onChange={onOptionChange} 
                                />
                            </div>
                            {/* <pre>
                                {JSON.stringify(task.options,null,2)}
                            </pre> */}
                        </TabPanel>
                    );
                })}
            </TabView>
            <div className="flex flex-h-center flex-evenly">
                <Button
                    label="Отправить результаты"
                    icon="pi pi-check"
                    className={`p-button-lg p-button-${state === STATE.DONE ? "success" : "warning"}`}
                    onClick={doSubmit}
                    disabled={state === STATE.STARTED}
                />
                <Button
                    label="Прервать тест"
                    icon="pi pi-times"
                    className="p-button-lg p-button-danger"
                    onClick={doAbort}
                />
            </div>
        </>}

        {(state === STATE.SUBMITING || state === STATE.ABORTED || state === STATE.TERMINATED) &&
            <div className="message info flex-v">Сохранение данных...</div>
        }
    </div>
};

export default withRouter(ExamForm);