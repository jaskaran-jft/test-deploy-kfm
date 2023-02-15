import React, { useState, useMemo, Fragment } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
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
import TableFilters from "src/Components/Common/TableFilters";
import TableListHeader from "src/Components/Common/TableHeader";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableLink from "src/Components/Common/TableLink";
import TableText from "src/Components/Common/TableText";
import ReactDataTable from "src/Components/Common/reactDataTableComponent";
import { getStoreTrips } from "src/helpers/WorkOrder";
import { getStatusColor } from "src/helpers/format_helper";
import TripReturn from "src/pages/Trip/TripReturn";
import { CONSTANT } from "src/utils/constant";

const TripsList = (props) => {
  const [hide, setHide] = useState({
    hideTrip: false,
    hideTicket: false,
    hideTechnician: false,
    hideVendor: false,
    hideStatus: false,
    hideCheckIn: false,
    hideCheckOut: false,
  });

  const { tags = [] } = useSelector((state) => state.Login);
  const [filterData, setFilterData] = useState("");
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [viewId, setViewId] = useState("");
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

  const toggle = () => {
    setShowReturnForm((prev) => !prev);
  };

  const columns = useMemo(
    () => [
      {
        name: "Trip #",
        selector: (row) => (
          <TableLink
            onClick={() => props.history.push(`/tripDetails/${row.id}`)}
            value={
              <h6 className="text-primary mb-0">
                {`#${row?.trackingId}` || "--"}
              </h6>
            }
          />
        ),
        sortName: "trackingId",
        sortable: true,
        omit: hide.hideTrip,
        extra: "hideTrip",
      },
      {
        name: "Technician",
        selector: (row) => (
          <TableText>
            {row.technician && row.technician.length > 0
              ? row.technician.map((tech, _) => (
                  <Fragment key={_}>
                    {_ !== 0 && _ !== row.technician.length ? ", " : ""}{" "}
                    {(tech?.user?.firstName || "") +
                      " " +
                      (tech?.user?.lastName || "")}
                  </Fragment>
                ))
              : "--"}
          </TableText>
        ),
        sortName: "technician",
        sortable: false,
        omit: hide.hideTechnician,
        extra: "hideTechnician",
      },
      {
        name: "Vendor",
        selector: (row) => (
          <TableText>
            {row.vendor?.user
              ? row?.vendor?.user?.firstName +
                  " " +
                  row?.vendor?.user?.lastName || "--"
              : "--"}
          </TableText>
        ),
        sortName: "vendor",
        sortable: true,
        omit: hide.hideVendor,
        extra: "hideVendor",
      },
      {
        name: "Status ",
        selector: (row) =>
          <Badge color={getStatusColor(row?.status)}>{row?.status}</Badge> ||
          "",
        sortName: "status",
        sortable: true,
        omit: hide.hideStatus,
        extra: "hideStatus",
      },
      {
        name: "Check-In Time",
        selector: (row) =>
          row?.checkInTime
            ? new Date(row?.checkInTime).toLocaleDateString()
            : "--",
        sortName: "checkInTime",
        sortable: true,
        omit: hide.hideCheckIn,
        extra: "hideCheckIn",
      },
      {
        name: "Check-Out Time",
        selector: (row) =>
          row?.checkOutTime
            ? new Date(row?.checkOutTime).toLocaleDateString()
            : "--",
        sortName: "checkOutTime",
        sortable: true,
        omit: hide.hideCheckOut,
        extra: "hideCheckOut",
      },
      {
        name: "Action",
        selector: (row) => (
          <div style={{ position: "relative" }}>
            {tags.includes(CONSTANT.CREATE_RETURN_TRIP) &&
              row?.status.trim() === CONSTANT.RETURN_TRIP_REQUIRED && (
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
                    <DropdownItem
                      onClick={() => {
                        setViewId(row?.trip_id);
                        toggle();
                      }}
                    >
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                      Return Trip
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
          </div>
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
      {showReturnForm ? (
        <FormModal
          title="Create Return Trip"
          toggle={toggle}
          open={showReturnForm}
          width
        >
          <TripReturn tripId={viewId} toggle={toggle} />
        </FormModal>
      ) : null}
      <div className="page-content">
        <Container fluid={true}>
          <Card>
            <CardBody>
              <Row className="d-flex justify-content-between">
                <Col className="col-md-3">
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
                  options={CONSTANT.TRIP_STATUS}
                  value={filters}
                  handleChange={handleChange}
                />
              ) : null}

              <ReactDataTable
                title=""
                columns={columns}
                id={showReturnForm}
                api={(data) => getStoreTrips({ ...data, ticketId: props.id })}
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(TripsList);
