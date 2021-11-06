import { DataTableFilterParams } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React, { FC, useState } from "react";

interface IProps {
    filterName: string
    filter: DataTableFilterParams
    setFilter: (value: React.SetStateAction<DataTableFilterParams>) => void
}

const TextFilter: FC<IProps> = (props): JSX.Element => {
    const { filter, setFilter, filterName } = props;

    const [filterValue, setFilterValue] = useState<string>(filter.filters[filterName].value);

    const applyFilter = (value="" ) => {
        const newFilter: DataTableFilterParams = { ...filter }
        newFilter.filters[filterName].value = value;
        setFilter(newFilter);
    };

    return <span className="p-input-icon-right">
        {filterValue > "" &&
            <i className="pi pi-times" onClick={() => applyFilter()} />}
        {filterValue === "" &&
            <i className="pi pi-filter" />}
        <InputText 
            defaultValue={filterValue}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    applyFilter( (e.target as HTMLInputElement).value);
                }
            }}
        />
        
    </span>
}

export default TextFilter;
