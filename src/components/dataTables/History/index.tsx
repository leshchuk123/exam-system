import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { PaginatorPageState } from 'primereact/paginator';
import { DataTableSortParams } from 'primereact/datatable';

import Table from "../DataTable";

import { IDataAttempt, IDataUser, IListOptions } from "../../../interfaces/data";
import { FETCH_STATE } from "../../../constants/data";
import { fetchTableData } from "../../../reducers/actions/table";
import { dateFormater } from "../../../helpers";

const mapState = (state: RootState) => {
    const { data, page, total, pageSize, status, error, sort, filter } = state.attempts;
    const { userUid } = state.user.data;
    return { data, page, total, pageSize, status, error, userUid, sort, filter }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetch: (page:number, pageSize:number, options:IListOptions) => fetchTableData("attempts", page, pageSize, options, dispatch),
        clearData: () => dispatch({ type: "attempts_clear" }),
    }
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface IAttemptsFilter {
    filters: {
    }
}

const defFilter: IAttemptsFilter = {
    filters: {
    }
}

const AttemptsList: FC<PropsFromRedux> = (props): JSX.Element => {
    const {
        data,
        page,
        total,
        pageSize,
        status,
        error,
        userUid,
        fetch,
        clearData,
    } = props;

    const [filter, setFilter] = useState<IAttemptsFilter>(defFilter);
    const [sort, setSort] = useState<DataTableSortParams>({
        sortField: "examDate",
        sortOrder: -1,
        multiSortMeta: undefined
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userUid) fetch(Number(page), Number(pageSize), { sort, filter });
        else clearData();
    }, [userUid, sort, filter]);

    useEffect(() => {
        setLoading(status === FETCH_STATE.LOADING);
    }, [status]);

    const onPageChange = (pageData: PaginatorPageState) => {
        let { page, rows } = pageData;
        if (rows !== pageSize) page = 0;
        fetch(Number(page + 1), Number(rows), {sort, filter})
    }

    const onSort = (sort: DataTableSortParams) => {
        setSort(sort);
    }

    const userNameTemplate = (record: IDataAttempt): string => {
        const user = record.user as IDataUser;
        return `${user.firstName} ${user.lastName}`;
    }
    const reviewerNameTemplate = (record: IDataAttempt): string => {
        const user = record.reviewer as IDataUser;
        return `${user.firstName} ${user.lastName}`;
    }
    return <Table
        title="История тестирования"
        records={data}
        columns={[
            { field: "user", header: "Экзаменуемый", body: userNameTemplate, filter: true },
            { field: "reviewer", header: "Проверяющий", body: reviewerNameTemplate, filter: true },
            { field: "examDate", header: "Дата", body: (row: IDataAttempt) => dateFormater(row.examDate), sortable: true },
            { field: "result", header: "Результат", sortable: true },
        ]}
        total={total}
        pageSize={pageSize}
        page={page}
        onPageChange={onPageChange}
        onSort={onSort}
        loading={loading}
        sort={sort}
    />;
}

export default connector(AttemptsList);
