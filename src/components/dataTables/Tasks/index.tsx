/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PaginatorPageState } from 'primereact/paginator';
import {
    DataTableFilterMatchModeType,
    DataTableSortParams
} from 'primereact/datatable';

import { AppContext } from "../../../app/App";
import { RootState } from "../../../store";
import Table from "../DataTable";
import MultiSelectFilter from "../filterElemets/MultiSelectFilter";
import {
    modeTemplate,
    specialityTemplate
} from "../fieldsTemplates";

import { range } from "../../../helpers";
import {
    deleteTableRecord,
    fetchTableData
} from "../../../reducers/actions/table";
import { IDataAll } from "../../../interfaces/data";
import { FETCH_STATE } from "../../../constants/data";

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

const TasksList: FC = (): JSX.Element => {
    const {
        data,
        page,
        total,
        pageSize,
        status,
        error
    } = useSelector((state: RootState) => {
        return state.tasks;
    });
    const specialities = useSelector((state: RootState) => {
        return state.specialities.data;
    });
    const dispatch = useDispatch();

    const [filter, setFilter] = useState<IFilters>(defFilter);
    const [sort, setSort] = useState<DataTableSortParams>();
    const [loading, setLoading] = useState(false);
    
    const { user } = useContext(AppContext);

    useEffect(() => {
        if (!user.userUid) 
            dispatch({ type: "tasks_clear" });
        else
            fetchTableData(
                "tasks",
                Number(page),
                Number(pageSize),
                { sort, filter },
                dispatch
            );
    }, [user, sort, filter]);

    useEffect(() => {
        if (!specialities.length) {
            fetchTableData("specialities", 1, 100, {}, dispatch);
        }
    }, []);

    useEffect(() => {
        setLoading(status === FETCH_STATE.LOADING);
    }, [status]);

    const onPageChange = (e: PaginatorPageState) => {
        let { page, rows } = e;
        if (rows !== pageSize) page = 0;
        fetchTableData(
            "tasks",
            Number(page + 1),
            Number(rows),
            { sort, filter },
            dispatch
        );
    }

    const onSort = (sort: DataTableSortParams) => {
        setSort(sort);
    }

    const onDelCallback = (row: IDataAll) => {
        deleteTableRecord("tasks", row.id, dispatch)
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
                    collection="specialities"
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
                    data={range(1, 16).map(v => ({
                        value: v, text: `${v} grade`
                    }))}
                    {...{ filter, setFilter }}
                />,
            },
            {
                field: "mode",
                header: "Режим ответа",
                body: modeTemplate,
                sortable: true
            },
        ]}
        {...{
            total, pageSize, page, loading, sort,
            onPageChange, onSort, onDelCallback, error
        }}
    />
}

export default TasksList;
