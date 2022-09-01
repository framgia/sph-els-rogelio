import React from "react";
import DataTable from "react-data-table-component";
import withAdminProtection from "../utilities/withAdminProtection";
import { customStyles } from "./components/datatable/datatable";
import PageLayout from "./components/layout/PageLayout";
import moment from "moment";
import { useGetAdminsQuery } from "../store/adminsSlice";
import DataLoading from "./components/loading/DataLoading";
import ErrorPage from "./components/error/ErrorPage";
import useAuth from "../utilities/useAuth";

const AdminUsersListPage = () => {
  const { user } = useAuth();
  const { data: admins, isLoading, isError, isSuccess } = useGetAdminsQuery();
  const columns = [
    {
      name: "Name",
      cell: (row) => (
        <div className="w-100 d-flex align-items-center gap-1">
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${row.avatar}`}
            width="45"
            alt="user-profile"
            height="45"
            style={{ objectFit: "cover" }}
            className="rounded-circle border me-2 p-1 border-3 border-success"
          />
          <span className="fw-bold">{`${row.name} ${
            user && user.id === row.id ? "(You)" : ""
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
      name: "Date Added",
      selector: (row) => moment(row.created_at).format("MMMM DD, YYYY"),
      wrap: true,
    },
  ];
  let output;
  if (isLoading) {
    output = <DataLoading />;
  }
  if (isError) {
    output = (
      <ErrorPage
        errorStatus={401}
        errorType={"Unauthorized Access"}
        errorMessage={"You are not authorized to access this page."}
      />
    );
  }
  if (isSuccess) {
    output = (
      <DataTable
        columns={columns}
        data={admins}
        customStyles={customStyles}
        pagination
      />
    );
  }
  return (
    <PageLayout pageTitle={"Admin Users List"}>
      <div className="d-flex my-3 align-items-center">
        <h1 className="mx-4">Admin Users List</h1>
      </div>
      {output}
    </PageLayout>
  );
};

export default withAdminProtection(AdminUsersListPage);
