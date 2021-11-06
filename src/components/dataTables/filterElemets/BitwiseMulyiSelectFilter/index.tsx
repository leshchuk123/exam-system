import { FC, memo } from "react";
import { DataTableFilterParams } from "primereact/datatable";
import { MultiSelect } from "primereact/multiselect";
import { num2bits } from "../../../../helpers";

interface Option {
    value: number,
    text: string
}
interface IProps {
    filterName: string
    filter: DataTableFilterParams
    value?: number,
    data: Option[],
    collection?: string,
    valueField?: string,
    textField?: string,
    setFilter: (value: React.SetStateAction<DataTableFilterParams>) => void
}

const BitwiseMultiSelectFilter: FC<IProps> = (props): JSX.Element => {
    const {
        filter,
        filterName,
        data,
        setFilter,
    } = props;

    const filterValue:number = filter?.filters[filterName]?.value || 0;

    const applyFilter = (value: number = 0) => {
        const newFilter: DataTableFilterParams = { ...filter }
        newFilter.filters[filterName].value = value;
        setFilter(newFilter);
    };

    return <MultiSelect
        options={data}
        optionLabel="text"
        optionValue="value"
        value={num2bits(Number(filterValue))}
        onChange={(filterData) => {
            const value = filterData.value.reduce((acc: number, cur: number) => cur + acc, 0);
            applyFilter(value);
        }}
    />
}

export default memo(BitwiseMultiSelectFilter);
