import React, { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Table from "../DataTable";
import { PaginatorPageState } from 'primereact/paginator';

import { fetchUsers } from "../../../reducers/users";
import { IDataUser, IListOptions } from "../../../interfaces/data";

const mapState = (state: RootState) => {
    const { data, page, total, pageSize, status, error } = state.users;
    return { data, page, total, pageSize, status, error }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetchUsers: (page: number, pageSize: number, options: IListOptions) => fetchUsers(page, pageSize, options, dispatch),
    }
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const UsersList: FC<PropsFromRedux> = (props): JSX.Element => {
    const { data, page, total, pageSize, status, error, fetchUsers } = props;

    useEffect(() => {
        fetchUsers(Number(page), Number(pageSize), {})
    }, []);

    const onPageChange = (e: PaginatorPageState) => {
        let { page, rows } = e;
        if (rows !== pageSize) page = 0;
        fetchUsers(Number(page + 1), Number(rows), {})
    }

    const userNameTemplate = (rowData: IDataUser): string => {
        return `${rowData.lastName} ${rowData.firstName}`;
    }
    const dateFormater = (str?: string) => str && str.length ? new Date(str).toLocaleDateString() : "";

    return <Table
        records={data}
        columns={[
            {header: "Имя", body: userNameTemplate},
            {field: "speciality", header: "Специальность"},
            {field: "grade", header: "Грейд"},
            {header: "Дата найма", body: (row: IDataUser) => dateFormater(row.hiringDate)},
            {header: "Последняя активность", body: (row: IDataUser) => dateFormater(row.accessDate)},
        ]}
        total={total}
        pageSize={pageSize}
        page={page}
        onPageChange={onPageChange}
    />
}

export default connector(UsersList);
