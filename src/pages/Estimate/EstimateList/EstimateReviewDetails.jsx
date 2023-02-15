import React, { Fragment, useEffect, useState } from "react";
import Loading from "src/common/Loader";
import {
  getEstimateDetails,
  updateEstimateDetails,
} from "src/helpers/WorkOrder";
import Error500 from "src/pages/PageNotFound/Error500";
import EstimateRevise from "./EstimateRevise";
import { noop } from "src/helpers/format_helper";

const EstimateReviseDetails = ({ id, setShowEstimate, toggle }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  const fetchDetails = async (id) => {
    setLoading(true);
    try {
      const response = await getEstimateDetails({ estimateId: id });
      setData(response);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error500 />
      ) : (
        <EstimateRevise
          data={data}
          update={noop}
          api={updateEstimateDetails}
          setShowEstimate={setShowEstimate}
        />
      )}
    </Fragment>
  );
};

export default EstimateReviseDetails;
