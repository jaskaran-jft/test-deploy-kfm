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
} from "reactstrap";

import ReactDataTable from "../../Components/Common/reactDataTableComponent";
import { fetchAllStore } from "../../helpers/StoreMethod/store";
import TableLink from "src/Components/Common/TableLink";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import TableListHeader from "src/Components/Common/TableHeader";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableText from "src/Components/Common/TableText";
import TableFilters from "src/Components/Common/TableFilters";

const ViewStore = (props) => {
  const { tags } = useSelector((state) => state.Login);
  const [hide, setHide] = useState({
    hideStoreName: false,
    hideMall: false,
    hideClientName: false,
    hidePrimaryContactEmail: false,
    hidePrimaryContactPhone: false,
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

  const columns = useMemo(
    () => [
      {
        name: "Site Name",
        selector: (row) => (
          <TableText>
            <TableLink
              onClick={() => props.history.push(`/editStore/${row.id}`)}
              value={
                <h6 className="text-primary mb-0">{row?.storeName || "--"}</h6>
              }
            />
          </TableText>
        ),
        sortName: "storeName",
        sortable: true,
        omit: hide.hideStoreName,
        extra: "hideStoreName",
      },
      {
        name: "Mall",
        selector: (row) => <TableText>{row?.mall || "--"}</TableText>,
        sortName: "mall",
        sortable: true,
        omit: hide.hideMall,
        extra: "hideMall",
      },
      {
        name: "Client Name",
        selector: (row) => <TableText>{row?.client?.name || "--"}</TableText>,
        sortName: "clientName",
        sortable: true,
        omit: hide.hideClientName,
        extra: "hideClientName",
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
        sortName: "primaryContactPhone",
        selector: (row) => (
          <TableText>{row?.contact?.primaryContactPhone || "--"}</TableText>
        ),
        sortable: true,
        omit: hide.hidePrimaryContactPhone,
        extra: "hidePrimaryContactPhone",
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
          <BreadCrumb title={"Sites List"} pageTitle="Sites" />
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
                    title={"Add Site"}
                    show={tags.includes(CONSTANT.ADD_STORE)}
                    onClick={() => props.history.push("/addStore")}
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
                api={(data) => fetchAllStore(data)}
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewStore;
