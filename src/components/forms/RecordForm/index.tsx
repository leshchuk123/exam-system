import { FC, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import UserForm from "../UserForm";
import { dicCollections } from "../../../constants/data";

import "./RecordForm.scss"
import { IDataAll } from "../../../interfaces/data";
import { add, update } from "../../../reducers/api/table";

const RecordForm: FC<RouteComponentProps> = (props): JSX.Element => {

    const [collection, setCollection] = useState<string>();
    const [mode, setMode] = useState<string>();
    const [id, setId] = useState<number>();

    useEffect(() => {
        const { history } = props;
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
    </div>
};

export default withRouter(RecordForm);