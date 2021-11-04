import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { PaginatorPageState } from 'primereact/paginator';
import { DataTableSortParams } from 'primereact/datatable';

import Table from "../DataTable";

import { IListOptions } from "../../../interfaces/data";
import { FETCH_STATE } from "../../../constants/data";
import { fetchTableData } from "../../../reducers/actions/table";
import { modeTemplate, specialityTemplate } from "../fieldsTemplates";

const mapState = (state: RootState) => {
    const { data, page, total, pageSize, status, error, sort, filter } = state.tasks;
    const { userUid } = state.user.data;
    return { data, page, total, pageSize, status, error, userUid, sort, filter }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetch: (page:number, pageSize:number, options:IListOptions) => fetchTableData("tasks", page, pageSize, options, dispatch),
        clearData: () => dispatch({ type: "tasks_clear" }),
    }
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TasksList: FC<PropsFromRedux> = (props): JSX.Element => {
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
        fetch,
        clearData,
    } = props;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userUid) fetch(Number(page), Number(pageSize), { sort, filter });
        else clearData();
    }, [userUid]);

    useEffect(() => {
        setLoading(status === FETCH_STATE.LOADING);
    }, [status]);

    const onPageChange = (pageData: PaginatorPageState) => {
        let { page, rows } = pageData;
        if (rows !== pageSize) page = 0;
        fetch(Number(page + 1), Number(rows), {sort, filter})
    }
    const onSort = (sort: DataTableSortParams) => {
        fetch(Number(page), Number(pageSize), {sort, filter})
    }

    return <Table
        records={data}
        columns={[
            {field: "text", header: "Текст задания"},
            {field: "speciality", header: "Специальность", body: specialityTemplate, sortable: true},
            {field: "grade", header: "Грейд", sortable: true},
            {field: "mode", header: "Режим ответа", body: modeTemplate, sortable: true},
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

export default connector(TasksList);
