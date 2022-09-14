import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "./components/button/Button";
import PageLayout from "./components/layout/PageLayout";

const UserProfilePage = () => {
  return (
    <PageLayout pageTitle={"User Profile"}>
      <Row className="p-5 h-100">
        <Col className="h-100">
          <div className="card p-3">
            <div className="text-center">
              <img
                src={"https://picsum.photos/200/300"}
                width="150"
                alt="user-profile"
                height="150"
                style={{ objectFit: "cover" }}
                className="rounded-circle me-2 border p-1 border-3 border-success"
              />
              <div className="mt-3">
                <h5 className="d-inline">Rj Oliverio</h5>
                <span className="small d-block">rjoliverio@example.com</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-1 px-5 mt-3">
              <div className="text-center">
                <span className="fw-bold">120</span>
                <h5>
                  <span className="badge rounded-pill bg-primary">
                    Followers
                  </span>
                </h5>
              </div>
              <div className="ms-auto text-center">
                <span className="fw-bold">10</span>
                <h5>
                  <span className="badge rounded-pill bg-primary">
                    Following
                  </span>
                </h5>
              </div>
            </div>
            <div className="text-center">
              <hr />
              <div className="w-100 d-flex align-items-center gap-1 justify-content-center">
                <span className="bg-secondary small w-100 p-1 px-4 rounded text-white">
                  Finished 1 lessons
                </span>
                <span className="bg-secondary small w-100 p-1 px-4 rounded text-white">
                  Learned 3 words
                </span>
              </div>
              <Button
                className="btn btn-success btn-sm btn-block w-100 mt-2"
                label="Follow"
                isValid={true}
              />
              <div className="buttons"></div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} className="h-100">
          <div
            className="shadow-sm border rounded border-secondary p-3"
            style={{
              overflowY: "auto",
              height: "calc(100vh - 250px)",
            }}
          >
            <h5 className="mb-3">Your Activities</h5>
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

export default UserProfilePage;
