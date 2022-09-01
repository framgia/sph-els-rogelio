import React from "react";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { useGetWordsChoicesQuery } from "../store/wordsChoicesSlice";
import withAdminProtection from "../utilities/withAdminProtection";
import Button from "./components/button/Button";
import { customStyles } from "./components/datatable/datatable";
import ErrorPage from "./components/error/ErrorPage";
import PageLayout from "./components/layout/PageLayout";
import DataLoading from "./components/loading/DataLoading";

const AdminWordsChoicesPage = () => {
  const { lessonID } = useParams();
  const {
    data: lesson,
    isLoading,
    isError,
    isSuccess,
  } = useGetWordsChoicesQuery(lessonID);
  const columns = [
    {
      name: "Word",
      selector: (row) => row.word,
      wrap: true,
      width: "20%",
    },
    {
      name: "Usage",
      selector: (row) => row.usage,
      wrap: true,
      style: {},
      width: "25%",
    },
    {
      name: "Choices",
      cell: (row) =>
        row.choices &&
        row.choices.map((choice) => {
          return (
            <span key={choice.id} className="d-flex align-items-center">
              <span
                className={`material-icons-outlined text-${
                  choice.is_correct ? "success" : "danger"
                }`}
              >
                {choice.is_correct ? "check" : "close"}
              </span>
              {choice.is_correct ? <b>{choice.choice}</b> : choice.choice}
            </span>
          );
        }),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="w-100 d-flex gap-1">
          <Button
            className="btn btn-warning btn-sm"
            label="Edit"
            isValid={true}
          />
          <Button
            className="btn btn-danger btn-sm"
            label="Delete"
            isValid={true}
          />
        </div>
      ),
    },
  ];
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
      <>
        <hr />
        <div className="mb-3">
          <h4>Lesson Details</h4>
          <h6>Title: {lesson.title}</h6>
          <h6>Description: {lesson.description}</h6>
        </div>
        <DataTable
          columns={columns}
          data={lesson.words}
          customStyles={customStyles}
          pagination
        />
      </>
    );
  }
  return (
    <PageLayout pageTitle={"Admin Words and Choices"}>
      <div className="d-flex mt-3 align-items-center">
        <h1 className="me-4">Words and Choices</h1>
        <Link
          className="btn btn-success my-auto"
          replace
          to="/lessons/:id/words/create"
        >
          Add Word
        </Link>
      </div>
      {output}
    </PageLayout>
  );
};

export default withAdminProtection(AdminWordsChoicesPage);
