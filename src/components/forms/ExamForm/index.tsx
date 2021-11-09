import { FC, useContext, useEffect, useRef, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { getExamTasks } from "../../../reducers/api/exams";
import { AppContext } from "../../../app/App";
import { IDataOption, IDataTask } from "../../../interfaces/data";
import { get } from "../../../reducers/api/table";
import { isOK } from "../../../helpers";
import { v4 as uuidv4 } from "uuid";

import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';

import "./examform.scss";
import Options, { OptionsChangeHandler } from "./Options";

export interface ITask extends IDataTask {
    options: IDataOption[]
    selected: number[]
    correct?: boolean
}

enum STATE {
    NONE,
    FETCHING,
    READY,
    STARTED,
    DONE,
    SUBMITED,
    RESOLVED,
    ABORTED,
    TERMINATED
}
const ExamForm: FC<RouteComponentProps> = (props): JSX.Element => {
    const { history } = props;
    const { user } = useContext(AppContext);

    const [tasks, setTasks] = useState<ITask[]>([]);
    const [specName, setSpecName] = useState("");
    const [grade, setGrade] = useState<number>();
    const [state, setState] = useState(STATE.NONE);
    const timer = useRef<number>();
    const [activeTask, setActiveTask] = useState(0);

    useEffect(() => {
        if (!!user.userUid) {
            setState(STATE.FETCHING);

            const { speciality, grade } = user;
            setGrade(Number(grade));

            getExamTasks(Number(speciality), Number(grade) + 1)
                .then(res => {
                    if (isOK(res)) return res.json();
                }).then(json => {
                    setTasks(json as ITask[]);
                }).catch(error => {
                    debugger
                });

            get("specialities", Number(speciality))
                .then(res => {
                    if (isOK(res)) return res.json();
                })
                .then(json => {
                    setSpecName(json.speciality.name);
                });
        } else {
            history.replace("/");
        }
    }, [user, history]);

    useEffect(() => {
        if (tasks.length) setState(STATE.READY);
    }, [tasks]);

    const startTest = () => {
        setState(STATE.STARTED);
        timer.current = window.setTimeout(terminateTest, 180000 * tasks.length);
    }
    const terminateTest = () => {
        timer.current = undefined;
        setState(STATE.TERMINATED);
    }

    const onOptionChange: OptionsChangeHandler = (index, value, correct) => {
        debugger
        tasks[index].selected = value;
        tasks[index].correct = correct;
        setTasks(tasks);
    };

    return <div className="content">
        {/* <h1>
            Тест [{specName.toLowerCase()}: грейд {Number(grade) + 1}]
        </h1> */}
        {state === STATE.READY && <div className="message flex-v flex-center gap-20">
            <div className="">
                Тест состоит из {tasks.length} заданий,
                на выполнение которых отводится {tasks.length * 3} мин.
            </div>
            <Button
                label="Начать тест"
                icon="pi pi-check"
                className="p-button-lg p-button-success"
                onClick={startTest}
            />
        </div>}
        {state === STATE.STARTED && <>
            <TabView activeIndex={activeTask} onTabChange={(e) => setActiveTask(e.index)} scrollable>
                {tasks.map((task, i) => {
                    return (
                        <TabPanel key={uuidv4()} header={<span style={{ fontWeight: 700 }}>{i+1}</span>}>
                            <div className="message flex-v gap-20">
                                {/* <div className="task-title">Задание {i + 1}</div> */}
                                <div className="task-text">{task.text}</div>
                                <Options task={task} index={i} onChange={onOptionChange} />
                            </div>
                        </TabPanel>
                    );
                })}
            </TabView>
        </>}
    </div>
};

export default withRouter(ExamForm);