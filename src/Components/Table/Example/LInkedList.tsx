
// import { useEffect, useState } from "react";
// import { Grid, Button } from "@mui/material";

// const UserEdit = ({ }) => {
//   let dataArray = [10, 20, 30, 40, 50];
//   const [myList, setMyList] = useState();
//   const [firstNode, setFirstNode] = useState({ value: {}, next: null });
//   const [lastNode, setLastNode] = useState({ value: {}, next: null });

//   useEffect(() => {
//     if (dataArray?.length > 0) {
//       let list = createLinkedList(dataArray);
//       setMyList(list);
//     }
//     return () => { }
//   }, [])

//   const createLinkedList = (array) => {
//     let list = { value: array[0], next: null };
//     let selectedNode = list;
//     setFirstNode(selectedNode);
//     array.map((item) => {
//       selectedNode.next = { value: item, next: null };
//       selectedNode = selectedNode.next;
//       setLastNode(selectedNode);
//     })
//     return list;
//   }

//   const insertAtBeginning = (data) => {
//     let newNode = { value: data, next: null };
//     setFirstNode(newNode);
//     newNode.next = myList;
//     let selectedNode = newNode;
//     setMyList(selectedNode);
//   }

//   const show = () => {
//     console.log(myList, "myList");
//   }

//   return (
//     <div>
//       <Grid container>
//         <Grid item md={8}>
//           <Button onClick={() => insertAtBeginning(60)}>Create</Button>
//           <Button onClick={() => show()}>Show</Button>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
// export default UserEdit;
