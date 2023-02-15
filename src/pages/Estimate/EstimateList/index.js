import React, { useState, useMemo, Fragment } from "react";
import {
  Card,
  CardBody,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Input,
  Badge,
} from "reactstrap";
import FormModal from "src/Components/Common/FormModal";
import ReactDataTable from "src/Components/Common/reactDataTableComponent";
import {
  acceptEstimate,
  cancelEstimate,
  declineEstimate,
  generateInvoice,
  getEstimateList,
} from "src/helpers/WorkOrder";
import EstimateDetails from "../EstimateDetails";
import { CONSTANT } from "src/utils/constant";
import EstimateActionButton from "./EstimateActionButton";
import { useSelector } from "react-redux";
import { getStatusColor, noop } from "src/helpers/format_helper";
import EstimateReviseDetails from "./EstimateReviewDetails";
import Notify from "src/common/Toaster/toast";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableListHeader from "src/Components/Common/TableHeader";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableText from "src/Components/Common/TableText";
import TableDescription from "src/Components/Common/TableDescription";
import TableFilters from "src/Components/Common/TableFilters";
import { withTranslation } from "react-i18next";

const EstimateList = ({ id = "", t = noop }) => {
  const [hide, setHide] = useState({
    hideName: false,
    hideClientName: false,
    hideStore: false,
    hideEmail: false,
    hideNumber: false,
    hideComment: false,
  });
  const { tags = [] } = useSelector((state) => state.Login);
  const [filterData, setFilterData] = useState("");
  const [showEstimateDetails, setShowEstimateDetails] = useState(false);
  const [viewId, setViewId] = useState("");
  const [showAcceptButton, setShowAcceptButton] = useState(false);
  const [showDeclineButton, setShowDeclineButton] = useState(false);
  const [showEditEstimate, setShowEditEstimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ date: "", status: "" });

  const handleChange = (e) => {
    console.log(e);
    if (e.target) {
      const { value, name } = e.target;
      console.log({ value, name });
      setFilters((prev) => ({ ...prev, [name]: value }));
    } else {
      setFilters((prev) => ({ ...prev, date: e }));
    }
  };

  const toggleFilter = () => {
    setShowFilters((prev) => !prev);
  };

  const handleView = (row) => {
    setViewId(row.estimate_id);
    setShowEstimateDetails(true);
  };

  const toggleAccept = () => {
    setShowAcceptButton((prev) => !prev);
    setShowEstimateDetails(false);
  };

  const toggleDecline = () => {
    setShowDeclineButton((prev) => !prev);
    setShowEstimateDetails(false);
  };

  const handleEdit = async (row) => {
    setViewId(row.estimate_id);
    setShowEditEstimate(true);
  };

  const toggle = () => {
    setShowEstimateDetails(false);
  };

  const editEstimateToggle = () => {
    setShowEditEstimate(false);
  };

  const setId = (row) => {
    setViewId(row.estimate_id);
  };

  const approveEstimate = async (row) => {
    setLoading(true);
    setHasSubmit(false);

    try {
      const response = await generateInvoice({ estimateId: row?.estimate_id });
      setLoading(false);
      Notify(response.message, true);
      setHasSubmit(true);
    } catch (error) {
      setLoading(false);
      Notify(error, false);
      setHasSubmit(true);
    }
  };

  const handleCancelEstimate = async (row) => {
    setLoading(true);
    setHasSubmit(false);

    try {
      const response = await cancelEstimate({ estimateId: row?.estimate_id });
      setLoading(false);
      Notify(response.message, true);
      setHasSubmit(true);
    } catch (error) {
      setLoading(false);
      Notify(error, false);
      setHasSubmit(true);
    }
  };

  const options = id ? { ticketId: id } : {};

  const columns = useMemo(
    () => [
      {
        name: "Created At",
        selector: (row) => new Date(row?.createdat).toLocaleDateString() || "",
        sortName: "createdat",
        sortable: true,
        omit: hide.hideName,
        extra: "hideName",
      },
      {
        name: "Estimate #",
        selector: (row) => `# ${row?.estimateno}`,
        sortName: "estimateno",
        sortable: true,
        omit: hide.hideNumber,
        extra: "hideNumber",
      },
      {
        name: "Vendor Name",
        selector: (row) => <TableText>{row?.vendorname || "--"}</TableText>,
        sortName: "vendorname",
        sortable: true,
        omit: hide.hideStore,
        extra: "hideStore",
      },
      {
        name: "Total",
        selector: (row) => (
          <TableText>{`$${Number(row?.total).toFixed(2) || "--"}`}</TableText>
        ),
        sortName: "total",
        sortable: false,
        omit: hide.hideClientName,
        extra: "hideClientName",
      },
      {
        name: "Status",
        selector: (row) => (
          <Badge color={getStatusColor(row?.status)}>{row?.status}</Badge>
        ),
        sortName: "status",
        sortable: true,
        omit: hide.hideEmail,
        extra: "hideEmail",
      },

      {
        name: "Comment",
        selector: (row) => (
          <TableDescription row={row?.comment} title={row?.estimateno}>
            <div
              dangerouslySetInnerHTML={{
                __html: row?.comment || "",
              }}
            />
          </TableDescription>
        ),
        sortName: "comment",
        sortable: false,
        omit: hide.hideComment,
        extra: "hideComment",
      },
      {
        name: "Action",
        selector: (row) => (
          <UncontrolledDropdown className="dropdown custom_dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-primary btn-sm"
              tag="button"
              typeof="button"
              type="button"
              role="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem onClick={() => handleView(row)}>
                <i className="mdi mdi-eye align-bottom me-2 text-muted"></i>
                {t("View")}
              </DropdownItem>
              {(row.status === CONSTANT.REJECTED ||
                row.status === CONSTANT.DRAFT) &&
                tags.includes(CONSTANT.REVISE_ESTIMATE) && (
                  <DropdownItem
                    onClick={() => handleEdit(row)}
                    className="edit-item-btn"
                  >
                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                    {t("Edit")}
                  </DropdownItem>
                )}

              {row.status === CONSTANT.APPROVED &&
                tags.includes(CONSTANT.GENERATE_INVOICE) && (
                  <DropdownItem
                    onClick={() => approveEstimate(row)}
                    className="edit-item-btn"
                  >
                    {loading ? (
                      <>...</>
                    ) : (
                      <>
                        <i className="mdi mdi-arrow-right-bold-circle align-bottom me-2 text-muted"></i>
                        {t("Approve")}
                      </>
                    )}
                  </DropdownItem>
                )}

              {tags.includes(CONSTANT.ESTIMATE_ACCEPT) &&
                row.status === CONSTANT.PENDING && (
                  <DropdownItem
                    onClick={() => {
                      setId(row);
                      setShowAcceptButton(true);
                    }}
                    className="edit-item-btn"
                  >
                    <i className="mdi mdi-checkbox-marked-circle  align-bottom me-2 text-muted"></i>
                    {t("Accept")}
                  </DropdownItem>
                )}

              {tags.includes(CONSTANT.ESTIMATE_DECLINE) &&
                row.status === CONSTANT.PENDING && (
                  <DropdownItem
                    onClick={() => {
                      setId(row);
                      setShowDeclineButton(true);
                    }}
                    className="edit-item-btn"
                  >
                    <i className="mdi mdi-close-circle  align-bottom me-2 text-muted"></i>
                    {t("Decline")}
                  </DropdownItem>
                )}

              {tags.includes(CONSTANT.CANCEL_ESTIMATE) &&
                row.status === CONSTANT.PENDING && (
                  <DropdownItem
                    onClick={() => handleCancelEstimate(row)}
                    className="edit-item-btn"
                  >
                    {loading ? (
                      <>...</>
                    ) : (
                      <>
                        <i className="mdi mdi-cancel align-bottom me-2 text-muted"></i>
                        {t("Cancel / Bill Incurred")}
                      </>
                    )}
                  </DropdownItem>
                )}
            </DropdownMenu>
          </UncontrolledDropdown>
        ),
        id: "action",
        sortName: "status",
        sortable: false,
      },
    ],
    [hide, loading, tags],
  );

  const onSearchResources = (e) => {
    setFilterData(e.target.value);
  };

  const handleColumnHide = (name) => {
    setHide((prev) => {
      return {
        ...prev,
        [name]: !prev[name],
      };
    });
  };

  return (
    <React.Fragment>
      {showEstimateDetails ? (
        <FormModal
          title="Estimate Details"
          toggle={toggle}
          open={showEstimateDetails}
          width
        >
          <EstimateDetails
            setShowAcceptButton={setShowAcceptButton}
            setShowDeclineButton={setShowDeclineButton}
            id={viewId}
          />
        </FormModal>
      ) : null}
      {showAcceptButton ? (
        <FormModal
          title="Accept Estimate"
          toggle={toggleAccept}
          open={showAcceptButton}
        >
          <EstimateActionButton
            api={acceptEstimate}
            id={viewId}
            toggle={toggleAccept}
          />
        </FormModal>
      ) : null}
      {showDeclineButton ? (
        <FormModal
          title="Decline Estimate"
          toggle={toggleDecline}
          open={showDeclineButton}
        >
          <EstimateActionButton
            api={declineEstimate}
            id={viewId}
            cancel={true}
            toggle={toggleDecline}
          />
        </FormModal>
      ) : null}
      {showEditEstimate ? (
        <FormModal
          title="Revise Estimate"
          toggle={editEstimateToggle}
          open={showEditEstimate}
          width={true}
        >
          <EstimateReviseDetails
            id={viewId}
            toggle={editEstimateToggle}
            setShowEstimate={setShowEditEstimate}
          />
        </FormModal>
      ) : null}
      <div className="page-content">
        <Container fluid={true}>
          {!id && <BreadCrumb title={"Estimates"} pageTitle="Accounting" />}{" "}
          <Card>
            <CardBody>
              <Row className="col-md-12 d-flex justify-content-between align-items-center">
                <Col className="flex-grow-1">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      style={{
                        fontSize: 24,
                        color: "gray",
                        background: "transparent",
                        borderColor: "transparent",
                      }}
                    >
                      <TableHeaderIcon />
                    </DropdownToggle>
                    <DropdownMenu>
                      {columns.map((column) => (
                        <DropdownItem key={column.name} toggle={false}>
                          <div
                            className="d-flex justify-content-between"
                            htmlFor={column.extra}
                          >
                            <label htmlFor={column.extra}>
                              {column.name}&nbsp;&nbsp;&nbsp;&nbsp;
                            </label>
                            <input
                              id={column.extra}
                              type="checkbox"
                              onChange={() => {
                                handleColumnHide(column.extra);
                              }}
                              checked={!hide[column.extra]}
                            />
                          </div>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Col>

                <Col className="flex-shrink-0">
                  <TableListHeader
                    toggle={toggleFilter}
                    onSearchResources={onSearchResources}
                  />
                </Col>
              </Row>

              {showFilters ? (
                <TableFilters
                  toggle={toggleFilter}
                  status={false}
                  value={filters}
                  handleChange={handleChange}
                />
              ) : null}

              <ReactDataTable
                title={""}
                columns={columns}
                id={
                  showAcceptButton ||
                  showDeclineButton ||
                  showEditEstimate ||
                  hasSubmit
                }
                api={(data) => getEstimateList({ ...data, ...options })}
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(EstimateList);
