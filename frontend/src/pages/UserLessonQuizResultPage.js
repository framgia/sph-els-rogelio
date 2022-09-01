import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { dummyWordsChoicesResult } from "../utilities/dummyData";
import withUserProtection from "../utilities/withUserProtection";
import { customStyles } from "./components/datatable/datatable";
import PageLayout from "./components/layout/PageLayout";

const UserLessonQuizResultPage = () => {
  const filteredCorrect = dummyWordsChoicesResult.learned_words.filter(
    (words) => {
      return words.choice.is_correct === true;
    }
  );
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
        let filtered = row.word_question.choices.filter((choice) => {
          return choice.is_correct === true;
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
  return (
    <PageLayout pageTitle={"Lesson Quiz Result"}>
      <div className="d-flex mt-3 align-items-center">
        <h1 className="me-4">Lesson Quiz Result</h1>
        <Link className="btn btn-success my-auto" replace to={`/user/lessons`}>
          Back
        </Link>
        <h5 className="ms-auto">
          You learned {filteredCorrect.length} of{" "}
          {dummyWordsChoicesResult.learned_words.length} new words{" "}
        </h5>
      </div>
      <hr />
      <div className="mb-3">
        <h4>Lesson Details</h4>
        <h6>
          Title:{" "}
          <span className="text-muted">{dummyWordsChoicesResult.title}</span>{" "}
        </h6>
        <h6>
          Description:{" "}
          <span className="text-muted">
            {dummyWordsChoicesResult.description}
          </span>{" "}
        </h6>
      </div>
      <DataTable
        columns={columns}
        data={dummyWordsChoicesResult.learned_words}
        customStyles={customStyles}
        pagination
      />
    </PageLayout>
  );
};

export default withUserProtection(UserLessonQuizResultPage);
