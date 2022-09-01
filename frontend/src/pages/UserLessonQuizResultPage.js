import React from "react";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { useShowResultQuery } from "../store/userLessonsSlice";
import withUserProtection from "../utilities/withUserProtection";
import { customStyles } from "./components/datatable/datatable";
import ErrorPage from "./components/error/ErrorPage";
import PageLayout from "./components/layout/PageLayout";
import DataLoading from "./components/loading/DataLoading";

const UserLessonQuizResultPage = () => {
  const { lessonID } = useParams();
  const {
    data: result,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useShowResultQuery({ id: lessonID }, { refetchOnMountOrArgChange: true });
  const columns = [
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`material-icons-outlined text-${
            row.choice.is_correct ? "success" : "danger"
          }`}
        >
          {row.choice.is_correct ? "check" : "close"}
        </span>
      ),
    },
    {
      name: "Word",
      selector: (row) => row.word_question.word,
      wrap: true,
    },
    {
      name: "Correct Answer/s",
      cell: (row) => {
        let filtered = row.word_question?.choices?.filter((choice) => {
          return choice.is_correct;
        });
        return filtered.map((choice) => {
          return <div key={choice.id}>{choice.choice}</div>;
        });
      },
    },
    {
      name: "Your Answer",
      selector: (row) => row.choice.choice,
    },
  ];
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
    let filteredCorrect = result?.lesson?.learned_words.filter((words) => {
      return words.choice.is_correct;
    });
    output = result.is_taken ? (
      <>
        <div className="mb-3">
          <div className="d-flex">
            <h4>Lesson Details</h4>
            <h5 className="ms-auto">
              You learned {filteredCorrect.length} of{" "}
              {result.lesson.learned_words.length} new words{" "}
            </h5>
          </div>
          <h6>
            Title:{" "}
            <span className="text-muted">{result.lesson.lesson.title}</span>{" "}
          </h6>
          <h6>
            Description:{" "}
            <span className="text-muted">
              {result.lesson.lesson.description}
            </span>{" "}
          </h6>
        </div>
        <DataTable
          columns={columns}
          data={result.lesson.learned_words}
          customStyles={customStyles}
          pagination
        />
      </>
    ) : (
      <ErrorPage
        errorStatus={404}
        errorType={"Result Not Found"}
        errorMessage={
          "Lesson may not be taken yet. Please take the lesson first."
        }
      />
    );
  }
  return (
    <PageLayout pageTitle={"Lesson Quiz Result"}>
      <div className="d-flex mt-3 align-items-center">
        <h1 className="me-4">Lesson Quiz Result</h1>
        <Link className="btn btn-success my-auto" replace to={`/user/lessons`}>
          Back
        </Link>
      </div>
      <hr />
      {output}
    </PageLayout>
  );
};

export default withUserProtection(UserLessonQuizResultPage);
