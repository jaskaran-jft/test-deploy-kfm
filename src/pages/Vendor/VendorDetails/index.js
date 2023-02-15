import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { getVendorDetails } from "src/helpers/Vendors";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import Error500 from "src/pages/PageNotFound/Error500";
import Details from "./Details";
import BreadCrumb from "src/Components/Common/BreadCrumb";

export default function VendorDetails() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useLayoutEffect(() => {
    fetchVendorDetails();
  }, [id]);

  const fetchVendorDetails = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await getVendorDetails({ id });
      setData(response || {});
      setLoading(false);
    } catch (error) {
      Notify(error || "Something went wrong", false);
      setLoading(false);

      setError(true);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <BreadCrumb title="Details" pageTitle="Vendor" />
        {loading ? (
          <Loading />
        ) : error ? (
          <Error500 />
        ) : (
          <Container fluid={true}>
            <Details details={data} update={fetchVendorDetails} />
          </Container>
        )}
      </div>
    </React.Fragment>
  );
}
