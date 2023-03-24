import React from "react";
import { Form } from "../../../Components/FormElements/GeneralFormik";

export const SampleForm = () => {
  const countryAutoCompleteCompo = [
    {
      label: "india",
      name: "india",
      code: "123",
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
  ];
  const initialValues = {
    email: "",
    name: "",
    country: "",
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
