import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

import { TextInput } from "./FormText";
import { FormAutoComplete } from "./FormAutoComplete";
import { FormDatePicker } from "./FormDatePicker";

import { createYupSchema } from "./FormikMethod";

export const Form = forwardRef(
  ({ formValues, initialValues, onSubmit }, ref) => {
    const yepSchema = formValues.reduce(createYupSchema, {});
    const validateSchema = Yup.object().shape(yepSchema);

    const buttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
      onClick: () => {
        buttonRef.current.click();
      },
    }));

    const handleSubmit = (values) => {
      let newValues = { ...values };
      for (let item in values) {
        let isDate =
          Object.prototype.toString.call(values[item]) === "[object Date]";
        if (isDate) {
          newValues = { ...values, [item]: convert(values[item]) };
        }
      }
      onSubmit(newValues);
    };

    return (
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            handleSubmit(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            return (
              <form>
                <Grid container spacing={2}>
                  {formValues.map((item, key) => {
                    if (item?.type === "text" || item?.type === "number") {
                      return (
                        <Grid item md={4} xs={6} sm={6} lg={3} key={key}>
                          <TextInput
                            label={
                              item.name ? capitalizingData(item.name) : "Label"
                            }
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={values[item.name]}
                            name={item.name}
                            error={{
                              isError: errors[item.name] && touched[item.name],
                              errorMsg: errors[item.name],
                            }}
                            type={item?.type}
                            fullWidth={true}
                          />
                        </Grid>
                      );
                    }
                    if (item?.type === "autoCompleteSelect") {
                      return (
                        <Grid item md={4} xs={6} sm={6} lg={3} key={key}>
                          <FormAutoComplete
                            options={item?.autoCompleteCompo}
                            label={
                              item.name ? capitalizingData(item.name) : "Label"
                            }
                            disabled={item?.disabled ? item.disabled : false}
                            onChange={(e) => {
                              setFieldValue(item.name, e);
                            }}
                            value={values[item.name]}
                            name={item.name}
                            multiple={item.multiple ? true : false}
                            fullWidth={true}
                          />
                        </Grid>
                      );
                    }
                    if (item?.type === "date") {
                      let minDate = null;
                      let maxDate = null;
                      if (item.minDate && typeof item.minDate === "string") {
                        minDate = values[item.minDate];
                      }
                      if (item.maxDate && typeof item.maxDate === "string") {
                        maxDate = values[item.maxDate];
                      }
                      console.log(minDate, maxDate);
                      return (
                        <Grid item md={4} xs={6} sm={6} lg={3} key={key}>
                          <FormDatePicker
                            label={
                              item.name ? capitalizingData(item.name) : "Label"
                            }
                            disabled={item?.disabled ? item.disabled : false}
                            onChange={(e) => {
                              setFieldValue(item.name, e?.toDate() || null);
                            }}
                            error={{
                              isError: errors[item.name] && touched[item.name],
                              errorMsg: errors[item.name],
                            }}
                            value={values[item.name]}
                            name={item.name}
                            minDate={minDate === null ? item.minDate : minDate}
                            maxDate={maxDate === null ? item.maxDate : maxDate}
                            fullWidth={true}
                          />
                        </Grid>
                      );
                    }
                  })}
                  <Grid item md={4} xs={6} sm={6} lg={3}>
                    <button
                      onClick={handleSubmit}
                      ref={buttonRef}
                      type="submit"
                      disabled={isSubmitting}
                      style={{ display: "none" }}
                    >
                      Submit
                    </button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
);

const capitalizingData = (data) => {
  const array = data?.split(" ");
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }
  return array.join(" ");
};

const convert = (str) => {
  var date = new Date(str),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, month, date.getFullYear()].join("-");
};
