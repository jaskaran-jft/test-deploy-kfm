import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";

const Section = () => {
  const [title, setTitle] = useState("");
  const { userData = {} } = useSelector((state) => state.Login);

  useEffect(() => {
    var d = new Date();
    var time = d.getHours();
    if (time < 12) {
      setTitle(`Good Morning ${userData?.firstName || ""}!`);
    } else if (time > 17) {
      setTitle(`Good Evening ${userData?.firstName || ""}!`);
    } else if (time > 12) {
      setTitle(`Good Afternoon ${userData?.firstName || ""}!`);
    }
  }, [userData?.firstName]);

  return (
    <React.Fragment>
      <Row className="mb-3 pb-1">
        <Col xs={12}>
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <h4 className="fs-16 mb-1">{title}</h4>
              <p className="text-muted mb-0">
                Here's what's happening with your Site today.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section;
