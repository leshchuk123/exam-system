import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Table from "../DataTable";
import { PaginatorPageState } from 'primereact/paginator';
import { DataTableFilterParams, DataTableSortParams } from 'primereact/datatable';
import { MultiSelect } from "primereact/multiselect";
import { InputText } from 'primereact/inputtext';

import { fetchTableData } from "../../../reducers/actions/table";
import { IDataUser, IListOptions, ROLE } from "../../../interfaces/data";
import { FETCH_STATE } from "../../../constants/data";
import { dateFormater, num2bits, range } from "../../../helpers";
import { rolesTemplate, specialityTemplate, userNameTemplate } from "../fieldsTemplates";

const mapState = (state: RootState) => {
    const { data, page, total, pageSize, status, error, sort, filter } = state.users;
    const { userUid } = state.user.data;
    return {
        data, page, total, pageSize, status, error, userUid, sort, filter,
        specialities: state.specialities.data,
    }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetchUsers: (page:number, pageSize:number, options:IListOptions) => fetchTableData("users", page, pageSize, options, dispatch),
        fetchSpecialities: () => fetchTableData("specialities", 1, 100, {}, dispatch),
        clearData: () => dispatch({ type: "users_clear" }),
    }
}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface IUsersFilter {
    filters: {
        name: {
            value: string;
            matchMode: "contains";
        }
        specialities: {
            value: number[];
            matchMode: "in";
        }
        grades: {
            value: number[];
            matchMode: "in";
        }
        roles: {
            value: number;
            matchMode: "custom";
        }
    }
}

const defFilter: IUsersFilter = {
    filters: {
        name: {
            value: "",
            matchMode: "contains",
        },
        specialities: {
            value: [],
            matchMode: "in"
        },
        grades: {
            value: [],
            matchMode: "in"
        },
        roles: {
            value: 0,
            matchMode: "custom"
        },
    }
}

const UsersList: FC<PropsFromRedux> = (props): JSX.Element => {
    const {
        data,
        page,
        total,
        pageSize,
        status,
        error,
        userUid,
        fetchUsers,
        fetchSpecialities,
        specialities,
        clearData,
    } = props;

    const [filter, setFilter] = useState<IUsersFilter>(defFilter);
    const [sort, setSort] = useState<DataTableSortParams>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userUid) {
            fetchUsers(Number(page), Number(pageSize), { sort, filter });
            fetchSpecialities();
        }
        else clearData();
    }, [userUid, sort, filter]);

    useEffect(() => {
        setLoading(status === FETCH_STATE.LOADING);
    }, [status]);

    const onPageChange = (e: PaginatorPageState) => {
        let { page, rows } = e;
        if (rows !== pageSize) page = 0;
        fetchUsers(Number(page + 1), Number(rows), {sort, filter})
    }

    const onSort = (sort: DataTableSortParams) => {
        setSort(sort);
    }

    const onFilter = (filterData: DataTableFilterParams) => {
        console.log(Date.now(), {filterData})
        debugger
        const newFilter = {
            ...filter,
            filters: {
                ...filter?.filters,
                ...filterData.filters
            }
        };
        console.log({ filterData, newFilter })
        setFilter(newFilter);
    }

    const nameFilterTemplate = <InputText
        value={filter.filters.name.value}
        onChange={(e) => {

        }}
    />

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
    const rolesFilterTempate = <MultiSelect
        options={[
            { text: "Пользователи", value: ROLE.EXAMINEE },
            { text: "Администраторы", value: ROLE.ADMIN },
            { text: "Руководители", value: ROLE.SUPERVISOR },
        ]}
        optionLabel="text"
        optionValue="value"
        value={num2bits(filter.filters.roles.value)}
        onChange={(filterData) => {
            const value = filterData.value.reduce((acc: number, cur: number) => cur + acc, 0);
            const newFilter = {
                ...filter,
                filters: {
                    ...filter?.filters,
                    roles: {
                        ...filter.filters.roles,
                        value
                    }
                }
            };
            setFilter(newFilter);
        }}
    />;

    return <>
        <Table
            title="Пользователи"
            records={data}
            columns={[
                {
                    field: "name",
                    header: "Имя",
                    body: userNameTemplate,
                    sortable: true,
                    filter: true,
                    filterPlaceholder: "по имени",
                    filterField: "name",
                    filterMatchMode: "contains",
                },
                {
                    field: "speciality",
                    header: "Специальность",
                    body: specialityTemplate,
                    sortable: true,
                    filter: true,
                    filterPlaceholder: "по специальности",
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
                {field: "hiringDate", header: "Дата найма", body: (row: IDataUser) => dateFormater(row.hiringDate), sortable: true},
                {field: "accessDate", header: "Последняя активность", body: (row: IDataUser) => dateFormater(row.accessDate), sortable: true},
                {
                    field: "roles",
                    header: "Группы",
                    body: rolesTemplate,
                    sortable: true,
                    filter: true,
                    filterField: "roles",
                    filterElement: rolesFilterTempate,
                },
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
    </>
}

export default connector(UsersList);
