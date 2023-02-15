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
import { getTrades } from "src/helpers/Vendors";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import FormModal from "src/Components/Common/FormModal";
import AddTrade from "../AddTrade";
import AddIssue from "../AddIssue";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import TableHeaderIcon from "src/Components/Common/TableHeaderIcon";
import TableListHeader from "src/Components/Common/TableHeader";
import TableText from "src/Components/Common/TableText";

const TradeList = (props) => {
  const { tags } = useSelector((state) => state.Login);
  const [edit, setEdit] = useState(false);
  const [editIssue, setEditIssue] = useState(false);

  const [hide, setHide] = useState({
    hideName: false,
    hideIssue: false,
    hideDescription: false,
  });

  const [filterData, setFilterData] = useState("");

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => (
          <TableText>
            {" "}
            <TableLink
              // onClick={() => props.history.push(`/tradeDetails/${row.id}`)}
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
        name: "Description",
        selector: (row) => <TableText>{row?.description || "--"}</TableText>,
        sortName: "description",
        sortable: true,
        omit: hide.hideDescription,
        extra: "hideDescription",
      },
      {
        name: "Issue",
        selector: (row) =>
          (row?.issue && row.issue.length > 0 && (
            <>
              <ul className="list-inline" style={{ marginBottom: 0 }}>
                {row.issue.map((_) => (
                  <li
                    key={_.description}
                    style={{
                      whiteSpace: "unset",
                      overflow: "visible",
                      textOverflow: "ellipsis",
                      marginBottom: 6,
                      marginTop: 8,
                    }}
                    className="list-inline-item"
                  >
                    {/* <Badge
                      key={_.description}
                     
                      color="primary"
                      pill

                    >
                      {_.description || "--"}
                    </Badge> */}
                    <span
                      className="badge badge-soft-dark rounded-pill fs-12"
                      style={{
                        cursor: "pointer",
                        padding: "5px 10px",
                      }}
                    >
                      {_.description || "--"}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )) ||
          "",
        sortName: "classification",
        sortable: false,
        omit: hide.hideIssue,
        extra: "hideIssue",
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

  const toggleModal = () => {
    setEdit((prev) => !prev);
  };

  const toggleIssue = () => {
    setEditIssue((prev) => !prev);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <FormModal open={edit} toggle={toggleModal} title={"Add Trade"}>
          <AddTrade toggle={toggleModal} />
        </FormModal>
        <FormModal open={editIssue} toggle={toggleIssue} title={"Add Issue"}>
          <AddIssue toggle={toggleIssue} />
        </FormModal>
        <Container fluid={true}>
          <BreadCrumb title={"Trades List"} pageTitle="Trades" />

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
                    title={"Add Trade"}
                    show={tags.includes(CONSTANT.ADD_TRADE)}
                    onClick={toggleModal}
                    title2={"Add Issue"}
                    show2={tags.includes(CONSTANT.ADD_TRADE_ISSUE)}
                    onClick2={toggleIssue}
                  />
                </Col>
              </Row>

              <ReactDataTable
                title=""
                columns={columns}
                api={(data) => getTrades(data)}
                filterData={filterData}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TradeList;
