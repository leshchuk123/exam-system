import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import UserForm from "../UserForm";
import { dicCollections } from "../../../constants/data";

import "./RecordForm.scss"
import TaskForm from "../TaskForm";

const RecordForm: FC = (): JSX.Element => {

    const [collection, setCollection] = useState<string>();
    const [mode, setMode] = useState<string>();
    const [id, setId] = useState<number>();

    const history = useHistory();
    
    useEffect(() => {
        const match = history.location.pathname.match(/\/([^\/]+)\/([^\/]+)(?:\/(\d+))?/);
        if (match) {
            setCollection(match[1]);
            setMode(match[2]);
            if (match[3]) setId(Number(match[3]));
        }
    }, []);

    return <div className="content">
        <h1>
            {dicCollections[String(collection)]}
            {id !== undefined ? ` [ID: ${id}]` : ""}
            :
            {mode === "new" ? " новая запись" : " редактирование"}
        </h1>

        {collection === "users" && <UserForm id={id} />}
        {collection === "tasks" && <TaskForm id={id} />}
    </div>
};

export default RecordForm;