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
//     },
//     {
//       accessorKey: "actors",
//       enableColumnOrdering: false,
//       header: "Actors",
//     },
//   ];

//   return (
//     <PageLayout title="Add User" actions={action}>
//       <div>
//         <MaterialReactTableComponent
//           tableData={dataArray}
//           columnData={columnData}
//           getSubRows={(data: any) => data.general} //for get
//           enableExpanding
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
