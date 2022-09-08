import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import withUserProtection from "../utilities/withUserProtection";
import Button from "./components/button/Button";
import PageLayout from "./components/layout/PageLayout";

const UserDashboard = () => {
  return (
    <PageLayout pageTitle={"Dashboard"}>
      <Row className="p-5 h-100">
        <Col className="h-100">
          <h4 className="mb-3">Dashboard</h4>
          <div className="card p-3">
            <div className="d-flex align-items-center justify-content-center ">
              <img
                src={"https://picsum.photos/200/300"}
                width="100"
                alt="user-profile"
                height="100"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-2 border p-1 border-3 border-success"
              />
              <div>
                <h5 className="d-inline">{"Rj Oliverio"}</h5>
                <span className="small d-block">
                  {"rjolvierio@example.com"}
                </span>
              </div>
            </div>
            <div className="text-center">
              <hr />
              <div className="w-100 d-flex align-items-center gap-1 justify-content-center">
                <span className="bg-secondary small w-100 p-1 px-4 rounded text-white">
                  Finished 2 lessons
                </span>
                <span className="bg-secondary small w-100 p-1 px-4 rounded text-white">
                  Learned 20 words
                </span>
              </div>
              <Button
                className="btn btn-outline-success btn-sm btn-block w-100 mt-2"
                label="View Profile"
                isValid={true}
              />
              <div className="buttons"></div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} className="h-100">
          <h5 className="mb-3">Activities</h5>
          <div
            className="shadow-sm border rounded border-secondary p-3"
            style={{
              overflowY: "auto",
              height: "calc(100vh - 300px)",
            }}
          >
            <div className="d-flex align-items-center w-100 border rounded p-3 my-2">
              <img
                src={"https://picsum.photos/200/300"}
                width="50"
                alt="user-profile"
                height="50"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-3 border border-3 border-success"
              />
              <div>
                <span className="d-block small">
                  You learned 20 of 20 words in Basic 500
                </span>
                <span className="small text-muted">1 day ago</span>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 border rounded p-3 my-2">
              <img
                src={"https://picsum.photos/200/300"}
                width="50"
                alt="user-profile"
                height="50"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-3 border border-3 border-success"
              />
              <div>
                <span className="d-block small">
                  You followed Anne Hathaway
                </span>
                <span className="small text-muted">1 day ago</span>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 border rounded p-3 my-2">
              <img
                src={"https://picsum.photos/200/300"}
                width="50"
                alt="user-profile"
                height="50"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-3 border border-3 border-success"
              />
              <div>
                <span className="d-block small">
                  You followed Natalie Portman
                </span>
                <span className="small text-muted">1 day ago</span>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 border rounded p-3 my-2">
              <img
                src={"https://picsum.photos/200/300"}
                width="50"
                alt="user-profile"
                height="50"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-3 border border-3 border-success"
              />
              <div>
                <span className="d-block small">
                  You learned 20 of 20 words in Basic 500
                </span>
                <span className="small text-muted">1 day ago</span>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 border rounded p-3 my-2">
              <img
                src={"https://picsum.photos/200/300"}
                width="50"
                alt="user-profile"
                height="50"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-3 border border-3 border-success"
              />
              <div>
                <span className="d-block small">
                  You learned 20 of 20 words in Basic 500
                </span>
                <span className="small text-muted">1 day ago</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default withUserProtection(UserDashboard);
