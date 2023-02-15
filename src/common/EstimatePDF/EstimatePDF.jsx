import React, { Fragment, useMemo, useState } from "react";
import FMILogoBlack from "src/assets/images/logo/logo-green.png";
import { setLabour, setMaterial, setTrip } from "./utils";
import "src/estimate.css";
import EstimatePDFFooter from "./EstimatePDFFooter";
import {
  Card,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  CardBody,
  Row,
  Col,
} from "reactstrap";

const EstimatePDF = (props) => {
  const [currentTab, setCurrentTab] = useState("1");
  const { setData, setShowAcceptButton, setShowDeclineButton } = props;
  const {
    createdAt,
    estimateNo,
    estimateStr,
    labor = [],
    material = [],
    trip = [],
    total = 0,
    ticket = {},
    status = "",
    assessment = "",
    vendor = {},
    incurredCost = 0,
    estimatedCost = 0,
    pdfPath = "estimatePdf",
    rejectionReason = "",
  } = props.data;

  const { trackingId = "", store = {}, trade = {}, issue = {} } = ticket;
  const { user = {}, address = [] } = vendor;
  const { address: storeAddress = {}, client = {} } = store;

  const {
    incurredLabour,
    estimatedLabour,
    incurredLabourTotal,
    estimatedLabourTotal,
  } = useMemo(() => {
    return setLabour(labor);
  }, [labor]);

  const {
    incurredMaterial,
    estimatedMaterial,
    incurredMaterialTotal,
    estimatedMaterialTotal,
  } = useMemo(() => {
    return setMaterial(material);
  }, [material]);

  const { incurredTrip, estimatedTrip, incurredTripTotal, estimatedTripTotal } =
    useMemo(() => {
      return setTrip(trip);
    }, [trip]);

  const handleChange = (id, index) => {
    if (id !== currentTab) {
      if (id === "1") {
        console.log("upper", id);
        setCurrentTab(id);
        setData(props.initialData);
      } else {
        console.log("lower", id);
        setCurrentTab(id);
        setData({ ...props.initialData.revision[index], ticket, vendor });
      }
    }
  };

  return (
    <Col>
      <Card>
        <CardHeader>
          <Row>
            <Nav
              className="nav-tabs-custom rounded card-header-tabs border-bottom-0 p-2"
              role="tablist"
            >
              {/* <NavItem> */}
              <NavLink
                to="#"
                className={`p-2 ${
                  currentTab === "1"
                    ? "text-dark rounded-top p-3 bg-light"
                    : "text-dark p-3"
                }`}
                onClick={() => {
                  handleChange("1");
                }}
                type="button"
              >
                Current
              </NavLink>
              {props.initialData.revision.length > 0
                ? props.initialData.revision.map((item, index) => (
                    <NavLink
                      key={item.id}
                      to="#"
                      className={`p-2 ${
                        currentTab === `${index + 2}`
                          ? "text-dark rounded-top p-3 bg-light"
                          : "text-dark p-3"
                      }`}
                      onClick={() => {
                        handleChange(`${index + 2}`, index);
                      }}
                      type="button"
                    >
                      {props.invoice ? (
                        <>Invoice No. {item.invoiceStr || item.invoiceNo}</>
                      ) : (
                        <>Estimate No. {item.estimateStr || item.estimateNo}</>
                      )}
                      {/* Revision - {props.initialData.revision.length - index} */}
                    </NavLink>
                  ))
                : null}
            </Nav>
          </Row>
        </CardHeader>
        <CardBody className="p-4">
          <div className="">
            <div
              className="card"
              style={{ border: "none", margin: "0px auto" }}
            >
              <div className="invoice-head">
                <div
                  className="card-header"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    justifyContent: "space-between",
                    width: "100%",
                    background: " #3a84b5",
                    printColorAdjust: "exact",
                  }}
                >
                  <div className="logo-pdf">
                    <img
                      src={client?.logoUrl || FMILogoBlack}
                      style={{ width: " 150px", margin: "0px auto" }}
                      alt="logo"
                    />
                  </div>

                  <div className="text-center">
                    <p>
                      <h1 style={{ color: "#fff" }}>
                        {props.invoice ? "INVOICE" : "ESTIMATE"}
                      </h1>
                    </p>
                    <p> {status}</p>
                  </div>

                  <div className="float-right">
                    <p
                      className="top-head"
                      style={{ marginBottom: "0px", fontSize: "30px" }}
                    >
                      WO#<strong>{trackingId}</strong>
                    </p>
                    {props.invoice ? (
                      <>
                        Invoice #{" "}
                        {props.data.invoiceStr || props.data.invoiceNo}
                      </>
                    ) : (
                      <>Estimate # {estimateStr || estimateNo}</>
                    )}
                    <br />
                    Date Submitted {new Date(createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div
                className="card-body"
                style={{ border: "1px solid #00000026", borderTop: "0px" }}
              >
                <div className="row mb-4">
                  <div className="col-sm-12">
                    <h5>
                      <strong>
                        {user?.firstName || ""} {user?.lastName || ""}
                      </strong>
                    </h5>
                    <div>
                      {(address[0]?.streetAddress1 || "") +
                        " " +
                        (address[0]?.place || "") +
                        " " +
                        (address[0]?.state || "") +
                        ", " +
                        (address[0]?.zipCode || "")}
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-sm-4">
                    <h6 className="mb-3">
                      <strong>Job Location</strong>
                    </h6>
                    <div>{storeAddress?.streetAddress1 || ""}</div>
                    <div>{storeAddress?.streetAddress2 || ""}</div>
                    <div>{storeAddress?.place || ""}</div>
                    <div>{storeAddress?.state || ""}</div>
                  </div>
                  <div className="col-sm-4">
                    <h6 className="mb-3">
                      <strong>Service Request Info</strong>
                    </h6>
                    <div># {trackingId}</div>
                    <div>{trade?.name}</div>
                    <div>
                      {issue ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: issue?.description,
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <h6 className="mb-3">
                      <strong>Estimated By</strong>
                    </h6>
                    <div>
                      {user?.firstName || ""} {user?.lastName || ""}
                    </div>
                    <div>{user?.username || ""}</div>
                  </div>
                </div>
                <hr />
                <div className="row mb-4">
                  <div className="col-sm-12">
                    {rejectionReason ? (
                      <Fragment>
                        <h6 className="mb-2">
                          <strong>Rejection Reason</strong>
                        </h6>
                        <div
                          className="mb-2"
                          dangerouslySetInnerHTML={{
                            __html: rejectionReason || "",
                          }}
                        />
                      </Fragment>
                    ) : null}
                  </div>
                  <div className="col-sm-12">
                    <h6 className="mb-2">
                      <strong>Assessment/Troubleshoot</strong>
                    </h6>
                    <div
                      className="mb-2"
                      dangerouslySetInnerHTML={{ __html: assessment || "" }}
                    />
                  </div>
                </div>
                {incurredLabour.length ||
                incurredMaterial.length ||
                incurredTrip.length ? (
                  <div className="table-responsive-sm">
                    <h3>Incurred</h3>
                    {labor.some((item) => item.type === "Incurred") > 0 ? (
                      <table className="table">
                        <thead style={{ display: "table-header-group" }}>
                          <tr>
                            <th className="center">Qty</th>
                            <th>Techs</th>
                            <th>Description</th>
                            <th>Unit Price</th>
                            <th>Net Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            className="strong-text"
                            style={{ background: "#3a84b51c" }}
                          >
                            <td className="center" colSpan="4">
                              Labor
                            </td>
                            <td className="left strong">
                              $ {Number(incurredLabourTotal).toFixed(2)}
                            </td>
                          </tr>
                          {incurredLabour.map((ele, index) => (
                            <tr key={index}>
                              <td className="center">{ele.quantity}</td>
                              <td className="left">{ele.technicians}</td>
                              <td className="left">
                                {ele.description || "--"}
                              </td>
                              <td className="right">${ele.unitPrice}</td>
                              <td className="center">${ele.netPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : null}
                    <br />
                    <br />

                    {incurredMaterial.length > 0 ? (
                      <table className="table">
                        <thead style={{ display: "table-header-group" }}>
                          <tr>
                            <th className="center">Qty</th>
                            <th>Description</th>
                            <th>Unit Price</th>
                            <th>Net Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            className="strong-text"
                            style={{ background: "#3a84b51c" }}
                          >
                            <td className="center" colSpan="3">
                              Material
                            </td>
                            <td className="left strong">
                              ${Number(incurredMaterialTotal).toFixed(2)}
                            </td>
                          </tr>
                          {incurredMaterial.map((ele, index) => (
                            <tr key={index}>
                              <td className="center">{ele.quantity}</td>
                              <td className="left">
                                {ele.description || "--"}
                              </td>
                              <td className="right">${ele.unitPrice}</td>
                              <td className="center">${ele.netPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : null}
                    {incurredTrip.length > 0 && (
                      <>
                        <br />
                        <br />
                        <table className="table">
                          <thead style={{ display: "table-header-group" }}>
                            <tr>
                              <th className="center">Qty</th>
                              <th>Description</th>
                              <th>Unit Price</th>
                              <th>Net Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              className="strong-text"
                              style={{ background: "#3a84b51c" }}
                            >
                              <td className="center" colSpan="3">
                                trip
                              </td>
                              <td className="left strong">
                                ${Number(incurredTripTotal).toFixed(2)}
                              </td>
                            </tr>
                            {incurredTrip.map((ele, index) => (
                              <tr key={index}>
                                <td className="center">{ele.quantity}</td>
                                <td className="left">
                                  {ele.description || "--"}
                                </td>
                                <td className="right">${ele.unitPrice}</td>
                                <td className="center">${ele.netPrice}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <br />
                        <br />
                      </>
                    )}
                  </div>
                ) : null}

                {estimatedLabour.length ||
                estimatedMaterial.length ||
                estimatedTrip.length ? (
                  <div className="table-responsive-sm">
                    <h3>Estimated</h3>
                    {estimatedLabour.length > 0 ? (
                      <table className="table">
                        <thead style={{ display: "table-header-group" }}>
                          <tr>
                            <th className="center">Qty</th>
                            <th>Techs</th>
                            <th>Description</th>
                            <th>Unit Price</th>
                            <th>Net Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            className="strong-text"
                            style={{ background: "#3a84b51c" }}
                          >
                            <td className="center" colSpan="4">
                              Labor
                            </td>
                            <td className="left strong">
                              $ {Number(estimatedLabourTotal).toFixed(2)}
                            </td>
                          </tr>
                          {estimatedLabour.map((ele, index) => (
                            <tr key={index}>
                              <td className="center">{ele.quantity}</td>
                              <td className="left">{ele.technicians}</td>
                              <td className="left">
                                {ele.description || "--"}
                              </td>
                              <td className="right">${ele.unitPrice}</td>
                              <td className="center">${ele.netPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : null}
                    <br />
                    <br />

                    {estimatedMaterial.length > 0 ? (
                      <table className="table">
                        <thead style={{ display: "table-header-group" }}>
                          <tr>
                            <th className="center">Qty</th>
                            <th>Description</th>
                            <th>Unit Price</th>
                            <th>Net Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            className="strong-text"
                            style={{ background: "#3a84b51c" }}
                          >
                            <td className="center" colSpan="3">
                              Material
                            </td>
                            <td className="left strong">
                              ${Number(estimatedMaterialTotal).toFixed(2)}
                            </td>
                          </tr>
                          {estimatedMaterial.map((ele, index) => (
                            <tr key={index}>
                              <td className="center">{ele.quantity}</td>
                              <td className="left">
                                {ele.description || "--"}
                              </td>
                              <td className="right">${ele.unitPrice}</td>
                              <td className="center">${ele.netPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : null}
                    {estimatedTrip.length > 0 && (
                      <>
                        <br />
                        <br />
                        <table className="table">
                          <thead style={{ display: "table-header-group" }}>
                            <tr>
                              <th className="center">Qty</th>
                              <th>Description</th>
                              <th>Unit Price</th>
                              <th>Net Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              className="strong-text"
                              style={{ background: "#3a84b51c" }}
                            >
                              <td className="center" colSpan="3">
                                trip
                              </td>
                              <td className="left strong">
                                ${Number(estimatedTripTotal).toFixed(2)}
                              </td>
                            </tr>
                            {estimatedTrip.map((ele, index) => (
                              <tr key={index}>
                                <td className="center">{ele.quantity}</td>
                                <td className="left">
                                  {ele.description || "--"}
                                </td>
                                <td className="right">${ele.unitPrice}</td>
                                <td className="center">${ele.netPrice}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <br />
                        <br />
                      </>
                    )}
                  </div>
                ) : null}

                <EstimatePDFFooter
                  incurredCost={incurredCost}
                  address={address}
                  estimatedCost={estimatedCost}
                  total={total}
                  user={user}
                  estimatePdf={pdfPath}
                  status={status}
                  setShowAcceptButton={setShowAcceptButton}
                  setShowDeclineButton={setShowDeclineButton}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default EstimatePDF;
