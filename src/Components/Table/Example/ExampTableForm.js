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
//       <TableForm headers={headers} headerStyle={headerStyle} tableData={tableData}
//         onRowSelected={true} pagination={true} initialData={initialData} extraColumn={extraColumn}
//         deleteItems={deleteItems} uniqueKey="id" saveItems={saveItems} validations={validations} />
//     </PageLayout>
//   );
// };
// // uniqueKey is must one
// export default UserAdd;
