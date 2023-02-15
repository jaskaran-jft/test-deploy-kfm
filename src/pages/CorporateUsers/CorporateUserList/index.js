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
  Button,
} from "reactstrap";
import TableLink from "src/Components/Common/TableLink";
import ReactDataTable from "src/Components/Common/reactDataTableComponent";
import { getTenantUserList } from "src/helpers/TenantMethod/tenant";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { useParams, withRouter } from "react-router";
import { ImpersonateUser } from "src/helpers/Impersonate";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableListHeader from "src/Components/Common/TableHeader";
import TableText from "src/Components/Common/TableText";
import ImpersonateColumn from "src/Components/Common/ImpersonateColumn";
import TableFilters from "src/Components/Common/TableFilters";

const CorporateUserList = (props) => {
  const { id } = useParams();
  const { tags } = useSelector((state) => state.Login);
  const [hide, setHide] = useState({
    hideName: false,
    hideClientName: false,
    hideEmail: false,
    hidePhoneNumber: false,
    hideAction: false,
  });

  const dispatch = useDispatch();
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
    props.history.push(`/tenantUserDetails/${row.userid}`);
  };

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => (
          <TableText>
            {
              <TableLink
                onClick={() => handleView(row)}
                value={
                  <h6 className="text-primary mb-0">
                    {row?.firstname + " " + row?.lastname || "--"}
                  </h6>
                }
              />
            }
          </TableText>
        ),
        sortName: "firstname",
        sortable: true,
        omit: hide.hideName,
        extra: "hideName",
      },

      {
        name: "Corporate Name",
        selector: (row) => <TableText>{row?.tenantname || "--"}</TableText>,
        sortName: "tenantname",
        sortable: true,
        omit: hide.hideClientName,
        extra: "hideClientName",
      },
      {
        name: "E-mail",
        selector: (row) => <TableText>{row?.username || "--"}</TableText>,
        sortName: "username",
        sortable: true,
        omit: hide.hideEmail,
        extra: "hideEmail",
      },
      {
        name: "Phone Number",
        selector: (row) => <TableText>{row?.phone || "--"}</TableText>,
        sortName: "phone",
        sortable: true,
        omit: hide.hidePhoneNumber,
        extra: "hidePhoneNumber",
      },
      tags.includes(CONSTANT.IMPERSONATE_USER) && {
        name: "Action",
        selector: (row) =>
          tags.includes(CONSTANT.IMPERSONATE_USER) ? (
            <ImpersonateColumn
              id={row?.userid}
              ImpersonateUser={ImpersonateUser}
              props={props}
              dispatch={dispatch}
            />
          ) : (
            ""
          ),
        sortName: "phone",
        sortable: false,
        omit: hide.hideAction,
        extra: "hideAction",
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
          <BreadCrumb title={"Corporate Users"} pageTitle="Users" />
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
                    title={"Add Corporate User"}
                    toggle={toggleFilter}
                    show={tags.includes(CONSTANT.ADD_CORPORATE_USER)}
                    onClick={() =>
                      props.history.push({
                        pathname: "/addCorporateUser",
                        search: "",
                        hash: "",
                        state: { type: "Corporate", id: id },
                      })
                    }
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
                  options={CONSTANT.INVOICE_STATUS}
                />
              ) : null}

              <ReactDataTable
                title=""
                columns={columns}
                api={(data) => getTenantUserList(data)}
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CorporateUserList);
