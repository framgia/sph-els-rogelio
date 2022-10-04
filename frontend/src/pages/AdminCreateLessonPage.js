import React from "react";
import PageLayout from "./components/layout/PageLayout";
import { useFormik } from "formik";
import { lessonValidationSchema } from "utilities/validation";
import Button from "./components/button/Button";
import { useCreateLessonMutation } from "store/lessonsSlice";
import { toast } from "react-toastify";
import withAdminProtection from "utilities/withAdminProtection";

const AdminCreateLessonPage = () => {
  const [createLesson, { isLoading }] = useCreateLessonMutation();
  const handleFormSubmit = async () => {
    try {
      const res = await createLesson(values).unwrap();
      toast.success(res.message);
      resetForm();
    } catch (error) {
      if (error && error.status === 500) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    }
  };
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    values,
    errors,
    isValid,
    touched,
  } = useFormik({
    initialValues: { title: "", description: "" },
    enableReinitialize: true,
    validationSchema: lessonValidationSchema,
    onSubmit: handleFormSubmit,
  });
  return (
    <PageLayout pageTitle={"Admin Dashboard | Create Lesson"}>
      <div className="m-auto d-flex justify-content-center align-items-center w-100 h-100">
        <form className="w-50 mt-5">
          <h3>Add Lesson/Category</h3>
          <div className="form-floating mb-2 my-3">
            <input
              type="text"
              onChange={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              className={`form-control ${
                errors.title && touched.title ? "border-danger" : ""
              }`}
              id="floatingInput"
              placeholder="Title"
            />
            <label htmlFor="floatingInput">Title</label>
            {errors.title && touched.title && (
              <span className="error small text-danger">{errors.title}</span>
            )}
          </div>
          <div className="form-floating">
            <textarea
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              className={`form-control ${
                errors.description && touched.description ? "border-danger" : ""
              }`}
              id="floatingInput"
              placeholder="Description"
              cols="30"
              rows="10"
              style={{ height: "100%" }}
            />
            <label htmlFor="floatingInput">Description</label>
            {errors.description && touched.description && (
              <span className="error small text-danger">
                {errors.description}
              </span>
            )}
          </div>
          <Button
            className={"w-100 mt-3 btn btn-lg btn-primary"}
            isValid={isValid}
            isLoading={isLoading}
            handleClick={handleSubmit}
            label={"Add Lesson"}
          />
        </form>
      </div>
    </PageLayout>
  );
};

export default withAdminProtection(AdminCreateLessonPage);
