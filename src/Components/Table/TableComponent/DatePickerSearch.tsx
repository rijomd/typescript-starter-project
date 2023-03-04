import { useState } from "react";
import { Stack, TextField } from "@mui/material";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from "dayjs";

type Props = {
  onChange: (data: any | null) => void;
};

export const DatePickerSearch = ({ onChange }: Props) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(null));

  const handleChange = (newValue: any | null) => {
    setValue(newValue);
    onChange(newValue?.toISOString());
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            views={['year', 'month', 'day']}
            value={value}
            onChange={handleChange}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
};
