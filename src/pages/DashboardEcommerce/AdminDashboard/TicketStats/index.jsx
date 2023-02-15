import { useState, useEffect, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { Card } from "reactstrap";
import Loading from "src/common/Loader";
import { getCount } from "src/helpers/Dashboard";
import { categories } from "../TicketStatus/data";
import HorizontalGraph from "src/Components/Common/HorizontalGraph";

const TicketStats = (props) => {
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
              {props.t("Tickets Statistics")}
            </h4>
          </div>
          <div className="card-body p-0">
            <div>
              <HorizontalGraph
                categories={categories}
                data={data}
                dataColors='["--vz-primary", "--vz-gray-300"]'
              />
            </div>
          </div>
        </Fragment>
      )}
    </Card>
  );
};

export default withTranslation()(TicketStats);
