import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import withUserProtection from "../utilities/withUserProtection";
import PageLayout from "./components/layout/PageLayout";
import Button from "./components/button/Button";
import { lessonQuizValidationSchema } from "../utilities/validation";
import {
  useGetUserLessonQuery,
  useValidateUserLessonMutation,
} from "../store/userLessonsSlice";
import DataLoading from "./components/loading/DataLoading";
import ErrorPage from "./components/error/ErrorPage";
import { toast } from "react-toastify";

const UserLessonQuizPage = () => {
  const { lessonID } = useParams();
  const {
    data: userLesson,
    isLoading,
    isError,
    isSuccess,
  } = useGetUserLessonQuery({ id: lessonID });
  const [validateUserLesson, { isLoading: isValidating }] =
    useValidateUserLessonMutation();
  const handleFormSubmit = async () => {
    try {
      const res = await validateUserLesson({
        data: values,
        id: lessonID,
      }).unwrap();
      toast.success(res.message);
    } catch (error) {
      if (error && error.status === 500) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    }
  };
  const [index, setIndex] = useState(0);
  const { handleSubmit, setValues, values, errors, isValid } = useFormik({
    initialValues: {
      words: [],
    },
    enableReinitialize: true,
    validationSchema: lessonQuizValidationSchema,
    onSubmit: handleFormSubmit,
  });
  useEffect(() => {
    let temp = [];
    if (isSuccess) {
      userLesson.lesson.words.forEach((word) => {
        temp.push({ id: word.id, choice_id: -1 });
      });
    }
    setValues({ words: temp });
  }, [setValues, userLesson, isSuccess]);

  const handleChooseAnswer = async (e) => {
    let temp = [...values.words];
    temp[index].choice_id = parseInt(e.target.value);
    await setValues({ words: [...temp] });
  };
  const handleClickNext = () => {
    if (index + 1 < userLesson.lesson.words.length) {
      setIndex(index + 1);
    }
  };
  const handleClickPrevious = () => {
    if (index - 1 > -1) {
      setIndex(index - 1);
    }
  };
  let output;
  if (isLoading) {
    output = <DataLoading />;
  }
  if (isError) {
    output = (
      <ErrorPage
        errorStatus={401}
        errorType={"Unauthorized Access"}
        errorMessage={"You are not authorized to access this page."}
      />
    );
  }
  if (isSuccess) {
    output = !userLesson.is_taken ? (
      <>
        <div className="mb-3">
          <h5>Lesson Details</h5>
          <h6>
            Title: <span className="text-muted">{userLesson.lesson.title}</span>{" "}
          </h6>
          <h6>
            Description:{" "}
            <span className="text-muted">{userLesson.lesson.description}</span>{" "}
          </h6>
        </div>
        <hr />
        <Row>
          <Col>
            <h5>
              {index + 1} of {userLesson.lesson.words.length} Words
            </h5>
            <div className="border border-secondary p-3 rounded">
              <div className="">
                <h4>{userLesson.lesson.words[index].word}</h4>
              </div>
              <div>
                <h6 className="text-muted">
                  {userLesson.lesson.words[index].usage}
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button
                className={"mt-3 btn btn-lg w-100 btn-secondary text-center"}
                isValid={!Boolean(errors.words?.[index]?.choice_id)}
                handleClick={handleClickPrevious}
                label={"Previous"}
              />
              {userLesson.lesson.words.length === index + 1 ? (
                <Button
                  className={"mt-3 btn btn-lg w-100 btn-success text-center"}
                  isValid={isValid}
                  isLoading={isValidating}
                  handleClick={handleSubmit}
                  label={"Submit"}
                />
              ) : (
                <Button
                  className={"mt-3 btn btn-lg w-100 btn-primary text-center"}
                  isValid={!Boolean(errors.words?.[index]?.choice_id)}
                  handleClick={handleClickNext}
                  label={"Next"}
                />
              )}
            </div>
          </Col>
          <Col>
            <h5 className="me-4">Choices</h5>
            {errors.words?.[index]?.choice_id && (
              <span className="error small text-danger d-block">
                {errors.words[index].choice_id}
              </span>
            )}
            {userLesson.lesson.words[index].choices.map((choice) => {
              return (
                <div className="my-2" key={choice.id}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={choice.choice}
                      readOnly
                      aria-label="Text input with radio button"
                    />
                    <div className="input-group-text">
                      <input
                        className="form-check-input mt-0"
                        type="radio"
                        onChange={handleChooseAnswer}
                        checked={choice.id === values.words?.[index]?.choice_id}
                        value={choice.id}
                        name={index}
                        aria-label="Radio button for following text input"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </>
    ) : (
      <ErrorPage
        errorStatus={404}
        errorType={"Lesson Not Found"}
        errorMessage={"Lesson may not exist or you already took the lesson."}
      />
    );
  }
  return (
    <PageLayout pageTitle={"Lesson Quiz"}>
      <div className="d-flex my-3 align-items-center">
        <h1 className="me-4">Lesson Quiz</h1>
        <Link
          className="btn btn-secondary my-auto"
          replace
          to={`/user/lessons`}
        >
          Back
        </Link>
      </div>
      <hr />
      {output}
    </PageLayout>
  );
};

export default withUserProtection(UserLessonQuizPage);
