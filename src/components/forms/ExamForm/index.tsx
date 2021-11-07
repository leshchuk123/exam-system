import { FC, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { getExamTasks } from "../../../reducers/api/exams";

const ExamForm: FC<RouteComponentProps> = (props): JSX.Element => {

    useEffect(() => {
        getExamTasks(1, 14).then(response => {
            if (response.status === 200 || response.status === 201) {
                return response.json()
            }
        }).then(json => {
            debugger
        }).catch(error => {
            debugger
        });
    }, []);

    return <div className="content">
        <h1>
            
        </h1>
    </div>
};

export default withRouter(ExamForm);