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
  FormGroup,
  Label,
} from "reactstrap";

import ReactDataTable from "../../Components/Common/reactDataTableComponent";
import { fetchTenantList } from "../../helpers/TenantMethod/tenant";
import TableLink from "src/Components/Common/TableLink";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableListHeader from "src/Components/Common/TableHeader";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableText from "src/Components/Common/TableText";

const ViewCorporate = (props) => {
  const { tags } = useSelector((state) => state.Login);
  const [hide, setHide] = useState({
    hideName: false,
    hideDomainName: false,
    hidePrimaryContactName: false,
    hidePrimaryContactEmail: false,
    hidePrimaryContactPhone: false,
    hideTelephone: true,
  });

  const [filterData, setFilterData] = useState("");

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => (
          <TableText>
            <TableLink
              onClick={() => props.history.push(`/editCorporate/${row.id}`)}
              value={<h6 className="text-primary mb-0">{row?.name || "--"}</h6>}
            />
          </TableText>
        ),
        sortName: "name",
        sortable: true,
        omit: hide.hideName,
        extra: "hideName",
      },
      {
        name: "Domain Name",
        selector: (row) => <TableText>{row?.domainName || "--"}</TableText>,
        sortName: "domainName",
        sortable: true,
        omit: hide.hideDomainName,
        extra: "hideDomainName",
      },
      {
        name: "Primary Contact Name",
        selector: (row) => (
          <TableText>{row?.contact?.primaryContactName || "--"}</TableText>
        ),
        sortName: "primaryContactName",
        sortable: true,
        omit: hide.hidePrimaryContactName,
        extra: "hidePrimaryContactName",
      },
      {
        name: "Primary Contact Email",
        selector: (row) => (
          <TableText>{row?.contact?.primaryContactEmail || "--"}</TableText>
        ),
        sortName: "primaryContactEmail",
        sortable: true,
        omit: hide.hidePrimaryContactEmail,
        extra: "hidePrimaryContactEmail",
      },
      {
        name: "Primary Contact Phone",
        selector: (row) => (
          <TableText>{row?.contact?.primaryContactPhone || "--"}</TableText>
        ),
        sortName: "primaryContactPhone",
        sortable: true,
        omit: hide.hidePrimaryContactPhone,
        extra: "hidePrimaryContactPhone",
      },
      {
        name: "Telephone",
        selector: (row) => (
          <TableText>{row?.contact?.telephone || "--"}</TableText>
        ),
        sortName: "telephone",
        sortable: true,
        omit: hide.hideTelephone,
        extra: "hideTelephone",
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
          <BreadCrumb title={"Corporate List"} pageTitle="Corporates" />
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
                    hideFilters={true}
                    onSearchResources={onSearchResources}
                    show={tags.includes(CONSTANT.ADD_TENANT)}
                    onClick={() => props.history.push("/addCorporate")}
                    title={"Add Corporate"}
                  />
                </Col>
              </Row>

              <ReactDataTable
                title=""
                columns={columns}
                api={(data) => fetchTenantList(data)}
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewCorporate;
