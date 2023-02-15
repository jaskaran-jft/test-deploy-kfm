import React, { Fragment, useEffect, useState } from "react";
import EstimatePDF from "src/common/EstimatePDF/EstimatePDF";
import Loading from "src/common/Loader";
import { getInvoiceDetails } from "src/helpers/WorkOrder";
import Error500 from "src/pages/PageNotFound/Error500";

const InvoiceDetails = ({ id, setShowAcceptButton, setShowDeclineButton }) => {
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
      const response = await getInvoiceDetails({ invoiceId: id });
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
          invoice={true}
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

export default InvoiceDetails;
