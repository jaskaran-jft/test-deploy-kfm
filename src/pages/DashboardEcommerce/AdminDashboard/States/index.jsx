import { Fragment, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import Vector from "./VectorMap";
import { withTranslation } from "react-i18next";
import { getStateCount } from "src/helpers/Dashboard";
import Loading from "src/common/Loader";
import { Link } from "react-router-dom";

const States = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await getStateCount();
      const newData = Object.entries(response).sort((a, b) => b[1] - a[1]);
      setData(newData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleColors = (value) => {
    switch (value) {
      case 0:
        return "primary";
      case 1:
        return "success";
      case 2:
        return "info";
      default:
        return "primary";
    }
  };

  return (
    <Fragment>
      <Col xl={6} md={6}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">
              {props.t("Active Ticket States")}
            </h4>
          </CardHeader>

          <CardBody>
            {loading ? (
              <Loading />
            ) : (
              <Fragment>
                <div
                  data-colors='["--vz-light", "--vz-secondary", "--vz-primary"]'
                  style={{ height:data.length ?  "269px" : 0}}
                  dir="ltr"
                >
                  {data.length ? (
                    <Vector
                      data-colors='["--vz-light", "--vz-secondary", "--vz-primary"]'
                      value="world_mill"
                    />
                  ) : (
                    <div className="text-center custom-data">
                      {" "}
                      <h5>{props.t("No Data Found")}</h5>
                    </div>
                  )}
                </div>

                <div className="px-2 py-2 mt-1">
                  {data.map((item, index) => {
                    if (index <= 3) {
                      return (
                        <Fragment key={index}>
                          <Link to={`/workOrderList/${item[0]}`}>
                            <p
                              className={`${
                                index !== 0 ? "mt-3" : ""
                              } mb-1 custom-pointer`}
                            >
                              {item[0]}{" "}
                              <span className="float-end">{item[1]}</span>
                            </p>
                          </Link>
                          <div
                            className="progress mt-2"
                            style={{ height: "6px" }}
                          >
                            <div
                              className={`progress-bar progress-bar-striped bg-${handleColors(
                                index,
                              )}`}
                              role="progressbar"
                              style={{ width: `${item[1]}%` }}
                              aria-valuenow={item[1]}
                              aria-valuemin="0"
                              aria-valuemax={item[1]}
                            ></div>
                          </div>
                        </Fragment>
                      );
                    }
                    return null;
                  })}
                </div>
              </Fragment>
            )}
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default withTranslation()(States);
