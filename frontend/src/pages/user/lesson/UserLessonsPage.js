import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserLessonsQuery } from "store/userLessonsSlice";
import withUserProtection from "utilities/withUserProtection";
import ErrorPage from "pages/components/error/ErrorPage";
import PageLayout from "pages/components/layout/PageLayout";
import DataLoading from "pages/components/loading/DataLoading";

const UserLessonsPage = () => {
  const [query, setQuery] = useState("All");
  const {
    data: userLessons,
    isError,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetUserLessonsQuery({ query }, { refetchOnMountOrArgChange: true });
  const handleFilterLessons = (e) => {
    setQuery(e.target.value);
  };
  let output;
  if (isLoading || isFetching) {
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
  if (isSuccess && !isFetching) {
    output = (
      <div className="row mt-4">
        {userLessons && userLessons.length ? (
          userLessons.map((lesson) => {
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
          })
        ) : (
          <h5 className="col-12 text-center">No lessons found</h5>
        )}
      </div>
    );
  }
  return (
    <PageLayout pageTitle={"Lessons"}>
      <div className="d-flex mt-3 align-items-center">
        <h1 className="me-4">Lessons</h1>
        <select
          className="form-select w-25"
          onChange={handleFilterLessons}
          defaultValue="All"
        >
          <option value="All">Show all lessons</option>
          <option value="Taken">Show all taken lessons</option>
          <option value="Untaken">Show all untaken lessons</option>
        </select>
      </div>
      <hr />
      {output}
    </PageLayout>
  );
};

export default withUserProtection(UserLessonsPage);
