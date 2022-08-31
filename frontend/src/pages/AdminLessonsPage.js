import React from "react";
import withAdminProtection from "../utilities/withAdminProtection";
import PageLayout from "./components/layout/PageLayout";

const AdminLessonsPage = () => {
  return (
    <PageLayout pageTitle={"Admin Dashboard"}>
      <div>Admin</div>
    </PageLayout>
  );
};

export default withAdminProtection(AdminLessonsPage);
