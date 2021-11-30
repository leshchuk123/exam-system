/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import Table from "../DataTable";
import { PaginatorPageState } from 'primereact/paginator';
import { DataTableFilterMatchModeType, DataTableSortParams } from 'primereact/datatable';

import { deleteTableRecord, fetchTableData } from "../../../reducers/actions/table";
import { IDataAll, IDataUser } from "../../../interfaces/data";
import { FETCH_STATE, ROLE } from "../../../constants/data";
import { GRADES } from "../../../helpers";
import { dateFormater } from "../../../helpers/format";
import { rolesTemplate, specialityTemplate, userNameTemplate } from "../fieldsTemplates";
import TextFilter from "../filterElemets/TextFilter";
import MultiSelectFilter from "../filterElemets/MultiSelectFilter";
import BitwiseMulyiSelectFilter from "../filterElemets/BitwiseMulyiSelectFilter";
import { AppContext } from "../../../app/App";

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
        name: { value: "", matchMode: "contains" },
        specialities: { value: [], matchMode: "in" },
        grades: { value: [], matchMode: "in" },
        roles: { value: 0, matchMode: "custom" },
    }
};
export interface IIsFetching {
    data: boolean
    specialities: boolean
}
export const defFetchingState = {
    data: false,
    specialities: false,
}

const UsersList: FC = (): JSX.Element => {
    const {
        data,
        page,
        total,
        pageSize,
        status,
        error
    } = useSelector((state: RootState) => {
        return state.users;
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
            dispatch({ type: "users_clear" });
        else
            fetchTableData(
                "users",
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
            "users",
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
        deleteTableRecord("users", row.id, dispatch)
    }

    return <>
        <Table
            title="Пользователи"
            collection="users"
            records={data}
            columns={[
                {
                    field: "name",
                    header: "Имя",
                    body: userNameTemplate,
                    sortable: true,
                    filter: true,
                    filterElement: <TextFilter
                        filterName="name"
                        {...{ filter, setFilter }}
                    />,
                },
                {
                    field: "speciality",
                    header: "Специальность",
                    body: specialityTemplate,
                    sortable: true,
                    filter: true,
                    filterPlaceholder: "по специальности",
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
                        data={GRADES}
                        {...{ filter, setFilter }}
                    />,
                    style: { width: 150 },
                },
                {
                    field: "hiringDate",
                    header: "Дата найма",
                    body: (row: IDataUser) => dateFormater(row.hiringDate),
                    sortable: true
                },
                {
                    field: "accessDate",
                    header: "Последняя активность",
                    body: (row: IDataUser) => dateFormater(row.accessDate),
                    sortable: true
                },
                {
                    field: "roles",
                    header: "Группы",
                    body: rolesTemplate,
                    sortable: true,
                    filter: true,
                    filterField: "roles",
                    filterElement: <BitwiseMulyiSelectFilter
                        filterName="roles"
                        data={[
                            { text: "Пользователи", value: ROLE.EXAMINEE },
                            { text: "Администраторы", value: ROLE.ADMIN },
                            { text: "Руководители", value: ROLE.SUPERVISOR },
                        ]}
                        {...{ filter, setFilter }}
                    />
                },
            ]}
            {...{ total, pageSize, page, loading, sort, onPageChange, onSort, onDelCallback, error }}
        />
    </>
}

export default UsersList;
