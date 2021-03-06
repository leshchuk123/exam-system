/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useRef, useState } from "react";
import { DataTableFilterParams } from "primereact/datatable";
import { MultiSelect } from "primereact/multiselect";
import { IDataAll } from "../../../../interfaces/data";
import { list } from "../../../../reducers/api/table";
import { isOK } from "../../../../helpers";

interface Option {
    value: number,
    text: string
}
interface IProps {
    filterName: string
    filter: DataTableFilterParams
    data?: Option[],
    collection?: string,
    valueField?: string,
    textField?: string,
    setFilter: (value: React.SetStateAction<DataTableFilterParams>) => void
}

const MultiSelectFilter: FC<IProps> = (props): JSX.Element => {
    const {
        filter,
        filterName,
        data = [],
        collection,
        valueField = "id",
        textField = "name",
        setFilter,
    } = props;

    const filterValue = useRef<number[]>(filter?.filters[filterName]?.value || []);
    const [options, setOptions] = useState(data);

    useEffect(() => {
        if (collection) {
            list(collection, 1, 10000, {})
                .then((res) => {
                    if (isOK(res)) return res.json();
                })
                .then((json) => {
                    const data = json.data as IDataAll[];
                    const options: Option[] = data.map(entry => {
                        const value = Number(entry[String(valueField)]);
                        const text = String(entry[String(textField)]);
                        return { value, text };
                    }).filter(v => v.value !== undefined && v.text !== undefined);
                    setOptions(options)
                });
        };
    }, [collection]);

    const applyFilter = (value: number[] = []) => {
        const newFilter: DataTableFilterParams = { ...filter }
        newFilter.filters[filterName].value = value;
        setFilter(newFilter);
    };

    return <MultiSelect
        options={options}
        optionLabel="text"
        optionValue="value"
        value={filterValue.current}
        selectAll={false}
        onChange={(filterData) => {
            applyFilter(filterData.value);
        }}
    />
}

export default memo(MultiSelectFilter);