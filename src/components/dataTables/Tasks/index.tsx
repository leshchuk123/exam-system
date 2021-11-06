import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { PaginatorPageState } from 'primereact/paginator';
import { DataTableFilterMatchModeType, DataTableSortParams } from 'primereact/datatable';

import Table from "../DataTable";

import { IDataAll, IListOptions } from "../../../interfaces/data";
import { FETCH_STATE } from "../../../constants/data";
import { deleteTableRecord, fetchTableData } from "../../../reducers/actions/table";
import { modeTemplate, specialityTemplate } from "../fieldsTemplates";
import { range } from "../../../helpers";
import MultiSelectFilter from "../filterElemets/MultiSelectFilter";

const mapState = (state: RootState) => {
    const { data, page, total, pageSize, status, error, sort, filter } = state.tasks;
    const { userUid } = state.user.data;
    return {
        data, page, total, pageSize, status, error, userUid, sort, filter,
        specialities: state.specialities.data,
    }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetch: (page:number, pageSize:number, options:IListOptions) => fetchTableData("tasks", page, pageSize, options, dispatch),
        delRec: (id: number) => deleteTableRecord("tasks", id, dispatch),
        fetchSpecialities: () => fetchTableData("specialities", 1, 100, {}, dispatch),
        clearData: () => dispatch({ type: "tasks_clear" }),
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
        specialities: { value: [], matchMode: "in" },
        grades: { value: [], matchMode: "in" },
    }
};

const TasksList: FC<PropsFromRedux> = (props): JSX.Element => {
    const {
        data,
        page,
        total,
        pageSize,
        status,
        error,
        userUid,
        specialities,
        fetch,
        fetchSpecialities,
        delRec,
        clearData,
    } = props;

    const [filter, setFilter] = useState<IFilters>(defFilter);
    const [sort, setSort] = useState<DataTableSortParams>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userUid) {
            fetch(Number(page), Number(pageSize), { sort, filter });
            fetchSpecialities();
        }
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

    const onDelCallback = (row: IDataAll) => {
        debugger
        delRec(row.id);
    }

    return <Table
        title="Задания"
        collection="tasks"
        records={data}
        columns={[
            {field: "text", header: "Текст задания"},
            {
                field: "speciality",
                header: "Специальность",
                body: specialityTemplate,
                sortable: true,
                filter: true,
                filterElement: <MultiSelectFilter
                    filterName="specialities"
                    {...{ filter, setFilter }}
                />,
            },
            {
                field: "grade",
                header: "Грейд",
                sortable: true,
                filter: true,
                filterField: "grades",
                filterElement: <MultiSelectFilter
                    filterName="grades"
                    data={range(1, 16).map(v => ({ value: v, text: `${v} grade` }))}
                    {...{ filter, setFilter }}
                />,
            },
            {field: "mode", header: "Режим ответа", body: modeTemplate, sortable: true},
        ]}
        {...{ total, pageSize, page, loading, sort, onPageChange, onSort, onDelCallback, error }}
    />
}

export default connector(TasksList);
