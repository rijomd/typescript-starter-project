import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableContainer, TableHead, TableRow, TablePagination, TableFooter, Button } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { TextField, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForceUpdate } from '../../Services/Hook/Hook';
import { filterByHeaders, selectFromCheckBox, tableFormERrorValidation } from "./Methods/TableMethods";


type Props = {
    headers: any[]; headerStyle: { [x: string]: string }; extraColumn: any[];
    tableData: any[]; onRowSelected: boolean; pagination: boolean, initialData: any;
    deleteItems: (data: any) => void;
    saveItems: (data: any) => void;
    uniqueKey: string;
    validations: any;
};

export const TableForm = (props: Props) => {
    const { headers = [], headerStyle, tableData = [], extraColumn = [], onRowSelected = false,
        pagination = false, initialData = {}, deleteItems, uniqueKey, saveItems, validations = {} } = props;
    const forceUpdate = useForceUpdate();

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
    const [setsOfEditedId, setSetsOfEditedId] = useState<any[]>([]);

    // for error validations
    const [fieldsErrors, setFieldsErrors] = useState<any>([]);

    const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => { setRowsPerPage(+event.target.value); setPage(0); };

    useEffect(() => {
        setNormalTableData([...tableData]);
        setHeaderValues(headers);
        return () => { };
    }, [tableData]);

    const addNewItem = () => {
        setFieldsErrors([]);
        const newArray = [initialData].concat(normalTableData);
        setNormalTableData(newArray);
    }

    const saveTableItems = (e: any) => {
        e.preventDefault();
        setFieldsErrors([]);
        let editedData = normalTableData.filter(tableItem => setsOfEditedId.includes(tableItem[uniqueKey]));
        let editedNewData = normalTableData.filter(tableItem => !tableItem[uniqueKey]);
        let anyErrors = tableFormERrorValidation(validations, editedNewData.concat(editedData), uniqueKey);
        setFieldsErrors(anyErrors);
        if (anyErrors?.length === 0) { saveItems(editedNewData.concat(editedData)); }
    }

    const handleFilter = (value: string, filterType: string) => {
        let filterObject;
        if (!value) { delete values[filterType]; filterObject = { ...values }; }
        else { filterObject = { ...values, [filterType]: value.toString(), }; }
        if (Object.keys(filterObject)?.length > 0) {
            let filteredArray = filterByHeaders([...tableData], filterObject);
            setNormalTableData([...filteredArray]);
        }
        else { setNormalTableData([...tableData]); }
        setValues(filterObject);
    };

    const handleChangeTable = (event: any, type: string, columnItem: any, newIndex: number) => {
        let newData;
        let newArray = [...normalTableData];
        let editIdArray = [...setsOfEditedId];
        if (columnItem[uniqueKey]) {
            let editId = columnItem[uniqueKey];
            let findItem = setsOfEditedId.find(x => x === editId);
            if (findItem == undefined) { editIdArray.push(editId); }
        }
        setSetsOfEditedId(editIdArray);

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

        let index: any;
        if (columnItem[uniqueKey]) { index = newArray.findIndex((x: any) => x[uniqueKey] === columnItem[uniqueKey]); }
        else { index = newIndex }

        newArray[index] = newData;
        setNormalTableData(newArray);

    }

    const handleClick = (data: any) => {
        let newSelected = selectFromCheckBox(selected, data);
        setSelected(newSelected);
        forceUpdate();
    };

    const isSelected = (data: any) => {
        if (selected?.length > 0) {
            let exist = selected?.find((item: any) => JSON.stringify(item) === JSON.stringify(data));
            return exist ? true : false;
        } else { return false; }
    };

    // for resizing
    const [initialPos, setInitialPos] = React.useState<any>(null);
    const [initialSize, setInitialSize] = React.useState<any>(null);

    const initial = (e: any, id: any) => {
        let resizable = document.getElementById(id);
        setInitialPos(e.clientX);
        if (resizable) {
            setInitialSize(resizable?.offsetWidth);
        }
    }

    const resize = (e: any, id: any) => {
        let resizable = document.getElementById(id);
        if (resizable) {
            let width = e.clientX - initialPos;
            resizable.style.width = `${parseInt(initialSize) + width}px`;
        }
    }

    const renderTableHead = useMemo(() => {
        return headerValues.map((item: any, key: number) => {
            const { FilterComponent } = item;
            return (
                <StyledTableCell key={key}
                    style={{ width: item?.width, cursor: "col-resize" }}
                    id={item.id}
                    draggable='true'
                    onDragStart={(e: any) => initial(e, item.id)}
                    onDrag={(e: any) => resize(e, item.id)}>
                    {item.isFilterEnabled && (
                        <div style={{ padding: "10px 0px" }}>
                            {FilterComponent ? (<>{FilterComponent({ onchange: (data: any) => handleFilter(data, item.name), })}</>) :
                                (<TextField
                                    sx={{ width: "100%", background: "#fff", '&:hover fieldset': { border: 'none', }, 'fieldset': { border: 'none', }, }}
                                    placeholder={`Filter By ${item.headerName}`}
                                    variant="outlined"
                                    size="small"
                                    value={values[item.name]}
                                    autoComplete="off"
                                    onChange={(e) => handleFilter(e?.target.value, item.name)}
                                    InputProps={{}}
                                />)}
                        </div>
                    )}
                    <p style={{ margin: "0px" }}> {item.headerName}</p>
                </StyledTableCell>
            );
        });
    }, [headerValues]);

    return (
        <div style={{ overflow: "hidden" }}>
            <TableContainer style={{ marginTop: "1rem" }}>
                <Table
                    size="small"
                    sx={{ borderCollapse: "separate", tableLayout: "fixed", width: "auto", }}
                >

                    <TableHead>
                        <TableRow>
                            {onRowSelected && (<StyledTableCell></StyledTableCell>)}
                            {renderTableHead}
                            {extraColumn?.length > 0 &&
                                extraColumn.map((item: any, key: number) => (
                                    <StyledTableCell key={key} style={item?.style}>
                                        {/* {item.headerName} */}
                                    </StyledTableCell>
                                ))}
                        </TableRow>
                    </TableHead>

                    {normalTableData.length > 0 && normalTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((columnItem: any, columnKey: number) => {
                        const isItemSelected = isSelected(columnItem);
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
                                        let isError = fieldsErrors.filter((item: any) => item.errorKey === headItem?.name && (item.index === headItem[uniqueKey] || item.index === columnKey));
                                        return <TableCell key={headKey}>
                                            {headItem.fieldType === "text" &&
                                                <TextField name={headItem?.name}
                                                    placeholder={headItem?.headerName}
                                                    type={headItem?.type}
                                                    disabled={headItem?.disabled}
                                                    value={columnItem[headItem?.name]}
                                                    onChange={(e) => handleChangeTable(e, "text", columnItem, columnKey)}
                                                    error={isError.length > 0 || false}
                                                    helperText={fieldsErrors.map((errorItem: any, textIndex: number) => {
                                                        if (errorItem.errorKey === headItem?.name && (errorItem.index === headItem[uniqueKey] || errorItem.index === columnKey)) {
                                                            return errorItem?.message
                                                        }
                                                    })}
                                                />}
                                            {headItem.fieldType === "checkBox" &&
                                                <Checkbox
                                                    name={headItem?.name}
                                                    checked={columnItem[headItem?.name]}
                                                    value={columnItem[headItem?.name]}
                                                    onChange={(e) => handleChangeTable(e, "checkBox", columnItem, columnKey)}
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
                            <TableRow><TableCell sx={{ textAlign: "center", border: "none" }} colSpan={headerValues.length + extraColumn?.length}>No records found</TableCell></TableRow>
                        </TableFooter>
                    )}

                    {pagination && (
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2} >
                                    <Button variant="text" onClick={() => { setValues({}); setNormalTableData([...tableData]); forceUpdate(); }}>Clear Filter</Button>
                                </TableCell>
                                <TableCell colSpan={headerValues.length + extraColumn?.length - 1} >
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
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    )}

                </Table>
            </TableContainer>

            <div>
                <button id="table-form-newData" style={{ display: "none" }} onClick={addNewItem}>New</button>
                <button id="table-form-deleteData" style={{ display: "none" }} onClick={() => deleteItems(selected)}>Delete</button>
                <button id="table-form-saveData" style={{ display: "none" }} onClick={(e) => saveTableItems(e)}>Save</button>
            </div>
        </div>
    );
};
