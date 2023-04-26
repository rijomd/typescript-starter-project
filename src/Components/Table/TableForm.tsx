import React, { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableContainer, TableHead, TableRow, TablePagination, TableFooter } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { TextField, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";

import { stableSort, getComparator, filterByHeaders, selectFromCheckBox } from "./Methods/TableMethods";


type Props = {
    headers: any[]; headerStyle: { [x: string]: string }; extraColumn: any[];
    tableData: any[]; onRowSelected: boolean; pagination: boolean, initialData: any;
    onChangeRowSelected: (data: any[]) => void;
};

export const TableForm = (props: Props) => {
    const { headers = [], headerStyle, tableData = [], extraColumn = [], onRowSelected = false, pagination = false, initialData = {}, onChangeRowSelected } = props;

    const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: { backgroundColor: headerStyle.backgroundColor, color: headerStyle.color, ...headerStyle, },
        [`&.${tableCellClasses.body}`]: { fontSize: 14, },
    }));

    // setting data and header
    const [normalTableData, setNormalTableData] = useState<any[]>([]);
    const [headerValues, setHeaderValues] = useState<any[]>([]);

    const [values, setValues] = useState<any>({});
    // paginAtion
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const [selected, setSelected] = useState<any[]>([]);

    const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => { setRowsPerPage(+event.target.value); setPage(0); };

    useEffect(() => {
        setNormalTableData([...tableData]);
        setHeaderValues([...headers]);
        return () => { };
    }, [tableData]);

    const addNewItem = () => {
        let newDataArray: any = [];
        if (Object.keys(values).length > 0) {
            setValues({});
            newDataArray = [...tableData];
        }
        else {
            newDataArray = [...normalTableData];
        }
        const newArray = [initialData].concat(newDataArray);
        setNormalTableData(newArray);
    }

    const deleteItems = () => {

    }

    const saveItems = () => {

    }

    const handleFilter = (value: string, filterType: string) => {
        let filterObject;
        if (!value) { delete values[filterType]; filterObject = { ...values }; }
        else { filterObject = { ...values, [filterType]: value.toString(), }; }
        setValues(filterObject);
        if (Object.keys(filterObject)?.length > 0) {
            let filteredArray = filterByHeaders([...tableData], filterObject);
            setNormalTableData([...filteredArray]);
        }
        else { setNormalTableData([...tableData]); }
    };

    const handleChangeTable = (event: any, type: string, index: number) => {
        let columnItem = { ...normalTableData[index] }
        let newData;
        if (type === "text") {
            let name = event.target.name;
            let value = event.target.value;
            newData = { ...columnItem, [name]: value };
        }
        if (type === "checkBox") {
            let name = event.target.name;
            let value = event.target.checked;
            newData = { ...columnItem, [name]: value };
        }
        normalTableData[index] = newData;
        setNormalTableData([...normalTableData, normalTableData[index]]);
    }

    const handleClick = (data: any) => {
        let newSelected = selectFromCheckBox(selected, data);
        setSelected(newSelected);
        onChangeRowSelected(newSelected);
        // setForceUpdate(forceUpdate + 1);
    };

    const isSelected = (data: any) => {
        console.log(data, "data")
        if (selected?.length > 0) {
            let exist = selected?.find((item: any) => JSON.stringify(item) === JSON.stringify(data));
            return exist ? true : false;
        } else { return false; }
    };

    const renderTableHead = useCallback(() => {
        return headerValues.map((item: any, key: number) => {
            const { FilterComponent } = item;
            return (
                <StyledTableCell key={key} style={{ width: item.width }}>
                    {item.headerName}
                    {item.isFilterEnabled && (
                        <div style={{ padding: "5px 0px" }}>
                            {FilterComponent ? (<>{FilterComponent({ onchange: (data: any) => handleFilter(data, item.name), })}</>) :
                                (<TextField
                                    sx={{ width: "100%" }}
                                    placeholder={`Filter By ${item.headerName}`}
                                    variant="standard"
                                    size="small"
                                    value={values[item.name]}
                                    autoComplete="off"
                                    onChange={(e) => handleFilter(e?.target.value, item.name)}
                                />)}
                        </div>
                    )}
                </StyledTableCell>
            );
        });
    }, [headerValues, values]);

    return (
        <div style={{ overflow: "hidden" }}>
            <TableContainer style={{ marginTop: "1rem" }}>
                <Table
                    size="small"
                    sx={{ borderCollapse: "separate", tableLayout: "fixed", width: "auto", margin: "auto", }}
                >
                    <TableHead>
                        <TableRow>
                            {onRowSelected && (<StyledTableCell></StyledTableCell>)}
                            {renderTableHead()}
                            {extraColumn?.length > 0 &&
                                extraColumn.map((item: any, key: number) => (
                                    <StyledTableCell key={key} style={item?.style}>
                                        {item.headerName}
                                    </StyledTableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    {normalTableData.length > 0 && stableSort(normalTableData, getComparator('asc', "id"))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((columnItem: any, columnKey: number) => {
                            const isItemSelected = isSelected(columnItem);
                            console.log(isItemSelected, "isItemSelected");
                            return (
                                <TableBody key={columnKey}>
                                    <TableRow hover={true} selected={isItemSelected}>
                                        {onRowSelected && (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    onClick={() => handleClick(columnItem)}
                                                />
                                            </TableCell>
                                        )}
                                        {headerValues.map((headItem: any, headKey: number) => {
                                            return <TableCell key={headKey}>
                                                {headItem.fieldType === "text" &&
                                                    <TextField name={headItem?.name}
                                                        placeholder={headItem?.headerName}
                                                        type={headItem?.type}
                                                        disabled={headItem?.disabled}
                                                        value={normalTableData[columnKey][headItem?.name]}
                                                        onChange={(e) => handleChangeTable(e, "text", columnKey)}
                                                    />}
                                                {headItem.fieldType === "checkBox" &&
                                                    <Checkbox
                                                        name={headItem?.name}
                                                        checked={normalTableData[columnKey][headItem?.name]}
                                                        value={normalTableData[columnKey][headItem?.name]}
                                                        onChange={(e) => handleChangeTable(e, "checkBox", columnKey)}
                                                    />}
                                            </TableCell>
                                        })}
                                        {extraColumn?.length > 0 &&
                                            extraColumn.map((item: any, key: number) => (
                                                <TableCell key={key}>
                                                    {item?.renderActions([columnItem])}
                                                </TableCell>
                                            ))}
                                    </TableRow>
                                </TableBody>
                            );
                        })}
                    {normalTableData?.length === 0 && (
                        <TableFooter>
                            <TableRow><TableCell sx={{ textAlign: "center", border: "none" }} colSpan={headerValues.length}>No records found</TableCell></TableRow>
                        </TableFooter>
                    )}
                </Table>
            </TableContainer>
            {pagination && normalTableData?.length !== 0 && (
                <TablePagination
                    style={{ borderBottom: "1px solid #ccc" }}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={normalTableData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
            <div>
                <button id="table-form-newData" style={{ display: "none" }} onClick={addNewItem}>New</button>
                <button id="table-form-deleteData" style={{ display: "none" }} onClick={deleteItems}>Delete</button>
                <button id="table-form-saveData" style={{ display: "none" }} onClick={saveItems}>Save</button>
            </div>
        </div>
    );
};
