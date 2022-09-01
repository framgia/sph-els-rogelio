import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useGetUserDashboardQuery } from "../store/dashboardSlice";
import withUserProtection from "../utilities/withUserProtection";
import Button from "./components/button/Button";
import ErrorPage from "./components/error/ErrorPage";
import PageLayout from "./components/layout/PageLayout";
import DataLoading from "./components/loading/DataLoading";

const UserDashboard = () => {
  const {
    data: userDashboard,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetUserDashboardQuery({}, { refetchOnMountOrArgChange: true });

  const countLearnedWords = (lessons) => {
    let count = 0;
    lessons.forEach((lesson) => {
      count += lesson.learned_words.length;
    });
    return count;
  };
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
                <span className="bg-secondary small w-100 p-1 px-4 rounded text-white">
                  Finished {userDashboard.finished_lessons.length} lessons
                </span>
                <span className="bg-secondary small w-100 p-1 px-4 rounded text-white">
                  Learned {countLearnedWords(userDashboard.finished_lessons)}{" "}
                  words
                </span>
              </div>
              <Button
                className="btn btn-outline-success btn-sm btn-block w-100 mt-2"
                label="View Profile"
                isValid={true}
              />
              <div className="buttons"></div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} className="h-100">
          <h5 className="mb-3">Activities</h5>
          <div
            className="shadow-sm border rounded border-secondary p-3"
            style={{
              overflowY: "auto",
              height: "calc(100vh - 300px)",
            }}
          >
            <div className="d-flex align-items-center w-100 border rounded p-3 my-2">
              <img
                src={"https://picsum.photos/200/300"}
                width="50"
                alt="user-profile"
                height="50"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-3 border border-3 border-success"
              />
              <div>
                <span className="d-block small">
                  You learned 20 of 20 words in Basic 500
                </span>
                <span className="small text-muted">1 day ago</span>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 border rounded p-3 my-2">
              <img
                src={"https://picsum.photos/200/300"}
                width="50"
                alt="user-profile"
                height="50"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-3 border border-3 border-success"
              />
              <div>
                <span className="d-block small">
                  You followed Anne Hathaway
                </span>
                <span className="small text-muted">1 day ago</span>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 border rounded p-3 my-2">
              <img
                src={"https://picsum.photos/200/300"}
                width="50"
                alt="user-profile"
                height="50"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-3 border border-3 border-success"
              />
              <div>
                <span className="d-block small">
                  You followed Natalie Portman
                </span>
                <span className="small text-muted">1 day ago</span>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 border rounded p-3 my-2">
              <img
                src={"https://picsum.photos/200/300"}
                width="50"
                alt="user-profile"
                height="50"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-3 border border-3 border-success"
              />
              <div>
                <span className="d-block small">
                  You learned 20 of 20 words in Basic 500
                </span>
                <span className="small text-muted">1 day ago</span>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 border rounded p-3 my-2">
              <img
                src={"https://picsum.photos/200/300"}
                width="50"
                alt="user-profile"
                height="50"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-3 border border-3 border-success"
              />
              <div>
                <span className="d-block small">
                  You learned 20 of 20 words in Basic 500
                </span>
                <span className="small text-muted">1 day ago</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
  return <PageLayout pageTitle={"Dashboard"}>{output}</PageLayout>;
};

export default withUserProtection(UserDashboard);
