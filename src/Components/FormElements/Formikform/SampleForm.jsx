import React, { useRef } from "react";
import { Form } from "../../../Components/FormElements/GeneralFormik";
import { BasicButton } from "./sampleButton";
import * as Yup from "yup";

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
    {
      name: "fromDate",
      type: "date",
      minDate: new Date(),
      maxDate: new Date("05-05-2023"),
      validationType: "date",
      validations: [
        {
          type: "required",
          params: ["From Date  is required"],
        },
        {
          type: "max",
          params: [new Date("05-05-2023"), "From Date have limit "],
        },
      ],
      handleTextDisable: true, //disable handle change on typing
    },
    {
      name: "toDate",
      type: "date",
      minDate: "fromDate",
      maxDate: new Date("05-05-2023"),
      validationType: "date",
      validations: [
        {
          type: "required",
          params: ["To Date  is required"],
        },
        {
          type: "min",
          params: [Yup.ref("fromDate"), "To Date have limit "],
        },
      ],
    },
  ];
  const initialValues = {
    email: "",
    name: "",
    mark: "",
    country: "",
    fromDate: new Date(),
    toDate: new Date(),
    state: [],
  };
  const formikRef = useRef(null);

  return (
    <div>
      <Form
        formValues={formValues}
        initialValues={initialValues}
        onSubmit={(data) => {
          console.log(data, "data");
        }}
        ref={formikRef}
      />
      <BasicButton
        label="Submit"
        onClick={() => {
          formikRef?.current?.onClick();
        }}
      />
    </div>
  );
};
