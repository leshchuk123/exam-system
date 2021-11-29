import { FC } from "react";
import { DataTable, DataTableProps, DataTableSortParams } from 'primereact/datatable';
import { Column, ColumnProps } from 'primereact/column';
import { Paginator, PaginatorPageState } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { v4 as uuidv4 } from "uuid";

import "./datatable.scss";
import { IDataAll } from "../../../interfaces/data";
import { Link } from "react-router-dom";

export interface IDataTableColumnProps extends ColumnProps {
    body?: (rowData: IDataAll) => (string | JSX.Element)
    showApplyButton?: boolean
}
interface IProps extends DataTableProps {
    title: string
    collection?: string
    editable?: boolean
    records: object[]
    columns: IDataTableColumnProps[]
    total?: number
    pageSize?: number
    page?: number
    loading?: boolean
    sort?: DataTableSortParams
    error?: string
    onDelCallback?: (record: IDataAll) => void
    onPageChange?: (event: PaginatorPageState) => void
    onSort?: (v: DataTableSortParams) => void
}

const Table: FC<IProps> = (props): JSX.Element => {
    const {
        title,
        collection,
        editable = true,
        records = [],
        columns = [],
        total = 0,
        page = 1,
        pageSize = 20,
        loading = false,
        sort,
        error,
        onPageChange = () => void 0,
        onSort = () => void 0,
        onDelCallback = () => void 0,
        ...rest
    } = props;

    const header =  (
        <div className="table-header">
            <h1>{title}</h1>
            {editable && <div className="table-header-tools">
                <Link to={`/${collection}/new`}>
                    <Button
                        icon="pi pi-plus"
                        className="p-button-raised p-button-success"
                    />
                </Link>
            </div>}
        </div>
    );

    return <div className={`content listing`}>
        <DataTable
            value={records}
            onSort={onSort}
            loading={loading}
            header={header}
            emptyMessage={error || "Нет данных"}
            {...sort}
            {...rest}
        >
            {columns.map(col => <Column key={uuidv4()} {...col}></Column>)}
            {editable && <Column
                body={(row: IDataAll) => <div className="row_controls">
                    <Link to={`/${collection}/edit/${row.id}`}>
                        <Button
                            icon="pi pi-pencil"
                            className="p-button-rounded p-button-success p-button-raised"
                        />
                    </Link>
                    <Button
                        icon="pi pi-times"
                        className="p-button-rounded p-button-danger p-button-raised"
                        onClick={() => {
                            if (window.confirm("Удалить запись?")) {
                                onDelCallback(row);
                            }
                        }}
                    />
                </div>}
                style={{ width: 150 }}
            />}
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
