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
  Input,
  Badge,
} from "reactstrap";
import TableLink from "src/Components/Common/TableLink";
import ReactDataTable from "src/Components/Common/reactDataTableComponent";
import { getStoreWorkOrders } from "src/helpers/WorkOrder";
import { getStatusColor } from "src/helpers/format_helper";

const OrdersList = (props) => {
  const [hide, setHide] = useState({
    hideTrackingId: false,
    hideStatus: false,
    hideETA: false,
    hideTrade: false,
  });

  const [filterData, setFilterData] = useState("");

  const columns = useMemo(
    () => [
      {
        name: "Tracking Id",
        selector: (row) => (
          <TableLink
            value={
              <h6 className="text-primary mb-0">
                {" "}
                &nbsp;#{row?.trackingId}&nbsp;
              </h6>
            }
          />
        ),
        sortName: "trackingId",
        sortable: true,
        omit: hide.hideTrackingId,
        extra: "hideTrackingId",
      },
      {
        name: "Vendor",
        selector: (row) =>
          row.ticketVendor.length > 0
            ? row.ticketVendor.map((vendor) => (
                <TableLink
                  key={vendor.id}
                  value={
                    <h6 className="text-primary mb-0">
                      &nbsp;
                      {vendor?.vendor?.user?.firstName +
                        " " +
                        vendor?.vendor?.user?.lastName}
                      &nbsp;
                    </h6>
                  }
                />
              ))
            : "--",
        sortName: "etaStart",
        sortable: true,
        omit: hide.hideETA,
        extra: "hideETA",
      },
      {
        name: "ETA",
        selector: (row) => new Date(row?.etaStart).toLocaleDateString() || "",
        sortName: "etaStart",
        sortable: true,
        omit: hide.hideETA,
        extra: "hideETA",
      },

      {
        name: "Status",
        selector: (row) =>
          <Badge color={getStatusColor(row?.status)}>{row?.status}</Badge> ||
          "",
        sortName: "status",
        sortable: true,
        omit: hide.hideStatus,
        extra: "hideStatus",
      },
      {
        name: "Trade",
        selector: (row) => row?.trade?.name || "--",
        sortName: "name",
        sortable: true,
        omit: hide.hideTrade,
        extra: "hideTrade",
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
                      {" "}
                      <span className="mdi mdi-tune">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
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
                <Col className="col-md-3">
                  <Input
                    placeholder="Search"
                    onKeyUp={(e) => onSearchResources(e)}
                  ></Input>
                </Col>
              </Row>

              <ReactDataTable
                title=""
                columns={columns}
                api={(data) =>
                  getStoreWorkOrders({ ...data, storeId: props.id })
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

export default OrdersList;
