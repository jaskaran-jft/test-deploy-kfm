import React, { Fragment, useEffect, useState } from "react";
import Loading from "src/common/Loader";
import { getInvoiceDetails, updateInvoiceDetails } from "src/helpers/WorkOrder";
import Error500 from "src/pages/PageNotFound/Error500";
import { noop } from "src/helpers/format_helper";
import EstimateRevise from "src/pages/Estimate/EstimateList/EstimateRevise";

const InvoiceReviseDetails = ({ id, setShowEstimate, toggle }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  const fetchDetails = async (id) => {
    setLoading(true);
    try {
      const response = await getInvoiceDetails({ invoiceId: id });
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
          showIncurred
          invoice={true}
          api={updateInvoiceDetails}
          setShowEstimate={setShowEstimate}
        />
      )}
    </Fragment>
  );
};

export default InvoiceReviseDetails;
