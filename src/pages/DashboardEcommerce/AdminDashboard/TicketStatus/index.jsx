import { useState, useEffect, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { Card } from "reactstrap";
import Donut from "src/Components/Common/DonutGraph";
import Loading from "src/common/Loader";
import { getCount } from "src/helpers/Dashboard";
import { categories } from "./data";

const TicketStatus = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await getCount();
      const barData = [];
      categories.forEach((category) => barData.push(response[category] || 0));
      setData(barData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <Card className="card-height-100">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">
              {props.t("Active Tickets")}
            </h4>
          </div>
          <div className="card-body p-0">
            <div>
              {data.length ? (
                <Donut
                  categories={categories}
                  data={data}
                  dataColors='["--vz-primary", "--vz-success-rgb, 0.85", "--vz-info-rgb, 0.70", "--vz-warning-rgb, 0.60", "--vz-danger-rgb, 0.45", "--vz-secondary-rgb, 0.25"]'
                />
              ) : (
                <div className="text-center custom-data">
                  {" "}
                  <h5>{props.t("No Data Found")}</h5>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Card>
  );
};

export default withTranslation()(TicketStatus);
