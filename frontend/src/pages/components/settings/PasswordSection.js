import { useFormik } from "formik";
import React from "react";
import { passwordValidationSchema } from "../../../utilities/validation";
import Button from "../button/Button";

const PasswordSection = () => {
  const handleFormSubmit = async () => {};
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isValid,
    touched,
  } = useFormik({
    initialValues: { password: "", newPassword: "", repeatNewPassword: "" },
    enableReinitialize: true,
    validationSchema: passwordValidationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <div>
      <h5 className="mb-3">Change Password</h5>
      <div className="form-floating mb-1">
        <input
          type="password"
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          value={values.password}
          className={`form-control ${
            errors.password && touched.password ? "border-danger" : ""
          }`}
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Current Password</label>
        {errors.password && touched.password && (
          <span className="error small text-danger">{errors.password}</span>
        )}
      </div>
      <div className="form-floating mb-1">
        <input
          type="password"
          onChange={handleChange("newPassword")}
          onBlur={handleBlur("newPassword")}
          value={values.newPassword}
          className={`form-control ${
            errors.newPassword && touched.newPassword ? "border-danger" : ""
          }`}
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">New Password</label>
        {errors.newPassword && touched.newPassword && (
          <span className="error small text-danger">{errors.newPassword}</span>
        )}
      </div>
      <div className="form-floating mb-2">
        <input
          type="password"
          onChange={handleChange("repeatNewPassword")}
          onBlur={handleBlur("repeatNewPassword")}
          value={values.repeatNewPassword}
          className={`form-control ${
            errors.repeatNewPassword && touched.repeatNewPassword
              ? "border-danger"
              : ""
          }`}
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Repeat New Password</label>
        {errors.repeatNewPassword && touched.repeatNewPassword && (
          <span className="error small text-danger">
            {errors.repeatNewPassword}
          </span>
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

export default PasswordSection;
