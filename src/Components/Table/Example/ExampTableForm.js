// import { useState, useEffect } from "react";

// import { PageLayout } from "../../../Layout/Components/PageLayout";
// import { TableForm } from '../../../Components/FormElements/TableForm';

// import { dataArray } from '../../../Components/Table/data';

// type Props = {};

// const UserAdd = (props: Props) => {

//   let actions: Array<any> = [
//     { label: "New", icon: "", onClick: () => { let button = document.getElementById("table-form-newData"); button?.click(); }, },
//     { label: "Save", icon: "", onClick: () => { }, },
//     { label: "Delete", icon: "", onClick: () => { let button = document.getElementById("table-form-deleteData"); button?.click(); }, },
//   ];

//   let headers: any[] = [
//     {
//       name: "id",
//       headerName: "Id",
//       isFilterEnabled: true,
//       editable: false,
//       fieldType: "text",
//       type: "number"
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
//       type: "number"
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
//     id: "",
//     title: "",
//     runtime: 0,
//     status: false
//   }

//   let headerStyle: any = {
//     backgroundColor: "#b0b3d7",
//     color: "white",
//     textAlign: "start",
//     height: "40px",
//     width: "auto",
//   }
//   const [tableData, setTableData] = useState<any>(dataArray);

//   useEffect(() => {
//     setTableData(dataArray)
//     return () => { }
//   }, [])

//   const deleteItems = (data: any) => {
//     console.log(data, "data");
//   }


//   return (
//     <PageLayout title="Add User" actions={actions}>
//       <TableForm headers={headers} headerStyle={headerStyle} tableData={tableData}
//         onRowSelected={true} pagination={false} initialData={initialData} extraColumn={extraColumn}
//         deleteItems={deleteItems} />
//     </PageLayout>
//   );
// };

// export default UserAdd;
