import * as yup from "yup";

export function createYupSchema(schema, config) {
  const { name, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  console.log(validator);
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    console.log(type, params);
    validator = validator[type](...params);
  });
  schema[name] = validator;
  return schema;
}
