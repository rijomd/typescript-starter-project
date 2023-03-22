import { useEffect, useState } from "react";
import { Grid, Autocomplete, TextField, Checkbox } from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = {
  label: string;
  value: any;
  onChange: (data: any) => void;
  options: any;
  getOptionDisabled: any;
  multiple: boolean;
  error: { isError: boolean; errorMsg: string };
  [x: string]: any;
  required: boolean;
};

export const FormAutoComplete = ({
  x,
  label,
  value,
  onChange,
  options,
  getOptionDisabled,
  multiple,
  required,
  error,
}: Props) => {
  const [multiOptions, setMultiOptions] = useState([]);
  const [inputValue, setInputValue] = useState<any>("");

  useEffect(() => {
    if (multiple) {
      setMultiOptions(options);
    }
    return () => {};
  }, [label]);

  return (
    <div>
      <Grid container>
        <Grid item md={3}>
          <Autocomplete
            id="controllable-states-demo"
            size="small"
            disablePortal
            options={multiple ? multiOptions : options}
            getOptionDisabled={getOptionDisabled}
            multiple={multiple}
            value={value}
            onChange={(event: any, newValue: any) => {
              onChange(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event: any, newInputValue: any) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                helperText={error.isError ? error.errorMsg : ""}
                error={error.isError}
                required={required}
              />
            )}
            renderOption={(props, option: any, { selected }) => {
              return (
                <li {...props}>
                  {multiple && (
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                  )}
                  {option.label}
                </li>
              );
            }}
            {...x}
          />
        </Grid>
      </Grid>
    </div>
  );
};
// let options=[{label:"" ,"" :"",":"....}]
