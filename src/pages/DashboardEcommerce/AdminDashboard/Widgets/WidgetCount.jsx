import { Fragment, useState, useEffect } from "react";
import CountUp from "react-countup";
import Loading from "src/common/Loader";

const WidgetCount = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await item.api();
      let updatedData = item;
      if (updatedData.main) {
        updatedData.data =
          Number(response[updatedData.main][updatedData.name]).toFixed(2) ||
          0.0;
      } else {
        updatedData.data = response[updatedData.name] || 0;
      }

      setData(updatedData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <CountUp
          start={0}
          prefix={item.prefix}
          suffix={item.suffix}
          separator={item.separator}
          end={item?.data || 0}
          decimals={item.decimals}
          duration={4}
        />
      )}
    </Fragment>
  );
};

export default WidgetCount;
