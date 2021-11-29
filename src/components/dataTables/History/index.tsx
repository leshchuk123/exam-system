/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../../store";

import { PaginatorPageState } from 'primereact/paginator';
import { DataTableFilterMatchModeType, DataTableSortParams, DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";

import { AppContext } from "../../../app/App";
import Table, {IDataTableColumnProps} from "../DataTable";

import { IDataAttempt, IDataUser, IListOptions } from "../../../interfaces/data";
import { COLOR, FETCH_STATE, ROLE } from "../../../constants/data";
import { fetchTableData, doApprove } from "../../../reducers/actions/table";
import { dateFormater } from "../../../helpers/format";
import TextFilter from "../filterElemets/TextFilter";
import { Button } from "primereact/button";
import { getId } from "../../../helpers";

const mapState = (state: RootState) => {
    const { data, page, total, pageSize, status, error, sort, filter } = state.attempts;
    return { data, page, total, pageSize, status, error, sort, filter }
}
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        fetch: (page:number, pageSize:number, options:IListOptions) => fetchTableData("attempts", page, pageSize, options, dispatch),
        clearData: () => dispatch({ type: "attempts_clear" }),
        doApprove: (record: IDataAttempt, reviewer: number) => {
            doApprove({
                ...record,
                user: getId(record.user),
                reviewer
            }, dispatch)
        },
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
        doApprove,
    } = props;

    const [filter, setFilter] = useState<IFilters>(defFilter);
    const [sort, setSort] = useState<DataTableSortParams>();
    const [loading, setLoading] = useState(false);
    const [expandedRows, setExpandedRows] = useState<any[]>([]);
    const [expandedSubRows, setExpandedSubRows] = useState<any[]>([]);
    const [admin, setAdmin] = useState(false);

    const { user } = useContext(AppContext);
    console.log({user})

    useEffect(() => {
        const { userUid, roles = 0 } = user;
        const auth = !!userUid;
        const isAdmin = auth && !!(roles & ROLE.ADMIN);
        setAdmin(isAdmin);
        if (auth && !isAdmin) setFilter({
            ...defFilter,
            filters: {
                ...defFilter.filters,
                "user.name": {
                    value: `${user.name || ""} ${user.surname || ""}`
                        .replace(/^\s+|\s+$/, "").toLowerCase(),
                    matchMode: "contains"
                }
            }
        });
        if (!auth) clearData();
    }, [user]);

    useEffect(() => {
        if (!!user.userUid) fetch(Number(page), Number(pageSize), { sort, filter });
    }, [sort, filter, user]);

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
        return user ? `${user?.name} ${user?.surname}` : "";
    }
    const reviewerNameTemplate = (record: IDataAttempt): string => {
        const user = record.reviewer as IDataUser;
        return user ? `${user?.name} ${user?.surname}` : "";
    }
    const taskResultTemplate = (record: any) => {
        let result = true;
        record.options?.forEach((op: any) => {
            result = result && op.correct;
        })
        return result ? successIcon : errorIcon;
    };
    const successIcon = <i className="pi pi-check-circle" style={{ color: COLOR.success }} />;
    const errorIcon = <i className="pi pi-times-circle" style={{ color: COLOR.danger }} />;
    const optionResultTemplate = (record: any) => {
        return record.correct ? successIcon : errorIcon;
    }
    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="tasks-subtable">
                <DataTable
                    value={data.tasks}
                    expandedRows={expandedSubRows}
                    onRowToggle={(e) => {
                        setExpandedSubRows(e.data)
                    }}
                    rowExpansionTemplate={rowExpansionSubTemplate}
                >
                    <Column expander style={{width: "3em"}} />
                    <Column field="text" header="Вопросы" />
                    <Column field="date" body={taskResultTemplate} style={{width: "3em"}} />
                </DataTable>
            </div>
        );
    }
    const rowExpansionSubTemplate = (data: any) => {
        return <DataTable value={data.options}>
            <Column field="text" header="Ответы" />
            <Column field="date" body={optionResultTemplate} style={{width: "3em"}} />
        </DataTable>
    }
    const columns: IDataTableColumnProps[] = [
        {
            expander: true,
            style: { width: "3em" }
        },
        {
            field: "user",
            header: "Экзаменуемый",
            body: userNameTemplate,
            filter: admin,
            filterElement: admin ? <TextFilter
                filterName="user.name"
                {...{ filter, setFilter }}
            /> : null,
        },
        {
            field: "reviewer",
            header: "Проверяющий",
            body: reviewerNameTemplate,
            filter: admin,
            filterElement: admin ? <TextFilter
                filterName="reviewer.name"
                {...{ filter, setFilter }}
            /> : null,
        },
        { field: "examDate", header: "Дата", body: (row: IDataAttempt) => dateFormater(row.examDate), sortable: true },
        { field: "result", header: "Результат", sortable: true },
    ];
    if (admin) {
        columns.push({
            body: (row: IDataAttempt) => <div className="row_controls">
                {!row.reviewer && <Button
                    icon="pi pi-check"
                    className="p-button-rounded p-button-success p-button-raised"
                    onClick={() => {
                        doApprove(row, getId(user));
                    }}
                />}
            </div>,
            style: { width: "5em" }
        });
    }
    return <Table
        title="История тестирования"
        collection="attempts"
        records={data}
        editable={false}
        expandedRows={expandedRows}
        onRowToggle={(e) => {setExpandedRows(e.data)}}
        rowExpansionTemplate={rowExpansionTemplate}
        columns={columns}
        {...{ total, pageSize, page, loading, sort, onPageChange, onSort, error }}
    />;
}

export default connector(AttemptsList);
