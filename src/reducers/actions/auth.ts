import { IDataUser } from "../../interfaces/data";
import {
    auth as authApi,
    signOut as signOutApi
} from "../api/auth";
import { AppDispatch } from "../../store";
import { errToStr } from "../../helpers";

export const auth = (email: string, password: string, dispatch: AppDispatch) => {
    dispatch({ type: "user_fetch_start" });

    authApi(email, password)
        .then(response => {
            if (response.status === 200 || response.status === 201) return response.json();
            else return null;
        })
        .then((json: { users: IDataUser }) => {
            dispatch({ type: "user_set", payload: { data: json.users } });
        })
        .catch(error => {
            dispatch({ type: "user_fetch_error", payload: { error: errToStr(error) } })
        });
}

export const signOut = (uid: string, dispatch: AppDispatch) => {
    dispatch({ type: "user_fetch_start" });

    signOutApi(uid)
        .then(response => {
            if (response.status === 200 || response.status === 201) return response.json();
            else return null;
        })
        .then(() => {
            dispatch({ type: "user_signout", payload: true });
        })
        .catch(error => {
            dispatch({ type: "user_signout_error", payload: { error: errToStr(error) } })
        });
}
