import React, { useEffect } from "react";
import PageLayout from "pages/components/layout/PageLayout";
import { useFormik } from "formik";
import { lessonValidationSchema } from "utilities/validation";
import Button from "pages/components/button/Button";
import { useParams } from "react-router-dom";
import { useGetLessonQuery, useUpdateLessonMutation } from "store/lessonsSlice";
import DataLoading from "pages/components/loading/DataLoading";
import ErrorPage from "pages/components/error/ErrorPage";
import { toast } from "react-toastify";
import withAdminProtection from "utilities/withAdminProtection";

const AdminUpdateLessonPage = () => {
  const { id } = useParams();
  const {
    data: lesson,
    isLoading: fetchLessonLoading,
    isError,
    isSuccess,
  } = useGetLessonQuery(id);
  const [updateLesson, { isLoading: updateLessonLoading }] =
    useUpdateLessonMutation();
  const handleFormSubmit = async () => {
    try {
      const res = await updateLesson({ data: values, id }).unwrap();
      toast.success(res.message);
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
    setValues,
    values,
    errors,
    isValid,
    touched,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    enableReinitialize: true,
    validationSchema: lessonValidationSchema,
    onSubmit: handleFormSubmit,
  });
  useEffect(() => {
    if (isSuccess) {
      setValues({ title: lesson.title, description: lesson.description });
    }
  }, [isSuccess, lesson, setValues]);
  let output;
  if (fetchLessonLoading) {
    output = <DataLoading />;
  }
  if (isError) {
    output = (
      <ErrorPage
        errorStatus={404}
        errorType={"Data not found"}
        errorMessage={"We did not find the data you are looking for."}
      />
    );
  }

  if (isSuccess) {
    output = (
      <div className="m-auto d-flex justify-content-center align-items-center w-100 h-100">
        <form className="w-50 mt-5">
          <h3>Update Lesson/Category</h3>
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
            isLoading={fetchLessonLoading || updateLessonLoading}
            handleClick={handleSubmit}
            label={"Update Lesson"}
          />
        </form>
      </div>
    );
  }
  return (
    <PageLayout pageTitle={"Admin Dashboard | Update Lesson"}>
      {output}
    </PageLayout>
  );
};

export default withAdminProtection(AdminUpdateLessonPage);
