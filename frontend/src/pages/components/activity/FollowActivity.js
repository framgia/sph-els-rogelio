import React from "react";
import moment from "moment";

const FollowActivity = ({ follower, following, created_at, user_id }) => {
  return (
    <div className="d-flex align-items-center w-100 border rounded p-3 my-2 bg-primary">
      <img
        src={"https://picsum.photos/200/300"}
        width="50"
        alt="user-profile"
        height="50"
        style={{ objectFit: "cover" }}
        className="rounded-circle me-3 border border-3 border-white"
      />
      <div>
        <span className="d-block small text-white">
          {follower.id === user_id ? "You" : follower.name} followed{" "}
          {following.id === user_id ? "You" : following.name}
        </span>
        <span className="small text-white">{moment(created_at).fromNow()}</span>
      </div>
    </div>
  );
};

export default FollowActivity;
