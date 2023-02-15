import React, { Fragment } from "react";
import { Col, Row, Table } from "reactstrap";

const AddEstimateDetails = (props) => {
  const { details, selectedVendor = {} } = props;
  const { store = {} } = details;
  return (
    <Fragment>
      <div style={{ margin: " 10px 0px 10px 0px" }}>
        <h4>Ticket #{details?.trackingId || details?.ticket?.trackingId} </h4>
        <hr></hr>
      </div>
      <Row className="mb-3">
        <Col>
          <h4 className="card-title mb-2">Site Info</h4>
          <div className="table-responsive">
            <Table className="table-borderless mb-0">
              <tbody>
                <tr>
                  <th className="ps-0" scope="row">
                    Name :
                  </th>
                  <td className="text-muted">
                    {store.storeName ? (
                      store.storeName
                    ) : (
                      <i className="text-danger">Empty</i>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="ps-0" scope="row">
                    Address :
                  </th>
                  <td className="text-muted">
                    {" "}
                    {store.address ? (
                      <>
                        {(store.address?.streetAddress1 || "") +
                          " " +
                          (store.address?.place || "") +
                          " " +
                          (store.address?.state || "") +
                          ", " +
                          (store.address?.zipCode || "")}
                      </>
                    ) : (
                      <i className="text-danger">Empty</i>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="ps-0" scope="row">
                    Phone :
                  </th>
                  <td className="text-muted">
                    {store?.contact?.primaryContactPhone ? (
                      store?.contact?.primaryContactPhone
                    ) : (
                      <i className="text-danger">Empty</i>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
        <Col className="col-md-6">
          <h4 className="card-title mb-2">Vendor Info</h4>
          <div className="table-responsive">
            <Table className="table-borderless mb-0">
              <tbody>
                <tr>
                  <th className="ps-0" scope="row">
                    Name :
                  </th>
                  <td className="text-muted">
                    {selectedVendor?.businessName || (
                      <i className="text-danger">Empty</i>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="ps-0" scope="row">
                    Address :
                  </th>
                  <td className="text-muted">
                    {selectedVendor?.address ? (
                      <>
                        {(selectedVendor?.address[0]?.streetAddress1 || "") +
                          " " +
                          (selectedVendor?.address[0]?.place || "") +
                          " " +
                          (selectedVendor?.address[0]?.state || "") +
                          ", " +
                          (selectedVendor?.address[0]?.zipCode || "")}
                      </>
                    ) : (
                      <i className="text-danger">Empty</i>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="ps-0" scope="row">
                    Phone :
                  </th>
                  <td className="text-muted">
                    {" "}
                    {selectedVendor?.businessPhone ? (
                      <>{selectedVendor.businessPhone}</>
                    ) : (
                      <i className="text-danger">Empty</i>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddEstimateDetails;
