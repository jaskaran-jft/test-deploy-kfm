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
import TableLink from "src/Components/Common/TableLink";
import ReactDataTable from "src/Components/Common/reactDataTableComponent";
import { getTripList } from "src/helpers/WorkOrder";
import { getStatusColor } from "src/helpers/format_helper";
import { CONSTANT } from "src/utils/constant";
import TripReturn from "../TripReturn";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableListHeader from "src/Components/Common/TableHeader";
import TableText from "src/Components/Common/TableText";
import TableFilters from "src/Components/Common/TableFilters";

const TripList = (props) => {
  const [hide, setHide] = useState({
    hideTrip: false,
    hideTicket: false,
    hideName: false,
    hideStatus: false,
    description: false,
    hideTripDate: false,
    hideStoreName: false,
    hideClientName: false,
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
            onClick={() => props.history.push(`/tripDetails/${row.trip_id}`)}
            value={
              <h6 className="text-primary mb-0">
                {`# ${row?.trip_trackingid}` || "--"}
              </h6>
            }
          />
        ),
        sortName: "trip_trackingid",
        sortable: true,
        omit: hide.hideTrip,
        extra: "hideTrip",
      },
      {
        name: "Ticket #",
        selector: (row) => (
          <TableLink
            onClick={() =>
              props.history.push(`/workOrderDetails/${row.ticket_trackingid}`)
            }
            value={
              <h6 className="text-primary mb-0">
                {`# ${row?.ticket_trackingid}` || "--"}
              </h6>
            }
          />
        ),
        sortName: "ticket_trackingid",
        sortable: false,
        omit: hide.hideTicket,
        extra: "hideTicket",
      },
      {
        name: "Vendor",
        selector: (row) => (
          <TableText>
            {row?.vendor_firstname || "" + " " + row?.vendor_lastname || ""}
          </TableText>
        ),
        sortName: "vendor_firstname",
        sortable: true,
        omit: hide.hideName,
        extra: "hideName",
      },
      {
        name: "Status ",
        selector: (row) =>
          (
            <Badge color={getStatusColor(row?.trip_status)}>
              {row?.trip_status}
            </Badge>
          ) || "",
        sortName: "trip_status",
        sortable: true,
        omit: hide.hideStatus,
        extra: "hideStatus",
      },
      {
        name: "Brand Name",
        selector: (row) => <TableText>{row?.client_name || ""}</TableText>,
        sortName: "client_name",
        sortable: true,
        omit: hide.hideClientName,
        extra: "hideClientName",
      },
      {
        name: "Site Name",
        selector: (row) => <TableText>{row?.store_name || ""}</TableText>,
        sortName: "store_name",
        sortable: true,
        omit: hide.hideStoreName,
        extra: "hideStoreName",
      },

      {
        name: "Trip Date",
        selector: (row) =>
          new Date(row?.trip_date).toLocaleDateString() || "--",
        sortName: "trip_date",
        sortable: true,
        omit: hide.hideTripDate,
        extra: "hideTripDate",
      },
      {
        name: "Action",
        selector: (row) => (
          <div style={{ position: "relative" }}>
            {tags.includes(CONSTANT.CREATE_RETURN_TRIP) &&
              row?.trip_status.trim() === CONSTANT.RETURN_TRIP_REQUIRED && (
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

  const options = props.id ? { technicianId: props.id } : {};
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
          {!props.id && !props.dashboard && (
            <BreadCrumb title={"Trips List"} pageTitle="Trips" />
          )}
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

                {props.dashboard ? null : (
                  <Col className="flex-shrink-0">
                    <TableListHeader
                      toggle={toggleFilter}
                      onSearchResources={onSearchResources}
                    />
                  </Col>
                )}
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
                title={""}
                columns={columns}
                id={showReturnForm}
                api={(data) => getTripList({ ...data, ...options })}
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TripList;
