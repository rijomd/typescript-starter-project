// import { useState, useEffect } from "react";

// import { PageLayout } from "../../../Layout/Components/PageLayout";
// import { TableForm } from '../../../Components/FormElements/TableForm';

// import { dataArray } from '../../../Components/Table/data';

// type Props = {};

// const UserAdd = (props: Props) => {
//   const [tableData, setTableData] = useState<any>(dataArray);

//   let actions: Array<any> = [
//     { label: "New", icon: "", onClick: () => { let button = document.getElementById("table-form-newData"); button?.click(); }, },
//     { label: "Save", icon: "", onClick: () => { let button = document.getElementById("table-form-saveData"); button?.click(); }, },
//     { label: "Delete", icon: "", onClick: () => { let button = document.getElementById("table-form-deleteData"); button?.click(); }, },
//   ];

//   let headers: any[] = [
//     {
//       name: "year",
//       headerName: "Year",
//       isFilterEnabled: true,
//       editable: true,
//       fieldType: "text",
//       type: "number",
//     },
//     {
//       name: "title",
//       headerName: "Title",
//       isFilterEnabled: true,
//       editable: true,
//       fieldType: "text",
//       type: "text"
//     },
//     {
//       name: "runtime",
//       headerName: "Run Time",
//       isFilterEnabled: true,
//       editable: true,
//       fieldType: "text",
//       type: "text"
//     },
//     {
//       name: "status",
//       headerName: "Status",
//       isFilterEnabled: true,
//       editable: true,
//       fieldType: "checkBox",
//       type: "boolean"
//     },

//   ];

//   let extraColumn: any[] = [
//     {
//       headerName: "Action",
//       renderActions: (data: any) => { return <div onClick={() => console.log(data)}> Delete</div> },
//       style: { width: "auto", fontSize: "16px" },
//     },
//   ];

//   let initialData: any = {
//     year: "",
//     title: "",
//     runtime: 0,
//     status: false
//   }

//   let headerStyle: any = {
//     backgroundColor: "#e2eaed",
//     color: "black",
//     textAlign: "start",
//     height: "40px",
//     width: "auto",
//   }

//   let validations = {
//     runtime: {
//       pattern: {
//         value: '^[A-Za-z]*$',
//         message: "You're not allowed to...",
//       },
//       custom: {
//         isValid: (value: any) => parseInt(value, 10) > 200,
//         message: 'You have to be at least 200',
//       },
//     },
//     title: {
//       required: {
//         value: true,
//         message: 'This field is required',
//       },
//     },
//   };


//   useEffect(() => {
//     setTableData(dataArray)
//     return () => { }
//   }, [])

//   const deleteItems = (data: any) => {
//     console.log(data, "data");
//   }

//   const saveItems = (data: any) => {
//     console.log(data, "data");
//   }

//   return (
//     <PageLayout title="Add User" actions={actions}>
//       <TableForm
// uniqueKey="sr_no"
// ref={tableFormRef}
// headers={PoItemDetailsHeaders}
// subHeaders={subHeaders}
// extraColumn={[]}
// headerStyle={PoItemDetailsHeadersStyle}
// tableData={purchaseOrderState?.purchaseOrderListData?.purchaseOrderDetails}
// initialData={purchaseOrderState?.poItemDetailTableFormInitialValues}
// dropdownOptions={{
//     item_name: purchaseOrderState?.itemListInHeader,
//     item_code: purchaseOrderState?.itemListInHeader,
//     uom: purchaseOrderState?.itemUnitsList
// }}
// onRowSelected={true}
// pagination={false}
// isAllHeaderFilterEnable={false}
// enableSubRowsInsideRow={true}
// dispatchHandleChange={dispatchHandleChange}
// saveItems={submitPoDetailsTable}
// deleteItems={deleteItems}
// validations={validations}
// autoFixTableValues={[{ key: "sr_no", type: "autoIncrement", value: "index" }]} //setting custom value as index of table
// keyValuePairToValue={[
//     { fieldKey: "item_code", objectKey: "item_code" },
//     { fieldKey: "item_name", objectKey: "item_name" },
//     { fieldKey: "specification", objectKey: "specification" },
//     { fieldKey: "uom", objectKey: "unit_code" }
// ]} //setting key value pair(eg: <FormTableSearch /> get value as object) to single value, objectKey from FormTableSearch listHeader
// />
//     </PageLayout>
//   );
// };
// // uniqueKey is must one
// export default UserAdd;



// generik form

// export const DynamicForm = ({ formDataFields = [], initialData = {}, actions = [], actionsGrid = { lg: 4, md: 4 }, onLoadChildUrl = () => { }, dispatchFormatData = () => { } }) => {

//     const [formData, setFormData] = useState(initialData);
//     const [changeContent, setChangeContent] = useState({});

