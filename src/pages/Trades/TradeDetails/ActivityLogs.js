import React from "react";
import { Col, Row } from "reactstrap";

const ActivityLogs = () => {
  const data = [];
  return (
    <div className="mt-3">
      <Col className="mb-3">Activity Logs</Col>
      {data.length === 0 && <p>No activity found.</p>}
      <Row
        className="bg-light"
        style={{
          maxHeight: "30em",
          overflowY: "scroll",
        }}
      >
        {data.length > 0 &&
          data.map((log, index) => {
            return (
              <Row className="p-1" key={index}>
                <Col className="col-md-2">Edit</Col>
                <Col className="col-md-6 text-xs">{log.description}</Col>
                <Col className="col-md-4 text-end">
                  {new Date(log.createdAt).toDateString()}
                </Col>
                <hr></hr>
              </Row>
            );
          })}
      </Row>
    </div>
  );
};

export default ActivityLogs;
