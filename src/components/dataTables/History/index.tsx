import { FC, useContext, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { PaginatorPageState } from 'primereact/paginator';
import { DataTableFilterMatchModeType, DataTableSortParams } from 'primereact/datatable';

import Table from "../DataTable";

import { IDataAttempt, IDataUser, IListOptions } from "../../../interfaces/data";
import { FETCH_STATE } from "../../../constants/data";
import { fetchTableData } from "../../../reducers/actions/table";
import { dateFormater } from "../../../helpers/format";
import TextFilter from "../filterElemets/TextFilter";
import { AppContext } from "../../../app/App";

const mapState = (state: RootState) => {
    const { data, page, total, pageSize, status, error, sort, filter } = state.attempts;
    return { data, page, total, pageSize, status, error, sort, filter }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetch: (page:number, pageSize:number, options:IListOptions) => fetchTableData("attempts", page, pageSize, options, dispatch),
        clearData: () => dispatch({ type: "attempts_clear" }),
    }
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface IFilters {
    filters: {
        [name:string]: {
            value: string | number[] | number;
            matchMode: DataTableFilterMatchModeType;
        }
    }
}
const defFilter: IFilters = {
    filters: {
        "user.name": { value: "", matchMode: "contains" },
        "reviewer.name": { value: "", matchMode: "contains" },
    }
};


const AttemptsList: FC<PropsFromRedux> = (props): JSX.Element => {
    const {
        data,
        page,
        total,
        pageSize,
        status,
        error,
        fetch,
        clearData,
    } = props;

    const [filter, setFilter] = useState<IFilters>(defFilter);
    const [sort, setSort] = useState<DataTableSortParams>();
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AppContext);

    useEffect(() => {
        if (!!user.userUid) fetch(Number(page), Number(pageSize), { sort, filter });
        else clearData();
    }, [user, sort, filter]);

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
        collection="attempts"
        records={data}
        editable={false}
        columns={[
            {
                field: "user",
                header: "Экзаменуемый",
                body: userNameTemplate,
                filter: true,
                filterElement: <TextFilter
                    filterName="user.name"
                    {...{ filter, setFilter }}
                />,
            },
            {
                field: "reviewer",
                header: "Проверяющий",
                body: reviewerNameTemplate,
                filter: true,
                filterElement: <TextFilter
                    filterName="reviewer.name"
                    {...{ filter, setFilter }}
                />,
            },
            { field: "examDate", header: "Дата", body: (row: IDataAttempt) => dateFormater(row.examDate), sortable: true },
            { field: "result", header: "Результат", sortable: true },
        ]}
        {...{ total, pageSize, page, loading, sort, onPageChange, onSort, error }}
    />;
}

export default connector(AttemptsList);
