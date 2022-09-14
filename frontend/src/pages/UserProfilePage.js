import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../store/profileSlice";
import { countLearnedWords } from "../utilities/countLearnedWords";
import useAuth from "../utilities/useAuth";
import Button from "./components/button/Button";
import ErrorPage from "./components/error/ErrorPage";
import PageLayout from "./components/layout/PageLayout";
import DataLoading from "./components/loading/DataLoading";

const UserProfilePage = () => {
  const { userID } = useParams();
  const { user } = useAuth();
  const {
    data: profile,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetUserProfileQuery(
    { id: userID },
    { refetchOnMountOrArgChange: true }
  );
  let output;
  if (isLoading || isFetching) {
    output = <DataLoading />;
  }
  if (isError) {
    output = (
      <ErrorPage
        errorStatus={404}
        errorType={"User not found"}
        errorMessage={"We cannot find the user you are looking for."}
      />
    );
  }
  if (isSuccess && !isFetching) {
    output = (
      <Row className="p-5 h-100">
        <Col className="h-100">
          <div className="card p-3">
            <div className="text-center">
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/${profile.avatar}`}
                width="150"
                alt="user-profile"
                height="150"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-2 border p-1 border-3 border-success"
              />
              <div className="mt-3">
                <h5 className="d-inline">{profile.name}</h5>
                <span className="small d-block">{profile.email}</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-1 px-5 mt-3">
              <div className="text-center">
                <span className="fw-bold">{profile.followers.length}</span>
                <h5>
                  <span className="badge rounded-pill bg-primary">
                    Followers
                  </span>
                </h5>
              </div>
              <div className="ms-auto text-center">
                <span className="fw-bold">{profile.followings.length}</span>
                <h5>
                  <span className="badge rounded-pill bg-primary">
                    Following
                  </span>
                </h5>
              </div>
            </div>
            <div className="text-center">
              <hr />
              <div className="w-100 d-flex align-items-center gap-1 justify-content-center">
                <span className="bg-secondary small w-100 p-1 px-4 rounded text-white">
                  Finished {profile.finished_lessons.length} lessons
                </span>
                <span className="bg-secondary small w-100 p-1 px-4 rounded text-white">
                  Learned {countLearnedWords(profile.finished_lessons)} words
                </span>
              </div>
              {profile.id !== user.id && (
                <Button
                  className="btn btn-success btn-sm btn-block w-100 mt-2"
                  label="Follow"
                  isValid={true}
                />
              )}
              <div className="buttons"></div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} className="h-100">
          <div
            className="shadow-sm border rounded border-secondary p-3"
            style={{
              overflowY: "auto",
              height: "calc(100vh - 250px)",
            }}
          >
            <h5 className="mb-3">Activities</h5>
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
  return <PageLayout pageTitle={"User Profile"}>{output}</PageLayout>;
};

export default UserProfilePage;
