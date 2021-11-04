import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Table from "../DataTable";
import { PaginatorPageState } from 'primereact/paginator';
import { DataTableFilterParams, DataTableSortParams } from 'primereact/datatable';

import { fetchTableData } from "../../../reducers/actions/table";
import { IDataUser, IListOptions } from "../../../interfaces/data";
import { FETCH_STATE } from "../../../constants/data";
import { dateFormater } from "../../../helpers";
import { rolesTemplate, specialityTemplate, userNameTemplate } from "../fieldsTemplates";

const mapState = (state: RootState) => {
    const { data, page, total, pageSize, status, error, sort, filter } = state.users;
    const { userUid } = state.user.data;
    return { data, page, total, pageSize, status, error, userUid, sort, filter }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetchUsers: (page:number, pageSize:number, options:IListOptions) => fetchTableData("users", page, pageSize, options, dispatch),
        clearData: () => dispatch({ type: "users_clear" }),
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
        if (userUid) {
            fetchUsers(Number(page), Number(pageSize), { sort, filter });
        }
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
    const onFilter = (flt: DataTableFilterParams) => {
        console.log(Date.now(), JSON.stringify(flt, null, 2))
    }

    return <Table
        records={data}
        columns={[
            {
                field: "lastName",
                header: "Имя",
                body: userNameTemplate,
                sortable: true,
                filter: true,
                filterPlaceholder: "по имени",
                filterMatchMode: "contains",
            },
            {
                field: "speciality",
                header: "Специальность",
                body: specialityTemplate,
                sortable: true,
                filter: true,
                filterPlaceholder: "по специальности",
                filterMatchMode: "contains",
            },
            {field: "grade", header: "Грейд", sortable: true},
            {field: "hiringDate", header: "Дата найма", body: (row: IDataUser) => dateFormater(row.hiringDate), sortable: true},
            {field: "accessDate", header: "Последняя активность", body: (row: IDataUser) => dateFormater(row.accessDate), sortable: true},
            {field: "roles", header: "Группы", body: rolesTemplate, sortable: true},
        ]}
        total={total}
        pageSize={pageSize}
        page={page}
        onPageChange={onPageChange}
        onSort={onSort}
        onFilter={onFilter}
        loading={loading}
        sort={sort}
    />
}

export default connector(UsersList);
