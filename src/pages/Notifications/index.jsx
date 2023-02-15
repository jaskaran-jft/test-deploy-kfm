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
} from "reactstrap";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableListHeader from "src/Components/Common/TableHeader";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableLink from "src/Components/Common/TableLink";
import TableText from "src/Components/Common/TableText";
import ReactDataTable from "src/Components/Common/reactDataTableComponent";
import { getNotifications } from "src/helpers/AuthLogin/auth";
import { getStatusColor } from "src/helpers/format_helper";

const Notifications = (props) => {
  const { userData = {} } = useSelector((state) => state.Login);
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

  const columns = useMemo(
    () => [
      {
        name: "Created At",
        selector: (row) => (
          <TableLink
            value={new Date(row?.createdAt).toLocaleDateString() || "--"}
          />
        ),
        sortName: "ticket_createdat",
        sortable: true,
        omit: hide.hideCreatedAt,
        extra: "hideCreatedAt",
      },
      {
        name: "Message",
        selector: (row) => (
          <TableText>This is a notification message by user</TableText>
        ),
        sortName: "ticket_createdat",
        sortable: true,
        omit: hide.hideCreatedAt,
        extra: "hideCreatedAt",
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
          <BreadCrumb title={"Notifications List"} pageTitle="Notifications" />
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
                  <TableListHeader onSearchResources={onSearchResources} />
                </Col>
              </Row>

              <ReactDataTable
                title=""
                columns={columns}
                api={(data) =>
                  getNotifications({ ...data, id: userData?.userId })
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

export default Notifications;
