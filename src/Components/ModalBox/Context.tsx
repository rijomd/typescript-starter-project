// import { useEffect, useState } from "react";
// import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";

// const UserEdit = ({ }) => {
//   const renderData = [1, 2, 3, 4, 5];
//   const [openModal, setOpenModal] = useState({ isOpen: false, data: "" });

//   const focusElement = (e, data) => {
//     clearFocusing();
//     if (e.keyCode === 40) {
//       focusingRows(`sample-element-${data + 1}`);
//     }
//     if (e.keyCode === 38) {
//       focusingRows(`sample-element-${data + -1}`);
//     }
//   };

//   const clearFocusing = () => {
//     let columns = document.getElementsByTagName("td");
//     for (let element of columns) {
//       if (element) {
//         element.autofocus = false;
//         element.style.backgroundColor = "#fff";
//       }
//     }
//   };

//   const focusingRows = (cellId) => {
//     let columns = document.getElementsByClassName(cellId);
//     if (columns?.length > 0) {
//       let tr = columns[0]?.parentNode;
//       for (let td of columns) {
//         td.focus();
//         td.style.backgroundColor = "#ccc";
//         td.style.outline = "none";
//         td.style.border = "none";
//         td.autofocus = true;
//       }
//     }
//   };

//   const handleSubmit = (e, data) => {
//     if (e.code === "Enter") {
//       console.log(data, "data");
//     }
//   };

//   useEffect(() => {
//     focusingRows("sample-element-0");
//     return () => {
//       clearFocusing();
//     };
//   }, []);

//   return (
//     <div>
//       <TableContainer style={{ marginTop: "1rem" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {["ONE", "NAME", "ADDRESS", "PAGE", "AGE"].map((item, key) => (
//                 <TableCell key={key} style={{ backgroundColor: "blue" }}>
//                   {item}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {renderData.map((data, mainIndex) => (
//               <TableRow key={data} className={`tr-${mainIndex}`}>
//                 {["One", "two", "three", "four", "five"].map((item, index) => (
//                   <TableCell
//                     className={`sample-element-${mainIndex}`}
//                     key={index}
//                     tabIndex={mainIndex}
//                     onKeyPress={(e) => handleSubmit(e, data)}
//                     onKeyDown={(e) => focusElement(e, mainIndex)}
//                     onContextMenu={(e) => {
//                       e.preventDefault();
//                       setOpenModal({ isOpen: true, data: { ...data, xPos: `${e.pageX}px`, yPos: `${e.pageY}px`, } })
//                     }}  //right click
//                   >
//                     <ContextMenu showMenu={openModal.isOpen} xPos={openModal.data.xPos} yPos={openModal.data.yPos} />
//                     {item}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>


//     </div >
//   );
// };
// export default UserEdit;


// export const ContextMenu = (props) => {
//   const { showMenu, xPos, yPos, closeMenu } = props;

//   return <div>
//     {showMenu && <ul
//       className="menu"
//       style={{
//         top: yPos,
//         left: xPos,
//         position: "absolute"
//       }}
//     >
//       <li>Login</li>
//       <li>Register</li>
//       <li>Open Profile</li>
//     </ul>}
//     {!showMenu && <></>}
//   </div >
// }