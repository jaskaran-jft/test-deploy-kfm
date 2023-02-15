import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
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
  acceptInvoice,
  declineInvoice,
  getInvoiceList,
  invoicePaid,
} from "src/helpers/WorkOrder";
import { getStatusColor } from "src/helpers/format_helper";
import { CONSTANT } from "src/utils/constant";
import InvoiceDetails from "../InvoiceDetails";
import EstimateActionButton from "src/pages/Estimate/EstimateList/EstimateActionButton";
import InvoiceReviseDetails from "./InvoiceReviewDetails";
import InvoiceConfirmation from "./InvoiceConfirmation";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableListHeader from "src/Components/Common/TableHeader";
import TableText from "src/Components/Common/TableText";
import TableDescription from "src/Components/Common/TableDescription";
import TableFilters from "src/Components/Common/TableFilters";

const InvoiceList = ({ id = "" }) => {
  const [hide, setHide] = useState({
    hideName: false,
    hideClientName: false,
    hideStore: false,
    hideEmail: false,
    hideNumber: false,
  });

  const [filterData, setFilterData] = useState("");
  const { tags = [] } = useSelector((state) => state.Login);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [viewId, setViewId] = useState("");
  const [showAcceptButton, setShowAcceptButton] = useState(false);
  const [showDeclineButton, setShowDeclineButton] = useState(false);
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setViewId(row.invoice_id);
    setShowInvoiceDetails(true);
  };

  const toggleAccept = () => {
    setShowAcceptButton((prev) => !prev);
    setShowInvoiceDetails(false);
  };

  const toggleDecline = () => {
    setShowDeclineButton((prev) => !prev);
    setShowInvoiceDetails(false);
  };

  const handleEdit = async (row) => {
    setViewId(row.invoice_id);
    setShowEditInvoice(true);
  };

  const toggleApprove = () => {
    setLoading((prev) => !prev);
  };

  const toggle = () => {
    setShowInvoiceDetails(false);
  };

  const editInvoiceToggle = () => {
    setShowEditInvoice(false);
  };

  const setId = (row) => {
    setViewId(row.invoice_id);
  };

  const options = id ? { ticketId: id } : {};

  const columns = useMemo(
    () => [
      {
        name: "Created At",
        selector: (row) => new Date(row?.created_at).toLocaleDateString() || "",
        sortName: "created_at",
        sortable: true,
        omit: hide.hideName,
        extra: "hideName",
      },
      {
        name: "Invoice #",
        selector: (row) => `# ${row?.invoice_no}`,
        sortName: "invoice_no",
        sortable: true,
        omit: hide.hideNumber,
        extra: "hideNumber",
      },

      {
        name: "Vendor Name",
        selector: (row) => <TableText>{row?.vendor_name || "--"}</TableText>,
        sortName: "vendor_name",
        sortable: true,
        omit: hide.hideStore,
        extra: "hideStore",
      },
      {
        name: "Total",
        selector: (row) => <TableText>{`$${row?.total}` || "--"}</TableText>,
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
          <TableDescription row={row?.comment} title={row?.invoice_no}>
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
          <UncontrolledDropdown className="dropdown d-inline-block">
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
                View
              </DropdownItem>
              {(row.status === CONSTANT.REJECTED ||
                row.status === CONSTANT.DRAFT) &&
              tags.includes(CONSTANT.REVISE_INVOICE) ? (
                <DropdownItem
                  onClick={() => handleEdit(row)}
                  className="edit-item-btn"
                >
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                  Edit
                </DropdownItem>
              ) : null}

              {row.status === CONSTANT.APPROVED_FOR_PAYMENT ? (
                <DropdownItem
                  onClick={() => {
                    setId(row);
                    toggleApprove();
                  }}
                  className="edit-item-btn"
                >
                  <i className="mdi mdi-cash  align-bottom me-2 text-muted"></i>
                  Mark as Paid
                </DropdownItem>
              ) : null}

              {tags.includes(CONSTANT.INVOICE_ACCEPT) &&
              row.status === CONSTANT.PENDING ? (
                <DropdownItem
                  onClick={() => {
                    setId(row);
                    setShowAcceptButton(true);
                  }}
                  className="edit-item-btn"
                >
                  <i className="mdi mdi-checkbox-marked-circle align-bottom me-2 text-muted"></i>
                  Accept
                </DropdownItem>
              ) : null}

              {tags.includes(CONSTANT.INVOICE_DECLINE) &&
              row.status === CONSTANT.PENDING ? (
                <DropdownItem
                  onClick={() => {
                    setId(row);
                    setShowDeclineButton(true);
                  }}
                  className="edit-item-btn"
                >
                  <i className="mdi mdi-close-circle  align-bottom me-2 text-muted"></i>
                  Decline
                </DropdownItem>
              ) : null}
            </DropdownMenu>
          </UncontrolledDropdown>
        ),
        sortName: "status",
        sortable: false,
      },
    ],
    [hide],
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
      {showInvoiceDetails ? (
        <FormModal
          title="Invoice Details"
          toggle={toggle}
          open={showInvoiceDetails}
          width
        >
          <InvoiceDetails
            setShowAcceptButton={setShowAcceptButton}
            setShowDeclineButton={setShowDeclineButton}
            id={viewId}
          />
        </FormModal>
      ) : null}
      {showAcceptButton ? (
        <FormModal
          title="Accept Invoice"
          toggle={toggleAccept}
          open={showAcceptButton}
        >
          <EstimateActionButton
            api={acceptInvoice}
            id={viewId}
            invoice={true}
            toggle={toggleAccept}
          />
        </FormModal>
      ) : null}
      {showDeclineButton ? (
        <FormModal
          title="Decline Invoice"
          toggle={toggleDecline}
          open={showDeclineButton}
        >
          <EstimateActionButton
            api={declineInvoice}
            id={viewId}
            invoice={true}
            cancel={true}
            toggle={toggleDecline}
          />
        </FormModal>
      ) : null}
      {loading ? (
        <FormModal title="Confirmation" toggle={toggleApprove} open={loading}>
          <InvoiceConfirmation id={viewId} toggle={toggleApprove} />
        </FormModal>
      ) : null}
      {showEditInvoice ? (
        <FormModal
          title="Revise Invoice"
          toggle={editInvoiceToggle}
          open={showEditInvoice}
          width={true}
        >
          <InvoiceReviseDetails
            id={viewId}
            toggle={editInvoiceToggle}
            setShowEstimate={setShowEditInvoice}
          />
        </FormModal>
      ) : null}
      <div className="page-content">
        <Container fluid={true}>
          {!id && <BreadCrumb title={"Invoice List"} pageTitle="Invoice" />}
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
                  status={true}
                  value={filters}
                  handleChange={handleChange}
                  options={CONSTANT.INVOICE_STATUS}
                />
              ) : null}

              <ReactDataTable
                title={""}
                columns={columns}
                id={
                  showAcceptButton ||
                  showDeclineButton ||
                  showEditInvoice ||
                  loading
                }
                api={(data) => getInvoiceList({ ...data, ...options })}
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InvoiceList;
