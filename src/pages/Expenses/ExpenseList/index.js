import React, { useState, useMemo } from "react";

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
  Badge,
} from "reactstrap";
import TableFilters from "src/Components/Common/TableFilters";
import TableListHeader from "src/Components/Common/TableHeader";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableText from "src/Components/Common/TableText";
import ReactDataTable from "src/Components/Common/reactDataTableComponent";
import { getExpenseList } from "src/helpers/WorkOrder";
import { getStatusColor } from "src/helpers/format_helper";
import { CONSTANT } from "src/utils/constant";

const Expense = (props) => {
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

  const [filterData, setFilterData] = useState("");
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

  const options = props.id ? { ticketId: props.id } : {};

  const columns = useMemo(
    () => [
      {
        name: "Created At",
        selector: (row) =>
          `${new Date(row?.createdat).toLocaleDateString()}, ${new Date(
            row?.createdat,
          ).toLocaleTimeString()}`,
        sortName: "createdat",
        sortable: false,
        omit: hide.hideTicket,
        extra: "hideTicket",
      },
      {
        name: "Vendor",
        selector: (row) => <TableText>{row?.vendor_name || ""}</TableText>,
        sortName: "vendor_name",
        sortable: true,
        omit: hide.hideName,
        extra: "hideName",
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
        name: "Type",
        selector: (row) => <TableText>{row?.type || ""}</TableText>,
        sortName: "type",
        sortable: true,
        omit: hide.hideClientName,
        extra: "hideClientName",
      },
      {
        name: "Total",
        selector: (row) => <TableText>{`$ ${row?.total}` || ""}</TableText>,
        sortName: "total",
        sortable: true,
        omit: hide.hideStoreName,
        extra: "hideStoreName",
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
      <div className="page-content">
        <Container fluid={true}>
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
                  options={CONSTANT.EXPENSE_STATUS}
                />
              ) : null}

              <ReactDataTable
                title={props.id ? "" : "Expenses"}
                columns={columns}
                api={(data) => getExpenseList({ ...data, ...options })}
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Expense;
