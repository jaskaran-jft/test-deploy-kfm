import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

const Widgets = ({ widgetsData, client = false }) => {
  return (
    <Fragment>
      {widgetsData.map((item, key) => (
        <Col
          xl={client ? 2 : 3}
          md={client ? 2 : 3}
          style={client ? { width: "20%" } : {}}
          key={key}
        >
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    {item.label}
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value" data-target="559.25">
                      <item.component item={item} />
                    </span>
                  </h4>
                  <Link to={item.route} className="text-decoration-underline">
                    {item.link}
                  </Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span
                    className={
                      "avatar-title rounded fs-3 bg-soft-" + item.bgcolor
                    }
                  >
                    <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Fragment>
  );
};

export default Widgets;
