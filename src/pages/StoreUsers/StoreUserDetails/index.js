import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row } from "reactstrap";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import Error500 from "src/pages/PageNotFound/Error500";
import { getStoreUserDetails } from "src/helpers/StoreMethod/store";
import Details from "./Details";
import BreadCrumb from "src/Components/Common/BreadCrumb";

export default function StoreUserDetails() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useLayoutEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await getStoreUserDetails({ id });
      setData(response[0] || {});
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
        <BreadCrumb title="User Details" pageTitle="Site" />
        {loading ? (
          <Loading />
        ) : error ? (
          <Error500 />
        ) : (
          <Container fluid={true}>
            <Details details={data} update={fetchUserDetails} />
          </Container>
        )}
      </div>
    </React.Fragment>
  );
}
