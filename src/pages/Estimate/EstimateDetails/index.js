import React, { Fragment, useEffect, useState } from "react";
import EstimatePDF from "src/common/EstimatePDF/EstimatePDF";
import Loading from "src/common/Loader";
import { getEstimateDetails } from "src/helpers/WorkOrder";
import { noop } from "src/helpers/format_helper";
import Error500 from "src/pages/PageNotFound/Error500";

const EstimateDetails = ({ id, setShowAcceptButton=noop, setShowDeclineButton=noop }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [initialData, setInitialData] = useState(null);
  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  const fetchDetails = async (id) => {
    setLoading(true);
    try {
      const response = await getEstimateDetails({ estimateId: id });
      setData(response);
      setInitialData(response);
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
        <EstimatePDF
          data={data}
          initialData={initialData}
          setShowAcceptButton={setShowAcceptButton}
          setShowDeclineButton={setShowDeclineButton}
          setData={setData}
        />
      )}
    </Fragment>
  );
};

export default EstimateDetails;
