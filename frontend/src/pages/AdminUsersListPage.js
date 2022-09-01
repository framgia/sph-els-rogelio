import React from "react";
import DataTable from "react-data-table-component";
import withAdminProtection from "../utilities/withAdminProtection";
import { customStyles } from "./components/datatable/datatable";
import PageLayout from "./components/layout/PageLayout";
import moment from "moment";

const AdminUsersListPage = () => {
  const columns = [
    {
      name: "Name",
      cell: (row) => (
        <div className="w-100 d-flex align-items-center gap-1">
          <img
            src={row.image}
            width="45"
            alt="user-profile"
            height="45"
            style={{ objectFit: "cover" }}
            className="rounded-circle border me-2 p-1 border-3 border-success"
          />
          <span className="fw-bold">{row.name}</span>
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
    },
    {
      name: "Date Added",
      selector: (row) => moment(row.created_at).format("MMMM DD, YYYY"),
      wrap: true,
    },
  ];
  const admins = [
    {
      id: 1,
      name: "Rj Oliverio",
      email: "rjoliverio@example.com",
      image: "https://picsum.photos/200/300",
      created_at: "2022-08-25 03:33:59",
    },
  ];
  return (
    <PageLayout pageTitle={"Admin Users List"}>
      <div className="d-flex my-3 align-items-center">
        <h1 className="mx-4">Admin Users List</h1>
      </div>
      <DataTable
        columns={columns}
        data={admins}
        customStyles={customStyles}
        pagination
      />
    </PageLayout>
  );
};

export default withAdminProtection(AdminUsersListPage);
