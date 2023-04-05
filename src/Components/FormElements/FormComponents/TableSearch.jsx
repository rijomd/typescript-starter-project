import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";

import { TextInput } from "../FormText";
import { Modal } from "../../ModalBox/Modal";

import { dataArray } from "../../Table/data";
import { NormalTable } from "../../Table/NormalTable";

export const TableSearch = ({
  label,
  error = { isError: false, errorMsg: "" },
  value,
  type,
  name,
  onChange,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [tableData, setMyTableData] = useState([]);

  let headers = [
    { name: "isbn", headerName: "Id", isFilterEnabled: true, width: "20px" },
    { name: "title", headerName: "Title", isFilterEnabled: true },
    { name: "pageCount", headerName: "Page Count", isFilterEnabled: true },
    { name: "runtime", headerName: "Run Time", isFilterEnabled: true },
    { name: "country", headerName: "Country", isFilterEnabled: true },
  ];

  useEffect(() => {
    if (dataArray?.length > 0) {
      setMyTableData(dataArray);
    }
    return () => {};
  }, [dataArray]);

  return (
    <div>
      <div style={{ display: "flex", width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item lg={10} md={10} xs={10}>
            <TextInput
              label={label}
              error={error}
              value={value}
              type={type}
              name={name}
              fullWidth={true}
              onChange={() => {
                onChange(value);
              }}
            />
          </Grid>
          <Grid item lg={2} md={2} xs={2}>
            <Button variant="outlined" onClick={() => setOpenModal(true)}>
              Open
            </Button>
          </Grid>
        </Grid>
      </div>

      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        maxWidth="md"
        fullScreen={false}
        title="Category Table"
      >
        <div>
          <NormalTable
            headers={headers}
            tableData={tableData ? tableData : []}
            onRowClick={(data) => {
              onChange(data?.title);
              setOpenModal(false);
            }}
            sortBy={"title"}
            pagination={false}
            headerStyle={{
              backgroundColor: "#ccc",
              color: "black",
              textAlign: "start",
              height: "40px",
              width: "auto",
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
