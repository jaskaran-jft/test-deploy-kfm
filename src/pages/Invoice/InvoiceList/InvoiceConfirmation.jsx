import React, { Fragment, useState } from "react";
import Loading from "../../../common/Loader";
import { Row, Button } from "reactstrap";
import Notify from "src/common/Toaster/toast";
import { invoicePaid } from "src/helpers/WorkOrder";

const InvoiceConfirmation = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await invoicePaid({ invoiceId: props.id });
      setLoading(false);
      props.toggle();
      Notify(response.message, true);
    } catch (error) {
      setLoading(false);
      Notify(error, false);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Row>
            <h5>Are you sure you want to mark this trip as paid?</h5>
          </Row>

          <div className="d-flex flex-md-row justify-content-end">
            <Button
              color="primary"
              type="button"
              style={{ marginRight: 20 }}
              onClick={handleSubmit}
            >
              Yes
            </Button>
            <Button color="danger" type="button" onClick={props.toggle}>
              No
            </Button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default InvoiceConfirmation;
