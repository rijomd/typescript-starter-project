import React from "react";
import { Form } from "../../../Components/FormElements/GeneralFormik";

export const SampleForm = () => {
  const countryAutoCompleteCompo = [
    {
      label: "india",
      name: "india",
      code: "123",
    },
    {
      label: "Aus",
      name: "aus",
      code: "123",
    },
  ];
  const stateAutoCompleteCompo = [
    {
      label: "kerala",
      code: "111",
    },
    {
      label: "goa",
      code: "222",
    },
    {
      label: "mumbai",
      code: "333",
    },
  ];
  const formValues = [
    {
      name: "email",
      type: "text",
      error: { required: true },
      disabled: true,
    },
    {
      name: "name",
      type: "text",
      error: { required: true },
    },
    {
      name: "country",
      type: "autoCompleteSelect",
      error: { required: true },
      autoCompleteCompo: countryAutoCompleteCompo,
    },
    {
      name: "state",
      type: "autoCompleteSelect",
      error: { required: true },
      autoCompleteCompo: stateAutoCompleteCompo,
      multiple: true,
    },
  ];
  const initialValues = {
    email: "",
    name: "",
    country: "",
    state: [],
  };

  return (
    <div>
      <Form
        formValues={formValues}
        initialValues={initialValues}
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
};
