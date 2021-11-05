import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { PaginatorPageState } from 'primereact/paginator';
import { DataTableSortParams } from 'primereact/datatable';

import Table from "../DataTable";

import { IDataTask, IListOptions } from "../../../interfaces/data";
import { FETCH_STATE } from "../../../constants/data";
import { fetchTableData } from "../../../reducers/actions/table";
import { modeTemplate, specialityTemplate } from "../fieldsTemplates";
import { MultiSelect } from "primereact/multiselect";
import { range } from "../../../helpers";

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
        fetchSpecialities: () => fetchTableData("specialities", 1, 100, {}, dispatch),
        clearData: () => dispatch({ type: "tasks_clear" }),
    }
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface ITaskFilter {
    filters: {
        specialities: {
            value: number[];
            matchMode: "in";
        }
        grades: {
            value: number[];
            matchMode: "in";
        }
    }
}

const defFilter: ITaskFilter = {
    filters: {
        specialities: {
            value: [],
            matchMode: "in"
        },
        grades: {
            value: [],
            matchMode: "in"
        },
    }
}

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
        clearData,
    } = props;

    const [filter, setFilter] = useState<ITaskFilter>(defFilter);
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

    const specialityFilterTemplate = <MultiSelect
        options={specialities}
        optionLabel="name"
        optionValue="id"
        value={filter.filters.specialities.value}
        onChange={(filterData) => {
            const newFilter = {
                ...filter,
                filters: {
                    ...filter?.filters,
                    specialities: {
                        ...filter.filters.specialities,
                        value: filterData.value
                    }
                }
            };
            setFilter(newFilter);
        }}
    />;
    const gradeFilterTempate = <MultiSelect
        options={range(1,16).map(v =>({value:v,text:`${v} grade`}))}
        optionLabel="text"
        optionValue="value"
        value={filter.filters.grades.value}
        onChange={(filterData) => {
            const newFilter = {
                ...filter,
                filters: {
                    ...filter?.filters,
                    grades: {
                        ...filter.filters.grades,
                        value: filterData.value
                    }
                }
            };
            setFilter(newFilter);
        }}
    />;
    return <Table
        title="Задания"
        records={data}
        columns={[
            {field: "text", header: "Текст задания"},
            {
                field: "speciality",
                header: "Специальность",
                body: specialityTemplate,
                sortable: true,
                filter: true,
                filterElement: specialityFilterTemplate,
            },
            {
                field: "grade",
                header: "Грейд",
                sortable: true,
                filter: true,
                filterField: "grades",
                filterElement: gradeFilterTempate,
            },
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