//     const handleChange = (e, name, type, dataType) => {
//         try {
//             if (type === "text") {
//                 setFormData({ ...formData, [e?.target?.name]: dataType === "number" ? parseInt(e.target?.value) : e.target?.value });
//                 dispatchFormatData({ ...formData, [e?.target?.name]: dataType === "number" ? parseInt(e.target?.value) : e.target?.value });
//             }
//             else {
//                 if (dataType === "number") { e = { ...e, id: parseInt(e?.id || e?.value) } }
//                 setFormData({ ...formData, [name]: e });
//                 dispatchFormatData({ ...formData, [name]: e });
//             }
//         } catch (error) { throw error; }
//     };

//     useEffect(() => {
//         setFormData(initialData);
//         return () => { }
//     }, [initialData])

//     useEffect(() => {
//         if (Object.keys(changeContent).length > 0) onLoadChildUrl(changeContent);
//     }, [changeContent]);

//     return (
//         <div>
//             <Grid container spacing={2}>
//                 {formDataFields?.length > 0 && formDataFields.map((item, key) => {
//                     if (item?.removeColumn) { return null }
//                     if (item?.type === 'text') {
//                         return (
//                             <Grid item lg={item.grid?.lg || 12} md={item.grid?.md || 12} sm={12} xs={12} key={key}>
//                                 <TextBox
//                                     label={item?.label || 'Label'}
//                                     name={item?.name}
//                                     value={formData[item?.name]}
//                                     type={item?.dataType || "text"}
//                                     onChange={(e) => handleChange(e, item.name, "text", item?.dataType)}
//                                     placeholder={item?.label || 'Label'}
//                                     required={item?.requiredLabel || false}
//                                     disabled={item?.disabled || false}
//                                 />
//                                 {item?.errorName ? <div id={`${item?.errorName}-error`}></div> : <div id={`${item?.name}-error`}></div>}
//                                 {/* item?.errorName : related with showErrors method */}
//                             </Grid>
//                         );
//                     }
//                     if (item?.type === 'select') {
//                         if ((item?.changeChildUrl || item?.changeChildComboOptions) && formData[item?.name]) { //url changes with some cases
//                             if (formData[item?.name] != changeContent[item?.name]) {
//                                 setChangeContent({ ...changeContent, [item.name]: formData[item?.name] || "" });
//                             }
//                         }
//                         return (
//                             <Grid item lg={item.grid?.lg || 12} md={item.grid?.md || 12} sm={12} xs={12} key={key}>
//                                 <AutoCompleteSelectBox
//                                     label={item?.label || 'Label'}
//                                     value={formData[item?.name]}
//                                     options={item?.selectOptions || []}
//                                     apiUrl={item?.changeChildUrl ? item.apiUrl + changeContent[item?.name] : item.apiUrl}
//                                     module={item?.module || "moduleCombo"}
//                                     onChange={(e) => handleChange(e, item.name, "select", item?.dataType)}
//                                     required={item?.requiredLabel || false}
//                                     disabled={item?.disabled || false}
//                                 />
//                                 {item?.errorName ? <div id={`${item?.errorName}-error`}></div> : <div id={`${item?.name}-error`}></div>}
//                             </Grid>
//                         );
//                     }
//                     if (item?.type === 'date') {
//                         return (
//                             <Grid item lg={item.grid?.lg || 12} md={item.grid?.md || 12} sm={12} xs={12} key={key}>
//                                 <DatePicker
//                                     label={item?.label || 'Label'}
//                                     name={item?.name}
//                                     format={item?.format ? item?.format : "dd/MM/yyyy"}
//                                     onChange={(e) => handleChange(e, item.name, "date", item?.dataType,)}
//                                     value={formData[item?.name]}
//                                     maxDate={item?.maxDate}
//                                     minDate={item?.minDate}
//                                     disabled={item?.disabled || false}
//                                 />
//                                 {item?.errorName ? <div id={`${item?.errorName}-error`}></div> : <div id={`${item?.name}-error`}></div>}
//                             </Grid>)
//                     }
//                 })}
//                 {actions?.length > 0 && <Grid item lg={actionsGrid?.lg || 12} md={actionsGrid?.md || 12} sm={12} xs={12} >
//                     {actions.map((item, key) => {
//                         return (<Button
//                             className={`mr-1 ${item.className || ""}`}
//                             label={item.label}
//                             disabled={item.disabled}
//                             onClick={() => item.onClick(formData)}
//                             loading={item.loading}
//                         />)
//                     })}
//                 </Grid>}
//             </Grid>

//         </div >
//     )
// }


// const getRoutingBank = (data) => {
//     getBranchAndCountry(data['bankCode']?.id, dispatch);
// }

// const dispatchFormatData = (formData) => {
//     dispatch(upDateInitialFilterFormValues(formData));
// }

// return (
//     <div>
//         <DynamicForm formDataFields={filterFormFields} initialData={fcWholeSaleDeal.initialFilterFormValues}
//             actions={[]} actionsGrid={{ lg: 8, md: 8 }} onLoadChildUrl={getRoutingBank} dispatchFormatData={dispatchFormatData} />
//         <div style={{ marginTop: "10px" }}><hr></hr></div>
//     </div>
// )