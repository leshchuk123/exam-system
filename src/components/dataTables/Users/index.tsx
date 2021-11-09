import { FC, memo, useContext, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Table from "../DataTable";
import { PaginatorPageState } from 'primereact/paginator';
import { DataTableFilterMatchModeType, DataTableSortParams } from 'primereact/datatable';

import { deleteTableRecord, fetchTableData } from "../../../reducers/actions/table";
import { IDataAll, IDataUser, IListOptions } from "../../../interfaces/data";
import { FETCH_STATE, ROLE } from "../../../constants/data";
import { dateFormater, range } from "../../../helpers";
import { rolesTemplate, specialityTemplate, userNameTemplate } from "../fieldsTemplates";
import TextFilter from "../filterElemets/TextFilter";
import MultiSelectFilter from "../filterElemets/MultiSelectFilter";
import BitwiseMulyiSelectFilter from "../filterElemets/BitwiseMulyiSelectFilter";
import { AppContext } from "../../../app/App";

const mapState = (state: RootState) => {
    const { data, page, total, pageSize, status, error, sort, filter } = state.users;
    return {
        data, page, total, pageSize, status, error, sort, filter,
        specialities: state.specialities.data,
    }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetch: (page:number, pageSize:number, options:IListOptions) => fetchTableData("users", page, pageSize, options, dispatch),
        delRec: (id: number) => deleteTableRecord("users", id, dispatch),
        fetchSpecialities: () => fetchTableData("specialities", 1, 100, {}, dispatch),
        clearData: () => dispatch({ type: "users_clear" }),
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
        name: { value: "", matchMode: "contains" },
        specialities: { value: [], matchMode: "in" },
        grades: { value: [], matchMode: "in" },
        roles: { value: 0, matchMode: "custom" },
    }
};

const UsersList: FC<PropsFromRedux> = (props): JSX.Element => {
    const {
        data,
        page,
        total,
        pageSize,
        status,
        error,
        specialities,
        fetch,
        fetchSpecialities,
        delRec,
        clearData,
    } = props;

    const [filter, setFilter] = useState<IFilters>(defFilter);
    const [sort, setSort] = useState<DataTableSortParams>();
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AppContext);

    useEffect(() => {
        if (!!user.userUid) {
            fetch(Number(page), Number(pageSize), { sort, filter });
            fetchSpecialities();
        }
        else clearData();
    }, [user, sort, filter]);

    useEffect(() => {
        setLoading(status === FETCH_STATE.LOADING);
    }, [status]);

    const onPageChange = (e: PaginatorPageState) => {
        let { page, rows } = e;
        if (rows !== pageSize) page = 0;
        fetch(Number(page + 1), Number(rows), {sort, filter})
    }
    const onSort = (sort: DataTableSortParams) => {
        setSort(sort);
    }
    const onDelCallback = (row: IDataAll) => {
        delRec(row.id);
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
                        data={range(1, 16).map(v => ({ value: v, text: `${v} grade` }))}
                        {...{ filter, setFilter }}
                    />,
                },
                { field: "hiringDate", header: "Дата найма", body: (row: IDataUser) => dateFormater(row.hiringDate), sortable: true },
                { field: "accessDate", header: "Последняя активность", body: (row: IDataUser) => dateFormater(row.accessDate), sortable: true },
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

export default connector(memo(UsersList));
