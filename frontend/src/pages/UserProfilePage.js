import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFollowUserMutation } from "../store/followSlice";
import { useGetUserProfileQuery } from "../store/profileSlice";
import { checkUserExistence } from "../utilities/checkUserExistence";
import { combineUsersActivities } from "../utilities/combineUserActivities";
import { countLearnedWords } from "../utilities/countLearnedWords";
import useAuth from "../utilities/useAuth";
import FollowActivity from "./components/activity/FollowActivity";
import LessonActivity from "./components/activity/LessonActivity";
import Button from "./components/button/Button";
import ErrorPage from "./components/error/ErrorPage";
import PageLayout from "./components/layout/PageLayout";
import DataLoading from "./components/loading/DataLoading";
import ListModal from "./components/modals/ListModal";

const UserProfilePage = () => {
  const { userID } = useParams();
  const { user } = useAuth();
  const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
  const [show, setShow] = useState(false);
  const [type, setType] = useState("Followers");
  const {
    data: profile,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    refetch,
  } = useGetUserProfileQuery(
    { id: userID },
    { refetchOnMountOrArgChange: true }
  );
  const handleFollow = async () => {
    try {
      await followUser({ id: userID }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
      if (error && error.status === 500) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    }
  };
  const handleListModal = async (type) => {
    setType(type);
    setShow(true);
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
        errorMessage={"We cannot find the user you are looking for."}
      />
    );
  }
  if (isSuccess && !isFetching) {
    let isFollowed = checkUserExistence(profile.followers, user.id);
    let combinedActivities = combineUsersActivities(profile.activities);
    output = (
      <>
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
                    <span
                      role={"button"}
                      onClick={() => handleListModal("Followers")}
                      className="badge rounded-pill bg-primary"
                    >
                      Followers
                    </span>
                  </h5>
                </div>
                <div className="ms-auto text-center">
                  <span className="fw-bold">{profile.followings.length}</span>
                  <h5>
                    <span
                      role={"button"}
                      onClick={() => handleListModal("Following")}
                      className="badge rounded-pill bg-primary"
                    >
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
                    className={`btn btn-${
                      isFollowed ? "outline-primary" : "primary"
                    } btn-sm btn-block w-100 mt-2`}
                    label={`${isFollowed ? "Unfollow" : "Follow"}`}
                    isValid={true}
                    isLoading={isFollowing}
                    handleClick={handleFollow}
                  />
                )}
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
        <ListModal
          show={show}
          setShow={setShow}
          headerTitle={type}
          users={type === "Followers" ? profile.followers : profile.followings}
          user_id={user.id}
        />
      </>
    );
  }
  return <PageLayout pageTitle={"User Profile"}>{output}</PageLayout>;
};

export default UserProfilePage;
