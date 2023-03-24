import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

import { TextInput } from "./FormText";
import { FormAutoComplete } from "./FormAutoComplete";

const generalFormikSchema = Yup.object().shape({
  // firstName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // lastName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const Form = ({ formValues, initialValues, onSubmit }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={generalFormikSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onSubmit(values);
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
        }) => (
          <form onSubmit={handleSubmit}>
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
              })}
              <Grid item md={4} xs={6} sm={6} lg={3}>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
};

const capitalizingData = (data) => {
  const array = data?.split(" ");
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }
  return array.join(" ");
};
