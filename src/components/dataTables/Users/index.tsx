import React, { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Table from "../DataTable";

import { fetchUsers } from "../../../reducers/users";
import { IListOptions } from "../../../interfaces/data";

const mapState = (state: RootState) => {
    const { data, status, error } = state.users;
    return { data, status, error }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetchUsers: (page = 1, options: IListOptions = {}) => fetchUsers(page, options, dispatch),
    }
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const UsersList: FC<PropsFromRedux> = (props): JSX.Element => {
    const { data, status, error, fetchUsers } = props;

    useEffect(() => {
        fetchUsers()
    }, [])

    return <Table records={data} columns={[
        {field: "userUid", header: "UID"},
        {field: "firstName", header: "Имя"},
        {field: "lastName", header: "Фамилия"},
        {field: "speciality", header: "Специальность"},
        {field: "grade", header: "Грейд"},
        {field: "hiringDate", header: "Дата найма"},
        {field: "accessDate", header: "Последняя активность"},
    ]} />
}

export default connector(UsersList);
