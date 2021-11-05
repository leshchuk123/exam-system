import React, { FC, useRef } from "react";
import { DataTable, DataTableFilterParams, DataTableProps, DataTableSortParams } from 'primereact/datatable';
import { Column, ColumnProps } from 'primereact/column';
import { Paginator, PaginatorPageState } from 'primereact/paginator';
import { v4 as uuidv4 } from "uuid";

import "./datatable.scss";
import { IDataAny } from "../../../interfaces/data";
import { comparator } from "../../../helpers";
import DefferedInput from "../../ui/inputs/DefferedInput";

interface IDataTableColumnProps extends ColumnProps {
    body?: (rowData: IDataAny) => string
    showApplyButton?: boolean
}
interface IProps extends DataTableProps {
    title?: string
    records: object[]
    columns: IDataTableColumnProps[]
    total?: number
    pageSize?: number
    page?: number
    loading?: boolean
    sort?: DataTableSortParams
    error?: string
    onPageChange?: (event: PaginatorPageState) => void
    onSort?: (v: DataTableSortParams) => void
    onFilter?: (flt: DataTableFilterParams) => void
}

const Table: FC<IProps> = (props): JSX.Element => {
    const {
        title,
        records = [],
        columns = [],
        total = 0,
        page = 1,
        pageSize = 20,
        onPageChange = () => void 0,
        onSort = () => void 0,
        onFilter = () => void 0,
        loading = false,
        sort,
        error,
        ...rest
    } = props;

    const currentFilter = useRef<DataTableFilterParams | null>(null);
    const filterTimer = useRef<number | null>(null);


    const onFilterWrapper = (flt?: DataTableFilterParams) => {
        let newFlt = !comparator(flt, currentFilter.current) ? flt : null;
        if (filterTimer.current === null && !!newFlt) {
            onFilter(newFlt);
            filterTimer.current = window.setTimeout(() => {
                filterTimer.current = null;
                onFilterWrapper();
            }, 2000)
        }
    }

    return <div className={`listing`}>
        {!!title && <h1>{title}</h1>}
        <DataTable
            value={records}
            onSort={onSort}
            onFilter={onFilterWrapper}
            loading={loading}
            emptyMessage={error || "Нет данных"}
            {...sort}
            {...rest}
        >
            {columns.map(col => <Column key={uuidv4()} {...col}></Column>)}
        </DataTable>
        {records.length > 0 && <Paginator
            rows={pageSize}
            totalRecords={total}
            rowsPerPageOptions={[5, 10, 20, 50]}
            first={pageSize * (page - 1)}
            currentPageReportTemplate="(Страница {currentPage} из {totalPages})"
            onPageChange={onPageChange}
        />}
    </div>
}

export default Table;