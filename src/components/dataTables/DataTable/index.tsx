import React, { FC } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, PaginatorPageState } from 'primereact/paginator';
import { v4 as uuidv4 } from "uuid";

import "./datatable.scss";

interface IProps {
    records: object[]
    columns: {
        header: string,
        field?: string,
        body?: (rowData: object) => string
    }[]
    total?: number
    pageSize?: number
    page?: number
    onPageChange?: (event: PaginatorPageState) => void
}

const Table: FC<IProps> = (props): JSX.Element => {
    const {
        records = [],
        columns = [],
        total = 0,
        page = 1,
        pageSize = 20,
        onPageChange = () => void 0,
    } = props;

    return <div className={`listing`}>
        <DataTable value={records}>
            {columns.map(col => <Column key={uuidv4()} { ...col }></Column>)}
        </DataTable>
        <Paginator
            rows={pageSize}
            totalRecords={total}
            rowsPerPageOptions={[5, 10, 20, 50]}
            first={pageSize * (page - 1)}
            currentPageReportTemplate="(Страница {currentPage} из {totalPages})"
            onPageChange={onPageChange}
        />
    </div>
}

export default Table;