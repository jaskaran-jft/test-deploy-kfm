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
import TableLink from "src/Components/Common/TableLink";
import ReactDataTable from "src/Components/Common/reactDataTableComponent";
import { workOrderList } from "src/helpers/WorkOrder";
import { dateDiff, getStatusColor } from "src/helpers/format_helper";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableListHeader from "src/Components/Common/TableHeader";
import TableText from "src/Components/Common/TableText";
import TableDescription from "src/Components/Common/TableDescription";
import TableFilters from "src/Components/Common/TableFilters";
import { useParams } from "react-router-dom";

const WorkOrderList = (props) => {
  const { tags } = useSelector((state) => state.Login);
  const [hide, setHide] = useState({
    hideDOH: false,
    hideCreatedAt: false,
    hideTicket: false,
    hideStatus: false,
    hidePriority: false,
    hideETA: true,
    hideCreatedBy: false,
    hideEmail: false,
    hideDescription: false,
    hideStoreName: true,
  });

  const { status } = useParams();

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

  const handleView = (row) => {
    props.history.push(`/workOrderDetails/${row.ticket_trackingid}`);
  };

  const columns = useMemo(
    () => [
      {
        name: "DOH",
        selector: (row) => (
          <TableLink
            onClick={() => handleView(row)}
            value={
              <h6 className="text-primary mb-0">
                {dateDiff(row?.ticket_createdat)}
              </h6>
            }
          />
        ),
        sortName: "ticket_createdat",
        sortable: true,
        omit: hide.hideDOH,
        extra: "hideDOH",
      },
      {
        name: "Ticket#",
        selector: (row) => (
          <TableLink
            onClick={() => handleView(row)}
            value={
              <h6 className="text-primary mb-0"># {row.ticket_trackingid}</h6>
            }
          />
        ),
        sortName: "ticket_trackingid",
        sortable: true,
        omit: hide.hideTicket,
        extra: "hideTicket",
      },
      {
        name: "Site",
        selector: (row) => <TableText>{row?.store_mall || "--"}</TableText>,
        sortName: "store_mall",
        sortable: true,
        omit: hide.hideStoreName,
        extra: "hideStoreName",
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
        name: "Priority",
        selector: (row) => (
          <TableText>{row?.ticket_priority || "--"} </TableText>
        ),
        sortName: "ticket_priority",
        sortable: true,
        omit: hide.hidePriority,
        extra: "hidePriority",
      },
      {
        name: "ETA Start",
        selector: (row) =>
          new Date(row?.ticket_etastart).toLocaleDateString() || "--",
        sortName: "ticket_etastart",
        sortable: true,
        omit: hide.hideETA,
        extra: "hideETA",
      },

      {
        name: "Status",
        selector: (row) =>
          (
            <Badge color={getStatusColor(row.ticket_status)}>
              {row?.ticket_status}
            </Badge>
          ) || "--",
        sortName: "ticket_status",
        sortable: true,
        omit: hide.hideStatus,
        extra: "hideStatus",
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

  const option = status ? { "status[]": status } : {};

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {props.dashboard ? null : (
            <BreadCrumb title={"Work Orders List"} pageTitle="Work Order" />
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
                      show={tags.includes(CONSTANT.CREATE_WORK_ORDER)}
                      onClick={() => props.history.push("/addWorkOrder")}
                      title={"Add Work Order"}
                    />
                  </Col>
                )}
              </Row>

              {showFilters ? (
                <TableFilters
                  status={true}
                  options={CONSTANT.WORK_ORDER_STATUS}
                  value={filters}
                  handleChange={handleChange}
                />
              ) : null}

              <ReactDataTable
                title={""}
                columns={columns}
                api={(data) =>
                  workOrderList({
                    ...data,
                    ...option,
                  })
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

export default WorkOrderList;
