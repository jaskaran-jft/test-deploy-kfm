import { Fragment, useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import Widgets from "../../AdminDashboard/Widgets";

const ClientWidget = ({ clientWidgetData, api }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await api();
      const updatedData = clientWidgetData.map((item) => {
        if (item.main) {
          item.data = Number(response[item.main][item.name]).toFixed(2) || 0.0;
        } else {
          item.data = response[item.name] || 0;
        }

        return item;
      });

      setData(updatedData);
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [clientWidgetData]);

  return (
    <Fragment>
      {loading ? null : <Widgets client={true} widgetsData={data} />}
    </Fragment>
  );
};

export default withTranslation()(ClientWidget);
