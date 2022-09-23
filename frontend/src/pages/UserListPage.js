import React from "react";
import DataTable from "react-data-table-component";
import { dummyUsersList } from "../utilities/dummyData";
import withUserProtection from "../utilities/withUserProtection";
import Button from "./components/button/Button";
import { customStyles } from "./components/datatable/datatable";
import PageLayout from "./components/layout/PageLayout";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../utilities/useAuth";
import { checkUserExistence } from "../utilities/checkUserExistence";

const UserListPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const columns = [
    {
      name: "Users",
      cell: (row) => (
        <div className="d-flex align-items-center">
          <img
            src={row.avatar}
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
      cell: (row) => {
        let isFollowed = checkUserExistence(row.followers, user.id);
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
                isValid={true}
              />
            )}
          </div>
        );
      },
    },
  ];
  return (
    <PageLayout pageTitle={"Users List"}>
      <div className="d-flex mt-3 align-items-center">
        <h1 className="me-4">Users List</h1>
      </div>
      <hr />
      <DataTableExtensions
        columns={columns}
        data={dummyUsersList}
        print={false}
        export={false}
      >
        <DataTable customStyles={customStyles} pagination />
      </DataTableExtensions>
    </PageLayout>
  );
};

export default withUserProtection(UserListPage);
