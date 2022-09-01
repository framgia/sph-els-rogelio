import React from "react";
import moment from "moment";
import { countLearnedWords } from "../../../utilities/countLearnedWords";

const LessonActivity = ({
  lesson,
  learned_words,
  user,
  user_id,
  created_at,
}) => {
  return (
    <div className="d-flex align-items-center w-100 border rounded p-3 my-2 bg-success">
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
          {user.id === user_id ? "You" : user.name} learned{" "}
          {countLearnedWords(lesson)} of {learned_words.length} words in{" "}
          {lesson.title}
        </span>
        <span className="small text-white">{moment(created_at).fromNow()}</span>
      </div>
    </div>
  );
};

export default LessonActivity;
