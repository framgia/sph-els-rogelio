import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useGetUserDashboardQuery } from "../store/dashboardSlice";
import { combineUsersActivities } from "../utilities/combineUserActivities";
import { countLearnedWords } from "../utilities/countLearnedWords";
import useAuth from "../utilities/useAuth";
import withUserProtection from "../utilities/withUserProtection";
import FollowActivity from "./components/activity/FollowActivity";
import LessonActivity from "./components/activity/LessonActivity";
import ErrorPage from "./components/error/ErrorPage";
import PageLayout from "./components/layout/PageLayout";
import DataLoading from "./components/loading/DataLoading";

const UserDashboard = () => {
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
    let combinedActivities = combineUsersActivities(
      userDashboard.activities,
      userDashboard.followings
    );
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
              <Link
                replace
                to={`/profile/${user.id}`}
                className="btn btn-outline-success btn-sm btn-block w-100 mt-2"
              >
                View Profile
              </Link>
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
            {combinedActivities?.length ? (
              combinedActivities.map((activity) => {
                return (
                  <div key={activity.id}>
                    {activity.type === "follow" ? (
                      <FollowActivity
                        follower={activity.activitable.follower}
                        following={activity.activitable.following}
                        created_at={activity.created_at}
                        user_id={user.id}
                        user_avatar={user.avatar}
                      />
                    ) : (
                      <LessonActivity
                        lesson={activity.activitable}
                        learned_words={activity.activitable.learned_words}
                        user={activity.activitable.user}
                        created_at={activity.created_at}
                        user_id={user.id}
                        user_avatar={user.avatar}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center">No activities found.</div>
            )}
          </div>
        </Col>
      </Row>
    );
  }
  return <PageLayout pageTitle={"Dashboard"}>{output}</PageLayout>;
};

export default withUserProtection(UserDashboard);
