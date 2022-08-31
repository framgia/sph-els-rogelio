import React from "react";
import withUserProtection from "../utilities/withUserProtection";
import PageLayout from "./components/layout/PageLayout";

const UserDashboard = () => {
  return (
    <PageLayout pageTitle={"Dashboard"}>
      <div>Regular User</div>
    </PageLayout>
  );
};

export default withUserProtection(UserDashboard);
