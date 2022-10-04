import React, { useState } from "react";
import DataTable from "react-data-table-component";
import withUserProtection from "utilities/withUserProtection";
import Button from "./components/button/Button";
import { customStyles } from "./components/datatable/datatable";
import PageLayout from "./components/layout/PageLayout";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom";
import useAuth from "utilities/useAuth";
import { checkUserExistence } from "utilities/checkUserExistence";
import { useGetUsersListQuery } from "store/usersListSlice";
import DataLoading from "./components/loading/DataLoading";
import ErrorPage from "./components/error/ErrorPage";
import { useFollowUserMutation } from "store/followSlice";
import { toast } from "react-toastify";

const UserListPage = () => {
  const {
    data: users,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetUsersListQuery({}, { refetchOnMountOrArgChange: true });
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
        let isFollowed = checkUserExistence(users[i].followers, user.id);
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
        data={users.map(({ followers, ...others }) => others)}
        filterPlaceholder={"Filter users"}
        print={false}
        export={false}
      >
        <DataTable customStyles={customStyles} pagination />
      </DataTableExtensions>
    );
  }
  return (
    <PageLayout pageTitle={"Users List"}>
      <div className="d-flex mt-3 align-items-center">
        <h1 className="me-4">Users List</h1>
      </div>
      <hr />
      {output}
    </PageLayout>
  );
};

export default withUserProtection(UserListPage);
