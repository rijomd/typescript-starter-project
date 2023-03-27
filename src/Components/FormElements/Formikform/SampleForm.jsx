import React from "react";
import { Form } from "../../../Components/FormElements/GeneralFormik";

export const SampleForm = () => {
  const countryAutoCompleteCompo = [
    {
      label: "india",
      code: "123",
    },
    {
      label: "Aus",
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
      disabled: false,
      validationType: "string",
      validations: [
        {
          type: "required",
          params: ["Email is required"],
        },
        {
          type: "email",
          params: ["please enter a valid email"],
        },
      ],
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "mark",
      type: "number",
      validationType: "number",
      validations: [
        {
          type: "required",
          params: ["Mark  is required"],
        },
        {
          type: "min",
          params: [35, "Mark cannot be less than 35 "],
        },
        {
          type: "max",
          params: [100, "Mark cannot be more than 100 "],
        },
      ],
    },
    {
      name: "country",
      type: "autoCompleteSelect",
      autoCompleteCompo: countryAutoCompleteCompo,
    },
    {
      name: "state",
      type: "autoCompleteSelect",
      autoCompleteCompo: stateAutoCompleteCompo,
      multiple: true,
    },
  ];
  const initialValues = {
    email: "",
    name: "",
    mark: "",
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
