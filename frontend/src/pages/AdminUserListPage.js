import React, { useState } from "react";
import withAdminProtection from "../utilities/withAdminProtection";
import PageLayout from "./components/layout/PageLayout";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import { customStyles } from "./components/datatable/datatable";
import useAuth from "../utilities/useAuth";
import { checkUserExistence } from "../utilities/checkUserExistence";
import Button from "./components/button/Button";
import { useNavigate } from "react-router-dom";
import { useGetAdminUsersListQuery } from "../store/usersListSlice";
import { toast } from "react-toastify";
import DataLoading from "./components/loading/DataLoading";
import ErrorPage from "./components/error/ErrorPage";
import { useFollowUserMutation } from "../store/followSlice";

const AdminUserListPage = () => {
  const {
    data: admins,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetAdminUsersListQuery({}, { refetchOnMountOrArgChange: true });
  const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
  const { user } = useAuth();
  const [followed, setFollowed] = useState(-1);
  const navigate = useNavigate();
  const handleFollow = async (userID) => {
    try {
      setFollowed(userID);
      await followUser({ id: userID }).unwrap();
      refetch();
    } catch (error) {
      if (error && error.status === 500) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    }
  };
  const columns = [
    {
      name: "Users",
      cell: (row) => (
        <div className="d-flex align-items-center">
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${row.avatar}`}
            width="40"
            alt="user-profile"
            height="40"
            style={{ objectFit: "cover" }}
            className="rounded-circle me-2 border border-3 border-success"
          />
          <span className="ms-3">{`${row.name} ${
            row.id === user.id ? "(You)" : ""
          }`}</span>
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row, i) => {
        let isFollowed = checkUserExistence(admins[i].followers, user.id);
        return (
          <div className="w-100 d-flex gap-1">
            <Button
              className="btn btn-success btn-sm"
              label="View Profile"
              handleClick={() => navigate(`/profile/${row.id}`)}
              isValid={true}
            />
            {row.id !== user.id && (
              <Button
                className={`btn btn-sm btn-${
                  isFollowed ? "outline-primary" : "primary"
                }`}
                label={`${isFollowed ? "Unfollow" : "Follow"}`}
                isLoading={row.id === followed ? isFollowing : false}
                handleClick={() => handleFollow(row.id)}
                isValid={true}
              />
            )}
          </div>
        );
      },
    },
  ];
  let output;
  if (isLoading) {
    output = <DataLoading />;
  }
  if (isError) {
    output = (
      <ErrorPage
        errorStatus={404}
        errorType={"Users not found"}
        errorMessage={"We cannot find the users you are looking for."}
      />
    );
  }
  if (isSuccess) {
    output = (
      <DataTableExtensions
        columns={columns}
        data={admins.map(({ followers, ...others }) => others)}
        filterPlaceholder={"Filter users"}
        print={false}
        export={false}
      >
        <DataTable customStyles={customStyles} pagination />
      </DataTableExtensions>
    );
  }
  return (
    <PageLayout pageTitle={"Admin Users List"}>
      <div className="d-flex mt-3 align-items-center">
        <h1 className="me-4">Admin Users List</h1>
      </div>
      <hr />
      {output}
    </PageLayout>
  );
};

export default withAdminProtection(AdminUserListPage);
