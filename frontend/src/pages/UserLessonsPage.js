import React from "react";
import { Link } from "react-router-dom";
import withUserProtection from "../utilities/withUserProtection";
import PageLayout from "./components/layout/PageLayout";

const UserLessonsPage = () => {
  return (
    <PageLayout pageTitle={"Lessons"}>
      <div className="d-flex mt-3 align-items-center">
        <h1 className="me-4">Lessons</h1>
      </div>
      <hr />
      <div className="row mt-4">
        <div className="col-md-4 col-sm-12 col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-header small">10 new words</div>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div className="card-footer text-end">
              <Link replace to="/" className="btn btn-success disabled">
                Start Lesson
              </Link>
              <Link replace to="/" className="ms-2 btn btn-primary">
                View Result
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-header small">10 new words</div>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content. With supporting text below as a natural lead-in to
                additional content. With supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
            <div className="card-footer text-end">
              <Link replace to="/" className="btn btn-success">
                Start Lesson
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default withUserProtection(UserLessonsPage);
