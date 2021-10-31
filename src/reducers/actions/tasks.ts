import { TASKS } from "../../constants/actions";
import { IListOptions, IDataTableAPIResponse, IDataTask } from "../../interfaces/data";
import { AppDispatch } from "../../store";
import { errToStr } from "../../helpers";
import { tasks } from "../api/tasks";

export const fetchTasks = (page:number, pageSize:number, options:IListOptions, dispatch:AppDispatch) => {
    dispatch({ type: TASKS.FETCH_START });

    tasks.list(page, pageSize, options)
        .then(response => {
            if (response.status === 200 || response.status === 201) return response.json();
            else return null;
        })
        .then((json) => {
            const { page, total, pageSize, data, sort, filter } = json as IDataTableAPIResponse<IDataTask>;
            dispatch({
                type: TASKS.SET,
                payload: { data, page, pageSize, total, sort, filter }
            });
        })
        .catch(error => {
            dispatch({
                type: TASKS.FETCH_ERROR,
                payload: { error: errToStr(error) }
            })
        });
}

