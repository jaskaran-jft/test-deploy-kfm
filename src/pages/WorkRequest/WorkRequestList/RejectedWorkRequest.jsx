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
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableDescription from "src/Components/Common/TableDescription";
import TableFilters from "src/Components/Common/TableFilters";
import TableListHeader from "src/Components/Common/TableHeader";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableLink from "src/Components/Common/TableLink";
import TableText from "src/Components/Common/TableText";
import ReactDataTable from "src/Components/Common/reactDataTableComponent";
import { workRequestList } from "src/helpers/WorkRequest";
import { getStatusColor } from "src/helpers/format_helper";

const RejectedWorkOrders = (props) => {
  const [hide, setHide] = useState({
    hideCreatedAt: false,
    hideWR: false,
    hideStatus: false,
    hideCity: false,
    hideState: false,
    hideEmail: false,
    hideDescription: false,
    hideStoreName: false,
    hideCreatedBy: false,
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
    }else {
      setFilters((prev) => ({ ...prev, date: e }));
    }
  };

  const toggleFilter = () => {
    setShowFilters((prev) => !prev);
  };

  const handleView = (row) => {
    props.history.push(`/workRequestDetails/${row.ticket_trackingid}`);
  };

  const columns = useMemo(
    () => [
      {
        name: "WR#",
        selector: (row) => (
          <TableLink
            onClick={() => handleView(row)}
            value={
              <h6 className="text-primary mb-0">
                {`# ${row?.ticket_trackingid}` || "--"}
              </h6>
            }
          />
        ),
        sortName: "ticket_trackingid",
        sortable: true,
        omit: hide.hideWR,
        extra: "hideWR",
      },
      {
        name: "Created At",
        selector: (row) => (
          <Fragment>
            {new Date(row?.ticket_createdat).toLocaleDateString()},{" "}
            {new Date(row?.ticket_createdat).toLocaleTimeString()}
          </Fragment>
        ),
        sortName: "ticket_createdat",
        sortable: true,
        omit: hide.hideCreatedAt,
        extra: "hideCreatedAt",
      },

      {
        name: "Created By",
        selector: (row) => (
          <TableText>{row?.ticket_createdby || "--"} </TableText>
        ),
        sortName: "ticket_createdby",
        sortable: true,
        omit: hide.hideCreatedBy,
        extra: "hideCreatedBy",
      },

      {
        name: "Site mall",
        selector: (row) => <TableText>{row?.store_mall || ""} </TableText>,
        sortName: "store_mall",
        sortable: true,
        omit: hide.hideStoreName,
        extra: "hideStoreName",
      },

      {
        name: "Status",
        selector: (row) => (
          <Badge color={getStatusColor(row.ticket_status)}>
            {row?.ticket_status}
          </Badge>
        ),
        sortName: "ticket_status",
        sortable: true,
        omit: hide.hideStatus,
        extra: "hideStatus",
      },
      // {
      //   name: "City",
      //   selector: (row) => row?.address_province || "--",
      //   sortName: "address_province",
      //   sortable: true,
      //   omit: hide.hideCity,
      //   extra: "hideCity",
      // },
      {
        name: "State",
        selector: (row) => row?.address_state || "--",
        sortName: "address_state",
        sortable: true,
        omit: hide.hideState,
        extra: "hideState",
      },

      {
        name: "Description",
        selector: (row) => (
          <TableDescription
            row={row?.ticket_description}
            title={row?.ticket_trackingid}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: row?.ticket_description || "",
              }}
            />
          </TableDescription>
        ),
        sortName: "ticket_description",
        sortable: true,
        omit: hide.hideDescription,
        extra: "hideDescription",
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
          <BreadCrumb
            title={"Rejected Requests List"}
            pageTitle="Service Request"
          />
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
                  status={false}
                  value={filters}
                  handleChange={handleChange}
                />
              ) : null}

              <ReactDataTable
                title=""
                columns={columns}
                api={(data) =>
                  workRequestList({ ...data, "status[]": "Rejected" })
                }
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RejectedWorkOrders;
