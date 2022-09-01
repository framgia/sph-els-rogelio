import { useFormik } from "formik";
import React, { useEffect } from "react";
import { generalInfoValidationSchema } from "../../../utilities/validation";
import Button from "../button/Button";

const GeneralInfoSection = ({ name, email }) => {
  const handleFormSubmit = async () => {};
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
    values,
    errors,
    isValid,
    touched,
  } = useFormik({
    initialValues: { name: "", email: "" },
    enableReinitialize: true,
    validationSchema: generalInfoValidationSchema,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    if (name && email) {
      setValues({ name, email });
    }
  }, [name, email, setValues]);

  return (
    <div>
      <h5 className="mb-3">General Info</h5>
      <div className="form-floating mb-1">
        <input
          type="text"
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          value={values.name}
          className={`form-control ${
            errors.name && touched.name ? "border-danger" : ""
          }`}
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Name</label>
        {errors.name && touched.name && (
          <span className="error small text-danger">{errors.name}</span>
        )}
      </div>
      <div className="form-floating mb-2">
        <input
          type="email"
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          value={values.email}
          className={`form-control ${
            errors.email && touched.email ? "border-danger" : ""
          }`}
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Email</label>
        {errors.email && touched.email && (
          <span className="error small text-danger">{errors.email}</span>
        )}
      </div>
      <div className="d-flex">
        <div className="ms-auto">
          <Button
            label={"Save"}
            isValid={isValid}
            className={"btn btn-primary"}
            handleClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoSection;
