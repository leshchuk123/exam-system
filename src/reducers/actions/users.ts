import { USER, USERS } from "../../constants/actions";
import { IDataUser, IListOptions, IDataTableAPIResponse } from "../../interfaces/data";
import { users } from "../api/users";
import { AppDispatch } from "../../store";
import { errToStr } from "../../helpers";

export const auth = (email: string, password: string, dispatch: AppDispatch) => {
    dispatch({ type: USER.FETCH_START });

    users.auth(email, password)
        .then(response => {
            if (response.status === 200 || response.status === 201) return response.json();
            else return null;
        })
        .then((json: { users: IDataUser }) => {
            dispatch({ type: USER.SET, payload: { data: json.users } });
        })
        .catch(error => {
            dispatch({ type: USER.FETCH_ERROR, payload: { error: error } })
        });
}

export const fetchUsers = (page:number, pageSize:number, options:IListOptions, dispatch:AppDispatch) => {
    dispatch({ type: USERS.FETCH_START });

    users.list(page, pageSize, options)
        .then(response => {
            if (response.status === 200 || response.status === 201) return response.json();
            else return null;
        })
        .then((json) => {
            const { page, total, pageSize, data, sort, filter } = json as IDataTableAPIResponse<IDataUser>;
            dispatch({
                type: USERS.SET,
                payload: { data, page, pageSize, total, sort, filter }
            });
        })
        .catch(error => {
            dispatch({
                type: USERS.FETCH_ERROR,
                payload: { error: errToStr(error) }
            })
        });
}

