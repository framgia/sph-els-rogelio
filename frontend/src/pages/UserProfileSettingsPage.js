import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PageLayout from "./components/layout/PageLayout";
import GeneralInfoSection from "./components/settings/GeneralInfoSection";

const UserProfileSettingsPage = () => {
  let output;
  output = (
    <Row className="p-5 h-100">
      <Col className="h-100">
        <div className="card p-3">
          <h5 className="mb-3">Profile Photo</h5>
        </div>
      </Col>
      <Col className="h-100">
        <div className="card p-3 mb-3">
          <GeneralInfoSection />
        </div>

        <div className="card p-3">
          <h5 className="mb-3">Change password</h5>
        </div>
      </Col>
    </Row>
  );
  return <PageLayout pageTitle={"User Profile Settings"}>{output}</PageLayout>;
};

export default UserProfileSettingsPage;
