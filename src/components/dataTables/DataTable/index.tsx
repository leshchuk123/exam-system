import React, { FC } from "react";
import { DataTable, DataTableFilterParams, DataTableSortParams } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, PaginatorPageState } from 'primereact/paginator';
import { v4 as uuidv4 } from "uuid";

import "./datatable.scss";

export enum SORT_ORDER {
    ASC = 1,
    DESC = -1,
}
export interface ISortData {
    sortField: string
    sortOrder: SORT_ORDER
}
interface IProps {
    records: object[]
    columns: {
        header: string,
        field?: string,
        body?: (rowData: object) => string
        sortable?: boolean
    }[]
    total?: number
    pageSize?: number
    page?: number
    loading?: boolean
    sort: DataTableSortParams | null
    onPageChange?: (event: PaginatorPageState) => void
    onSort?: (v: DataTableSortParams) => void
    onFilter?: (flt: DataTableFilterParams) => void
}

const Table: FC<IProps> = (props): JSX.Element => {
    const {
        records = [],
        columns = [],
        total = 0,
        page = 1,
        pageSize = 20,
        onPageChange = () => void 0,
        onSort = () => void 0,
        onFilter = () => void 0,
        loading = false,
        sort = null,
    } = props;

    return <div className={`listing`}>
        <DataTable
            value={records}
            onSort={onSort}
            loading={loading}
            { ...sort }
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