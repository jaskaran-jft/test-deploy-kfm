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
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import TableLink from "src/Components/Common/TableLink";
import ReactDataTable from "src/Components/Common/reactDataTableComponent";
import { getVendorList } from "src/helpers/Vendors";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { ImpersonateUser } from "src/helpers/Impersonate";
import { withRouter } from "react-router-dom";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableListHeader from "src/Components/Common/TableHeader";
import TableText from "src/Components/Common/TableText";
import ImpersonateColumn from "src/Components/Common/ImpersonateColumn";
import TableFilters from "src/Components/Common/TableFilters";

const VendorList = (props) => {
  const { tags } = useSelector((state) => state.Login);

  const [hide, setHide] = useState({
    hideName: false,
    hideBusinessName: false,
    hideCity: false,
    hideState: false,
    hideTrades: false,
    hideEmail: false,
    hidePhoneNumber: true,
    hideW9: true,
    hideGeneralInsurance: true,
    hideWorkmanInsurance: true,
    hidePrimaryContractOnFile: true,
    hideAction: false,
  });

  const [filterData, setFilterData] = useState("");
  const dispatch = useDispatch();
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
    props.history.push(`/vendorDetail/${row.id}`);
  };

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => (
          <TableText>
            <TableLink
              onClick={() => handleView(row)}
              value={
                <h6 className="text-primary mb-0">
                  {row?.user?.firstName + " " + row?.user?.lastName || "--"}
                </h6>
              }
            />
          </TableText>
        ),
        sortName: "firstName",
        sortable: true,
        omit: hide.hideName,
        extra: "hideName",
      },
      {
        name: "Business Name",
        selector: (row) => <TableText>{row?.businessName || "--"}</TableText>,
        sortName: "businessName",
        sortable: true,
        omit: hide.hideBusinessName,
        extra: "hideBusinessName",
      },
      {
        name: "City",
        selector: (row) => (
          <TableText>{row?.address[0]?.province || "--"}</TableText>
        ),
        sortName: "province",
        sortable: true,
        omit: hide.hideCity,
        extra: "hideCity",
      },
      {
        name: "State",
        selector: (row) => (
          <TableText>{row?.address[0]?.state || "--"}</TableText>
        ),
        sortName: "state",
        sortable: true,
        omit: hide.hideState,
        extra: "hideState",
      },
      {
        name: "Trades",
        selector: (row) => (
          <div
            className="custom_trades"
            ref={(node) => {
              if (node) {
                node.style.setProperty("overflow", "hidden", "important");
                node.style.setProperty("white-space", "nowrap", "important");
              }
            }}
          >
            {row?.trades.length > 0
              ? row.trades.map((trade, index) => (
                  <Fragment key={index}>
                    {index !== 0 && index !== row.trades.length ? ", " : ""}{" "}
                    {trade.name}
                  </Fragment>
                ))
              : "--"}
          </div>
        ),
        sortName: "trades",
        sortable: false,
        omit: hide.hideTrades,
        extra: "hideTrades",
      },
      {
        name: "E-mail",
        selector: (row) => <TableText>{row?.user?.username || "--"}</TableText>,
        sortName: "username",
        sortable: true,
        omit: hide.hideEmail,
        extra: "hideEmail",
      },
      {
        name: "Phone Number",
        selector: (row) => <TableText>{row?.businessPhone || "--"}</TableText>,
        sortName: "businessPhone",
        sortable: true,
        omit: hide.hidePhoneNumber,
        extra: "hidePhoneNumber",
      },
      {
        name: "W9",
        selector: (row) => <TableText>{row?.w9 || "--"}</TableText>,
        sortName: "w9",
        sortable: true,
        omit: hide.hideW9,
        extra: "hideW9",
      },
      {
        name: "General Insurance",
        selector: (row) => (
          <TableText>{row?.generalInsurance || "--"}</TableText>
        ),
        sortName: "generalInsurance",
        sortable: true,
        omit: hide.hideGeneralInsurance,
        extra: "hideGeneralInsurance",
      },
      {
        name: "Workman Insurance",
        selector: (row) => (
          <TableText>{row?.workmanInsurance || "--"}</TableText>
        ),
        sortName: "dialInNumber",
        sortable: true,
        omit: hide.hideWorkmanInsurance,
        extra: "hideWorkmanInsurance",
      },
      tags.includes(CONSTANT.IMPERSONATE_USER) && {
        name: "Action",
        selector: (row) =>
          tags.includes(CONSTANT.IMPERSONATE_USER) ? (
            <ImpersonateColumn
              id={row?.user?.id}
              ImpersonateUser={ImpersonateUser}
              props={props}
              dispatch={dispatch}
            />
          ) : (
            ""
          ),
        sortName: "impersonate",
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
          <BreadCrumb title={"Vendors List"} pageTitle="Vendor" />

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
                      {columns.map((column, index) => (
                        <DropdownItem key={index} toggle={false}>
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
                    title={"Add Vendor"}
                    show={tags.includes(CONSTANT.ADD_VENDOR)}
                    onClick={() => props.history.push("/addVendor")}
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
                api={(data) => getVendorList(data)}
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(VendorList);
