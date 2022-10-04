import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useGetUserQuery } from "store/userSlice";
import useAuth from "../utilities/useAuth";
import ErrorPage from "./components/error/ErrorPage";
import PageLayout from "./components/layout/PageLayout";
import DataLoading from "./components/loading/DataLoading";
import AvatarSection from "./components/settings/AvatarSection";
import GeneralInfoSection from "./components/settings/GeneralInfoSection";
import PasswordSection from "./components/settings/PasswordSection";

const UserProfileSettingsPage = () => {
  const { revalidate } = useAuth();
  const {
    data: profile,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetUserQuery({}, { refetchOnMountOrArgChange: true });
  let output;
  if (isLoading || isFetching) {
    output = <DataLoading />;
  }
  if (isError) {
    output = (
      <ErrorPage
        errorStatus={404}
        errorType={"User not found"}
        errorMessage={"We cannot find the user you are looking for."}
      />
    );
  }
  if (isSuccess && !isFetching) {
    output = (
      <Row className="p-5 h-100">
        <Col className="h-100">
          <div className="card p-3">
            <AvatarSection
              avatar={profile.data.avatar}
              revalidate={revalidate}
            />
          </div>
        </Col>
        <Col className="h-100">
          <div className="card p-3 mb-3">
            <GeneralInfoSection
              name={profile.data.name}
              email={profile.data.email}
              revalidate={revalidate}
            />
          </div>

          <div className="card p-3">
            <PasswordSection />
          </div>
        </Col>
      </Row>
    );
  }
  return <PageLayout pageTitle={"User Profile Settings"}>{output}</PageLayout>;
};

export default UserProfileSettingsPage;
