import React from "react";
import withAdminProtection from "../utilities/withAdminProtection";
import PageLayout from "./components/layout/PageLayout";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import { dummyUsersList } from "../utilities/dummyData";
import { customStyles } from "./components/datatable/datatable";
import useAuth from "../utilities/useAuth";
import { checkUserExistence } from "../utilities/checkUserExistence";
import Button from "./components/button/Button";
import { useNavigate } from "react-router-dom";

const AdminUserListPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const columns = [
    {
      name: "Users",
      cell: (row) => (
        <div className="d-flex align-items-center">
          <img
            src={`${row.avatar}`}
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
    <PageLayout pageTitle={"Admin Users List"}>
      <div className="d-flex mt-3 align-items-center">
        <h1 className="me-4">Admin Users List</h1>
      </div>
      <hr />
      <DataTableExtensions
        columns={columns}
        data={dummyUsersList}
        filterPlaceholder={"Filter users"}
        print={false}
        export={false}
      >
        <DataTable customStyles={customStyles} pagination />
      </DataTableExtensions>
    </PageLayout>
  );
};

export default withAdminProtection(AdminUserListPage);
