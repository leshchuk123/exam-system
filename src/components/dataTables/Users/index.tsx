import React, { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Table from "../DataTable";
import { PaginatorPageState } from 'primereact/paginator';
import { DataTableSortParams, DataTableFilterParams, DataTableFilterMeta, DataTableFilterMetaData } from 'primereact/datatable';

import { fetchUsers } from "../../../reducers/actions/users";
import { IDataSpeciality, IDataUser, IListOptions } from "../../../interfaces/data";
import { FETCH_STATE } from "../../../constants/data";
import { USERS } from "../../../constants/actions";
import { dateFormater } from "../../../helpers";
import { specialityTemplate, userNameTemplate } from "../fieldsTemplates";

const mapState = (state: RootState) => {
    const { data, page, total, pageSize, status, error, sort, filter } = state.users;
    const { userUid } = state.user.data;
    return { data, page, total, pageSize, status, error, userUid, sort, filter }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetchUsers: (page:number, pageSize:number, options:IListOptions) => fetchUsers(page, pageSize, options, dispatch),
        clearData: () => dispatch({ type: USERS.CLEAR }),
    }
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const UsersList: FC<PropsFromRedux> = (props): JSX.Element => {
    const {
        data,
        page,
        total,
        pageSize,
        status,
        error,
        userUid,
        sort,
        filter,
        fetchUsers,
        clearData,
    } = props;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userUid) fetchUsers(Number(page), Number(pageSize), {sort, filter});
        else clearData();
    }, [userUid]);

    useEffect(() => {
        setLoading(status === FETCH_STATE.LOADING);
    }, [status]);

    const onPageChange = (e: PaginatorPageState) => {
        let { page, rows } = e;
        if (rows !== pageSize) page = 0;
        fetchUsers(Number(page + 1), Number(rows), {sort, filter})
    }
    const onSort = (sort: DataTableSortParams) => {
        fetchUsers(Number(page), Number(pageSize), {sort, filter})
    }

    return <Table
        records={data}
        columns={[
            {field: "lastName&firstName", header: "Имя", body: userNameTemplate, sortable: true},
            {field: "speciality", header: "Специальность", body: specialityTemplate, sortable: true},
            {field: "grade", header: "Грейд", sortable: true},
            {field: "hiringDate", header: "Дата найма", body: (row: IDataUser) => dateFormater(row.hiringDate), sortable: true},
            {field: "accessDate", header: "Последняя активность", body: (row: IDataUser) => dateFormater(row.accessDate), sortable: true},
        ]}
        total={total}
        pageSize={pageSize}
        page={page}
        onPageChange={onPageChange}
        onSort={onSort}
        loading={loading}
        sort={sort}
    />
}

export default connector(UsersList);
