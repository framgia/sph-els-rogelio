import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetUserDashboardQuery } from "../store/dashboardSlice";
import { countLearnedWords } from "../utilities/countLearnedWords";
import useAuth from "../utilities/useAuth";
import withUserProtection from "../utilities/withUserProtection";
import ErrorPage from "./components/error/ErrorPage";
import PageLayout from "./components/layout/PageLayout";
import LessonsList from "./components/learnings/LessonsList";
import WordsList from "./components/learnings/WordsList";
import DataLoading from "./components/loading/DataLoading";

const LessonsWordsPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const { user } = useAuth();
  const {
    data: userDashboard,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetUserDashboardQuery({}, { refetchOnMountOrArgChange: true });

  let output;
  if (isLoading || isFetching) {
    output = <DataLoading />;
  }
  if (isError) {
    output = (
      <ErrorPage
        errorStatus={404}
        errorType={"User not found"}
        errorMessage={"The user you are looking for is not found."}
      />
    );
  }
  if (isSuccess && !isFetching) {
    output = (
      <Row className="p-5 h-100">
        <Col className="h-100">
          <h4 className="mb-3">Dashboard</h4>
          <div className="card p-3">
            <div className="d-flex align-items-center justify-content-center ">
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/${userDashboard.avatar}`}
                width="100"
                alt="user-profile"
                height="100"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-2 border p-1 border-3 border-success"
              />
              <div>
                <h5 className="d-inline">{userDashboard.name}</h5>
                <span className="small d-block">{userDashboard.email}</span>
              </div>
            </div>
            <div className="text-center">
              <hr />
              <div className="w-100 d-flex align-items-center gap-1 justify-content-center">
                <span
                  role={"button"}
                  onClick={() => navigate("/learned/lessons")}
                  className="bg-secondary small w-100 p-1 px-4 rounded text-white"
                >
                  Finished {userDashboard.finished_lessons.length} lessons
                </span>
                <span
                  role={"button"}
                  onClick={() => navigate("/learned/words")}
                  className="bg-secondary small w-100 p-1 px-4 rounded text-white"
                >
                  Learned {countLearnedWords(userDashboard.finished_lessons)}{" "}
                  words
                </span>
              </div>
              <Link
                replace
                to={`/profile/${user.id}`}
                className="btn btn-outline-success btn-sm btn-block w-100 mt-2"
              >
                View Profile
              </Link>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} className="h-100">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item h6">
                <Link to={"/dashboard"}>Activities</Link>
              </li>
              <li className="breadcrumb-item h6 active" aria-current="page">
                {type === "lessons" ? "Finished Lessons" : "Learned Words"}
              </li>
            </ol>
          </nav>
          <div
            className="shadow-sm border rounded border-secondary p-3"
            style={{
              overflowY: "auto",
              height: "calc(100vh - 300px)",
            }}
          >
            {type === "lessons" ? (
              <LessonsList finished_lessons={userDashboard.finished_lessons} />
            ) : (
              <WordsList finished_lessons={userDashboard.finished_lessons} />
            )}
          </div>
        </Col>
      </Row>
    );
  }
  return (
    <PageLayout pageTitle={"Finished lessons and Learned words"}>
      {output}
    </PageLayout>
  );
};

export default withUserProtection(LessonsWordsPage);
