import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "utilities/useAuth";
import { loginValidationSchema } from "utilities/validation";
import Button from "pages/components/button/Button";
import withAuth from "utilities/withAuth";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const { signIn, isLoading } = useAuth();
  const handleFormSubmit = async () => {
    signIn(values.email, values.password).then((res) => {
      if (res.status) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isValid,
    touched,
  } = useFormik({
    initialValues: { email: "", password: "" },
    enableReinitialize: true,
    validationSchema: loginValidationSchema,
    onSubmit: handleFormSubmit,
  });
  return (
    <div className="container vh-100">
      <Helmet>
        <title>E-Learning | Login</title>
      </Helmet>
      <main className="m-auto d-flex justify-content-center align-items-center w-100 h-100">
        <form>
          <h1 className="h3 mb-3 fw-normal text-center ">
            Sign in to E-Learning
          </h1>
          <div className="form-floating">
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
            <label htmlFor="floatingInput">Email address</label>
            {errors.email && touched.email && (
              <span className="error small text-danger">{errors.email}</span>
            )}
          </div>
          <div className="form-floating mt-1">
            <input
              type="password"
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              className={`form-control ${
                errors.password && touched.password ? "border-danger" : ""
              }`}
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingInput">Password</label>
            {errors.password && touched.password && (
              <span className="error text-danger small">{errors.password}</span>
            )}
          </div>
          <Button
            className={"w-100 mt-3 btn btn-lg btn-primary"}
            isValid={isValid}
            isLoading={isLoading}
            handleClick={handleSubmit}
            label={"Login"}
          />
          <Link
            className="w-100 mt-2 btn btn-lg btn-success"
            to={"/register"}
            replace
          >
            Sign Up
          </Link>
          <p className="mt-5 mb-3 text-muted text-center">
            &copy; ELearning | Oliverio 2022
          </p>
        </form>
      </main>
    </div>
  );
};

export default withAuth(LoginPage);
