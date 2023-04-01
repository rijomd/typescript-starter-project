import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  label: string;
  value: any;
  onChange: (data: Dayjs | null) => void;
  disabled: boolean;
  required: boolean;
  error: { isError: boolean; errorMsg: string };
  fullWidth: boolean;
  minDate: any;
  maxDate: any;
  onKeyDown: (e: any) => void;
  [x: string]: any;
};

export const FormDatePicker = ({
  label,
  value,
  onChange,
  disabled,
  error,
  required,
  fullWidth,
  minDate,
  maxDate,
  onKeyDown,
  ...x
}: Props) => {
  const [inputValue, setInputValue] = React.useState<Dayjs | null>(null);

  React.useEffect(() => {
    if (value) {
      setInputValue(dayjs(value));
    }
    return () => {};
  }, [value]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={inputValue}
          disabled={disabled}
          minDate={minDate || null}
          maxDate={maxDate || null}
          inputFormat="DD-MM-YYYY"
          onChange={(newValue) => {
            setInputValue(newValue);
            onChange(newValue);
          }}
          renderInput={(params:any) => (
            <TextField
              {...params}
              helperText={error.errorMsg?.length > 0 ? error.errorMsg : ""}
              error={error.errorMsg?.length > 0}
              required={required}
              fullWidth={fullWidth}
              size="small"
              autoComplete="off"
              onKeyDown={(e) => onKeyDown(e)}
            />
          )}
          {...x}
        />
      </LocalizationProvider>
    </div>
  );
};
