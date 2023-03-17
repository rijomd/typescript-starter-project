// import { Box, MenuItem } from "@mui/material";
// import React, { useState } from "react";

// import { MaterialReactTableComponent } from "../../../Components/Table";
// import { dataArray } from "../../../Components/Table/data";
// import { PageLayout } from "../../../Layout/Components/PageLayout";

// type Props = {};

// const UserAdd = (props: Props) => {
//   let actions: Array<any> = [
//     {
//       label: "Refresh",
//       icon: "",
//       onClick: () => {
//         console.log("hi");
//       },
//     },
//     {
//       label: "Add",
//       icon: "",
//       onClick: () => {
//         console.log("hi");
//       },
//     },
//     {
//       label: "Delete",
//       icon: "",
//       onClick: () => {
//         console.log("hi");
//       },
//     },
//   ];
//   // const [isLoading, setIsLoading] = useState(true);

//   let columnData: any = [
//     {
//       accessorKey: "title",
//       header: "Title",
//     },
//     {
//       accessorKey: "year",
//       header: "Year",
//       renderColumnActionsMenuItems: ({ closeMenu, column, table }: any) => {
//         return [
//           <MenuItem
//             onClick={() => {
//               closeMenu();
//             }}
//           >
//             Custom Menu Item 1
//           </MenuItem>,
//         ];
//       }, //custom menu option
//     },
//     {
//       accessorKey: "director",
//       header: "Directors",
//     },
//     {
//       accessorKey: "runtime",
//       header: "Runtime",
//     },
//     {
//       accessorKey: "actors",
//       enableColumnOrdering: false,
//       header: "Actors",
//     },
//     {
//       accessorKey: "country",
//       header: "Country",
//       aggregationFn: "max",
//     },
//   ];

//   return (
//     <PageLayout title="Add User" actions={[]}>
//       <div>
//         <MaterialReactTableComponent
//           tableData={dataArray}
//           columnData={columnData}
//           tableActions={actions}
//           getSubRows={(data: any) => data.general} //for getting subRows for expanding
//           enableExpanding={false} //subRows for expanding conditions
//           enableColumnResizing={true} //enable resize columns
//           enableGrouping={false} // enabling grouping and arrows
//           // initialState={{
//           //   density: "compact",
//           //   expanded: false, //expand all groups by default
//           //   grouping: ["country"], //an array of columns to group by by default (can be multiple)
//           //   pagination: { pageIndex: 0, pageSize: 40 },
//           //   sorting: [{ id: "state", desc: false }], //sort by state by default
//           // }}
//           state={{ isLoading: false }}
//         />
//       </div>
//     </PageLayout>
//   );
// };

// export default UserAdd;

// let sampleData = [
//   {
//     id: 7,
//     title: "City of God",
//     year: "1996",
//     general: [
//       { title: "Crime", year: "1111" },
//       { title: "Drama", year: "1111" },
//     ],
//   },
// ];
