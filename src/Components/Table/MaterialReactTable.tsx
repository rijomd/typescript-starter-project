import { useMemo, useState, useEffect } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { FormButton } from "../FormElements/FormButton";

type Props = {
  tableData: any[];
  columnData: any[];
  tableActions: any[];
  [detailedProps: string]: any;
};

export const MaterialReactTableComponent = ({
  tableData,
  columnData,
  tableActions,
  ...detailedProps
}: Props) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (tableData?.length > 0) setData(tableData);
    return () => {};
  }, [tableData]);
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => columnData, [columnData]);

  const renderActions = () => {
    let myArray = [];
    for (let item of tableActions) {
      myArray.push(
        <FormButton
          style={{ mr: 2, fontSize: 13 }}
          fullWidth={false}
          loading={false}
          onClick={() => item.onClick({})}
          color={item.color}
          variant="contained"
        >
          {item.label + " "} {item.icon}
        </FormButton>
      );
    }
    return <div style={{ display: "flex" }}>{myArray}</div>;
  };

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={data}
        renderTopToolbarCustomActions={() => renderActions()}
        {...detailedProps}
      />
    </div>
  );
};
