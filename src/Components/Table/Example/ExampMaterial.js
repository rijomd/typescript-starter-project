// import { Box } from "@mui/material";

// import { MaterialReactTableComponent } from "../../../Components/Table";
// import { dataArray } from "../../../Components/Table/data";
// import { PageLayout } from "../../../Layout/Components/PageLayout";

// type Props = {};

// const UserAdd = (props: Props) => {
//   const action: any[] = [];

//   let columnData: any = [
//     {
//       accessorKey: "title",
//       header: "Title",
//     },
//     {
//       accessorKey: "year",
//       header: "Year",
//     },
//     {
//       accessorKey: "director",
//       header: "Directors",
//     },
//     {
//       accessorKey: "runtime",
//       header: "Runtime",
//       aggregationFn: "sum",
//       AggregatedCell: ({ cell }: any) => (
//         <div>Total Runtime: {cell.getValue()}</div>
//       ),
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
//     <PageLayout title="Add User" actions={action}>
//       <div>
//         <MaterialReactTableComponent
//           tableData={dataArray}
//           columnData={columnData}
//           getSubRows={(data: any) => data.general} //for getting subRows for expanding
//           enableExpanding={false} //subRows for expanding conditions
//           enableColumnResizing={true} //enable resize columns
//           enableGrouping={false} // enabling grouping and arrows
//           initialState={{
//             density: "compact",
//             expanded: false, //expand all groups by default
//             grouping: ["country"], //an array of columns to group by by default (can be multiple)
//             pagination: { pageIndex: 0, pageSize: 40 },
//             sorting: [{ id: "state", desc: false }], //sort by state by default
//           }}
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
