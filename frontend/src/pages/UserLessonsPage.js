import React from "react";
import { Link } from "react-router-dom";
import { useGetUserLessonsQuery } from "../store/userLessonsSlice";
import withUserProtection from "../utilities/withUserProtection";
import ErrorPage from "./components/error/ErrorPage";
import PageLayout from "./components/layout/PageLayout";
import DataLoading from "./components/loading/DataLoading";

const UserLessonsPage = () => {
  const {
    data: userLessons,
    isError,
    isLoading,
    isSuccess,
  } = useGetUserLessonsQuery();
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
    output = (
      <div className="row mt-4">
        {userLessons.map((lesson) => {
          return (
            <div
              key={lesson.lesson.id}
              className="col-md-4 col-sm-12 col-lg-4 mb-4"
            >
              <div className="card h-100">
                <div className="card-header small">
                  {lesson.is_taken
                    ? `Lesson is already taken`
                    : `${lesson.lesson.words.length} new words`}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{lesson.lesson.title}</h5>
                  <p className="card-text">{lesson.lesson.description}</p>
                </div>
                <div className="card-footer text-end">
                  <Link
                    replace
                    to={`/user/lessons/${lesson.lesson.id}/take`}
                    className={`btn btn-success ${
                      lesson.is_taken ? "disabled" : ""
                    }`}
                  >
                    Start Lesson
                  </Link>
                  {lesson.is_taken && (
                    <Link
                      replace
                      to={`/user/lessons/${lesson.lesson.id}/result`}
                      className="ms-2 btn btn-primary"
                    >
                      View Result
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <PageLayout pageTitle={"Lessons"}>
      <div className="d-flex mt-3 align-items-center">
        <h1 className="me-4">Lessons</h1>
      </div>
      <hr />
      {output}
    </PageLayout>
  );
};

export default withUserProtection(UserLessonsPage);
