import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useChangeAvatarMutation } from "../../../store/userSlice";
import { avatarValidationSchema } from "../../../utilities/validation";
import Button from "../button/Button";

const AvatarSection = ({ avatar, revalidate }) => {
  const [preview, setPreview] = useState(false);
  const [image, setImage] = useState(null);
  const [changeAvatar, { isLoading }] = useChangeAvatarMutation();
  const handleFormSubmit = async () => {
    try {
      let fd = new FormData();
      fd.append("image", image);
      const res = await changeAvatar({ data: fd }).unwrap();
      toast.success(res.message);
      revalidate();
    } catch (error) {
      if (error && error.status === 500) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    }
  };
  const { handleSubmit, setValues, values, errors, isValid, touched } =
    useFormik({
      initialValues: { avatar: "" },
      enableReinitialize: true,
      validationSchema: avatarValidationSchema,
      onSubmit: handleFormSubmit,
    });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setValues({ avatar: URL.createObjectURL(e.target.files[0]) });
      setPreview(true);
    } else {
      setImage(null);
      setValues({ avatar: "" });
      setPreview(false);
    }
  };
  return (
    <div>
      <h5 className="mb-3">{`Profile Photo ${
        preview ? "(Previewing)" : ""
      }`}</h5>
      <div className="text-center">
        <img
          src={`${
            !preview
              ? `${process.env.REACT_APP_IMAGES_URL}/${avatar}`
              : values.avatar
          }`}
          width="150"
          alt="user-profile"
          height="150"
          style={{ objectFit: "cover" }}
          className="rounded-circle me-2 border p-1 border-3 border-success"
        />
        <div className="mt-3 d-flex align-items-center gap-2">
          <div className="input-group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`form-control ${
                errors.avatar && touched.avatar ? "border-danger" : ""
              }`}
              id="inputGroupFile01"
            />
          </div>
          <div className="ms-auto">
            <Button
              label={"Upload"}
              className={"btn btn-primary"}
              isValid={isValid}
              isLoading={isLoading}
              handleClick={handleSubmit}
            />
          </div>
        </div>
        {errors.avatar && touched.avatar && (
          <span className="error small text-danger">{errors.avatar}</span>
        )}
      </div>
    </div>
  );
};

export default AvatarSection;
