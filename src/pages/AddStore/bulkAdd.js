import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Progress,
  FormGroup,
  Button,
} from "reactstrap";
import Notify from "../../common/Toaster/toast";

import { read, utils } from "xlsx";
import classnames from "classnames";
import UiContent from "../../Components/Common/UiContent";
import { ToastContainer } from "react-toastify";
import DataTable, { createTheme } from "react-data-table-component";
import { fetchClientList, importStores } from "../../helpers/StoreMethod/store";
import Sample from "../../assets/files/import_stores_sample.csv";
import { changeDataFormat } from "./utils";
import { withRouter } from "react-router";

createTheme("dark", {
  background: {
    default: "transparent",
  },
});
const BulkAdd = (props) => {
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [next, setNext] = useState(false);
  const [progressbarvalue, setprogressbarvalue] = useState(0);
  const [editRow, setEditRow] = useState(0);
  const [clientList, setClientList] = useState([]);
  const [client, setClient] = useState({});
  const [errors, setErrors] = useState(null);
  const [prevData, setPrevData] = useState({});
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const onEditSelect = (e, row) => {
    e.preventDefault();
    setEditRow(row);
    setPrevData(data[Number(row) - 1]);
  };
  const onDeleteSelected = (e, row) => {
    const newData = [...data];
    newData.splice(Number(row) - 1, 1);
    // delete newData[Number(row) - 1];
    validateData(newData);
    setData(newData);
  };

  const ChangeData = (e, i) => {
    e.preventDefault();
    let value = e.target.value;
    if (
      e.target.name === "Primary Contact Phone" ||
      e.target.name === "primaryContactPhone"
    ) {
      value = value.toString();
      value = value.replace(/-/g, "");
      value = value.replace("+1 ", "");
      if (value.length > 10) {
        return false;
      }
    }

    const changedRow = data[Number(i) - 1];
    changedRow[e.target.name] = e.target.value;
    const newData = data;
    newData[Number(i) - 1] = changedRow;
    setData([...data]);
    validateData(newData);
  };
  const handlePhoneChange = (value, i) => {
    value = value.toString();
    value = value.replace(/-/g, "");
    value = value.replace("+1 ", "");
    if (value.length > 10) {
      return false;
    }

    const changedRow = data[Number(i) - 1];
    changedRow["Primary Contact Phone"] = value;
    const newData = data;
    newData[Number(i) - 1] = changedRow;
    setData([...data]);
    validateData(newData);
  };
  const getColumns = useCallback(() => {
    return [
      {
        name: "Edit",

        selector: (row) => {
          return editRow !== row.id ? (
            <Row>
              <Col>
                <i
                  onClick={(e) => onEditSelect(e, row.id)}
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="ri ri-edit-fill"
                    style={{ color: "green" }}
                  ></span>
                </i>
              </Col>
              <Col>
                <i
                  onClick={(e) => onDeleteSelected(e, row.id)}
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="ri-delete-bin-7-fill "
                    style={{ color: "red" }}
                  ></span>
                </i>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <i onClick={(e) => setEditRow(0)} style={{ cursor: "pointer" }}>
                  <span
                    className="ri ri-check-fill"
                    style={{ color: "green" }}
                  ></span>
                </i>
              </Col>
            </Row>
          );
        },
        sortable: true,
      },
      {
        name: "Site Name *",
        wrap: false,
        minWidth: "250px",
        grow: 3,
        selector: (row) => {
          return editRow === row.id ? (
            <Input
              value={row["Store Name"] || row["storeName"]}
              onChange={(e) => ChangeData(e, row.id)}
              name="Store Name"
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Store Name"] || row["storeName"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          );
        },
        sortable: true,
      },
      {
        name: "Mall *",
        minWidth: "250px",
        grow: 3,
        selector: (row) =>
          editRow === row.id ? (
            <Input
              name="Mall"
              value={row["Mall"] || row["mall"]}
              onChange={(e) => ChangeData(e, row.id)}
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Mall"] || row["mall"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "Primary Contact Phone *",
        grow: 4,
        minWidth: "250px",

        selector: (row) =>
          editRow === row.id ? (
            <Input
              className=""
              value={row["Primary Contact Phone"] || row["primaryContactPhone"]}
              onChange={(e) => ChangeData(e, row.id)}
              onBlur={(e) =>
                handlePhoneChange(row["Primary Contact Phone"], row.id)
              }
              name="Primary Contact Phone"
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Primary Contact Phone"] || row["primaryContactPhone"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "Primary Contact Email *",
        grow: 4,
        minWidth: "300px",

        selector: (row) =>
          editRow === row.id ? (
            <Input
              value={row["Primary Contact Email"] || row["primaryContactEmail"]}
              onChange={(e) => ChangeData(e, row.id)}
              name="Primary Contact Email"
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Primary Contact Email"] || row["primaryContactEmail"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },

      {
        name: "Address Main *",
        grow: 5,
        minWidth: "300px",

        selector: (row) =>
          editRow === row.id ? (
            <Input
              value={row["Street Adress 1"] || row["streetAddress1"]}
              onChange={(e) => ChangeData(e, row.id)}
              name="Street Address 1"
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Street Address 1"] || row["streetAddress1"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "Street Address 2",
        grow: 5,
        minWidth: "300px",

        selector: (row) =>
          editRow === row.id ? (
            <Input
              value={row["Street Address 2"] || row["streetAddress2"]}
              onChange={(e) => ChangeData(e, row.id)}
              name="Street Address 2"
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Street Address 2"] || row["streetAddress2"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "State *",
        grow: 8,
        minWidth: "200px",

        selector: (row) =>
          editRow === row.id ? (
            <Input
              value={row["State"] || row["state"]}
              onChange={(e) => ChangeData(e, row.id)}
              name="State"
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["State"] || row["state"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "City *",
        grow: 8,
        minWidth: "200px",

        selector: (row) =>
          editRow === row.id ? (
            <Input
              value={row["City"] || row["province"]}
              onChange={(e) => ChangeData(e, row.id)}
              name="City"
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["City"] || row["province"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "Area *",
        grow: 8,
        minWidth: "250px",

        selector: (row) =>
          editRow === row.id ? (
            <Input
              value={row["Area"] || row["place"]}
              onChange={(e) => ChangeData(e, row.id)}
              name="Area"
            ></Input>
          ) : (
            <p onClick={(e) => setEditRow(row.id)}>
              {row["Area"] || row["place"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "Zip Code *",
        grow: 8,
        minWidth: "150px",

        selector: (row) =>
          editRow === row.id ? (
            <Input
              value={row["Zip Code"] || row["zipCode"]}
              onChange={(e) => ChangeData(e, row.id)}
              name="Zip Code"
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Zip Code"] || row["zipCode"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "Errors",
        grow: 8,
        minWidth: "500px",

        selector: (row) => {
          return row.Errors ? (
            <p
              style={{
                background: "silver",
                color: "red",
                wordWrap: "break-word",
                whiteSpace: "normal",
                padding: "1em",
              }}
            >
              <ul>
                {row.Errors.split(",").map((error) => (
                  <li key={error}>{error}</li>
                )) || <i style={{ color: "silver" }}>Empty</i>}
              </ul>
            </p>
          ) : (
            <p>
              <i style={{ color: "silver" }}>Empty</i>
            </p>
          );
        },
        sortable: true,
      },
    ];
  }, [data, editRow]);

  useEffect(() => {
    !!editRow !== "" && setColumns(getColumns());
  }, [editRow, data]);

  useEffect(() => {
    setColumns(getColumns());
  }, [data]);

  const validateData = (arr) => {
    let Error = 0;
    arr.forEach((item, i) => {
      const Errors = [];

      if (!item["Store Name"] && !item["storeName"]) {
        Errors.push("Store Name is required");
      }

      if (!item["Mall"] && !item["mall"]) {
        Errors.push("Mall is required");
      }

      if (!item["Primary Contact Phone"] && !item["primaryContactPhone"]) {
        Errors.push("Primary Contact Phone is required");
      }

      if (!item["Primary Contact Email"] && !item["primaryContactEmail"]) {
        Errors.push("Primary Contact Email is required");
      }

      if (!item["Street Address 1"] && !item["streetAddress1"]) {
        Errors.push("Street Address 1 is required");
      }

      if (!item["Street Address 2"] && !item["streetAddress2"]) {
        Errors.push("Street Address 2 is required");
      }

      if (!item["State"] && !item["state"]) {
        Errors.push("State is required");
      }

      if (!item["City"] && !item["province"]) {
        Errors.push("City is required");
      }

      if (!item["Place"] && !item["place"]) {
        Errors.push("Area is required");
      }

      if (!item["Zip Code"] && !item["zipCode"]) {
        Errors.push("Zip Code is required");
      }

      Error = Errors.length > 0 ? Error + 1 : Error;
      item.Errors = Errors.toString();
      setErrors(Error);
      item.id = i + 1;
    });
  };

  const handleImport = useCallback(
    ($event) => {
      const files = $event.target.files;
      if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const wb = read(event.target.result);
          const sheets = wb.SheetNames;

          if (sheets.length) {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
            validateData(rows);
            setData(rows);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    },
    [data, setData, columns, setColumns],
  );

  useEffect(() => {
    fetchClientList().then((data) => {
      setClientList(data);
    });
  }, []);

  const toggleTab = (tab, value) => {
    if (activeTab === 1) {
      if (!client || !client.name) {
        Notify("Please Select a Brand", false);
        return;
      } else if (errors > 0) {
        Notify("Please upload a valid file", false);
        return;
      }
    }

    if (errors > 0 && activeTab === 2) {
      Notify("Please fix all errors before submitting!", false);
      return;
    }

    setNext(!next);
    if (activeTab !== tab) {
      let stop = false;
      if (activeTab === 2) {
        stop = true;
        const newData = changeDataFormat(data);
        const payload = {
          data: newData,
          clientId: client.id,
        };
        importStores(payload)
          .then((data) => {
            stop = false;
            setactiveTab(tab);
            setPassedSteps(modifiedSteps);
          })
          .catch((error) => {
            console.log({ error });
            Notify(error, false);
          });
      }
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4 && !stop) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
    setprogressbarvalue(value);
  };

  const onChangeFile = (e) => {
    if (!e.target.files[0].name.match(/.csv/)) {
      Notify("Please Upload a CSV file", false);
      e.target.value = null;
      return;
    }
    if (e.target.files[0]) setNext(true);
    handleImport(e);
  };

  return (
    <React.Fragment>
      <ToastContainer closeOnClick></ToastContainer>
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Add Multiple Sites</h4>
                </CardHeader>
                <CardBody className="form-steps">
                  <Form action="#">
                    <div className="progress-nav mb-4 p-5">
                      <Progress
                        value={progressbarvalue}
                        style={{ height: "1px" }}
                      />

                      <Nav
                        className="nav-pills progress-bar-tab custom-nav"
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            id="pills-gen-info-tab"
                            className={classnames(
                              {
                                active: activeTab === 1,
                                done: activeTab <= 4 && activeTab >= 0,
                              },
                              "rounded-pill",
                            )}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleTab(1, 0);
                            }}
                            tag="button"
                          >
                            1
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            id="pills-gen-info-tab"
                            className={classnames(
                              {
                                active: activeTab === 2,
                                done: activeTab <= 4 && activeTab > 1,
                              },
                              "rounded-pill",
                            )}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("tab2");
                            }}
                            tag="button"
                          >
                            2
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            id="pills-gen-info-tab"
                            className={classnames(
                              {
                                active: activeTab === 3,
                                done: activeTab <= 4 && activeTab > 2,
                              },
                              "rounded-pill",
                            )}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("tab3");
                            }}
                            tag="button"
                          >
                            3
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>

                    <TabContent activeTab={activeTab}>
                      <TabPane id="steparrow-description-info" tabId={1}>
                        <Container>
                        <Row
                            className="w-full rounded p-5 mb-4 text-light bg-primary"
                            style={{
                              // backgroundColor: "#002366",
                              opacity: "80%",
                            }}
                          >
                            <Col>
                              <Row>
                                <Col>
                                  This form accepts a CSV file in following
                                  format:
                                </Col>{" "}
                              </Row>{" "}
                              <Row>
                                <Col>
                                  <a
                                    href={Sample}
                                    target="_blank"
                                    className="ml-2 text-light"
                                    rel="noreferrer"
                                    download
                                  >
                                    Sample.csv
                                  </a>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="3">
                              <FormGroup className="mb-3">
                                <Label>Brand *</Label>

                                <>
                                  <Input
                                    onChange={(e) =>
                                      setClient(JSON.parse(e.target.value))
                                    }
                                    type="select"
                                    name="clientId"
                                    placeholder="Select Brand *"
                                    className="form-control"
                                  >
                                    <option value="">Select Brand *</option>
                                    {clientList.map((option) => (
                                      <option
                                        key={option.id}
                                        value={JSON.stringify(option)}
                                      >
                                        {option.name}
                                      </option>
                                    ))}
                                  </Input>
                                </>
                              </FormGroup>
                            </Col>
                            <Col>
                              <div
                                className="mb-5"
                                style={{ justifyContent: "center" }}
                              >
                                <Label
                                  htmlFor="formFile"
                                  className="form-label"
                                >
                                  Upload File
                                </Label>
                                <Input
                                  className="form-control"
                                  type="file"
                                  id="formFile"
                                  name="excel"
                                  onChange={(e) => onChangeFile(e)}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Container>
                        <div className="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            className="btn btn-success btn-label right ms-auto nexttab nexttab"
                            disabled={!next}
                            onClick={() => {
                              toggleTab(activeTab + 1);
                            }}
                          >
                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                            Next
                          </button>
                        </div>
                      </TabPane>

                      <TabPane tabId={2}>
                        <Row className="mr-2 ml-2 p-2">
                          <Col className="p-4 mr-2 ml-2 text-center border shadow-sm">
                            <Row>
                              <Col>
                                <p>Brand: {client.name}</p>
                              </Col>
                            </Row>
                          </Col>
                          <Col className="p-4 mr-2 ml-2  text-center border shadow-sm">
                            <Row>
                              <Col>
                                <p>
                                  All Rows Checked:{" "}
                                  {!errors ? "Success" : "Error"}
                                </p>
                              </Col>
                            </Row>
                          </Col>
                          <Col className="p-4 mr-2 ml-2  text-center border shadow-sm">
                            <Row>
                              <Col>
                                <p>Total Stores: {data.length}</p>
                              </Col>
                            </Row>
                          </Col>

                          <Col className="p-4 mr-2 ml-2 bg-danger text-light text-center border shadow-sm">
                            <Row>
                              <Col>
                                <p>Errors: {errors ? errors : 0}</p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <DataTable
                          style={{ width: "90%", scrollX: "auto" }}
                          direction="auto"
                          onColumnOrderChange={(cols) => console.log(cols)}
                          columns={columns}
                          data={data}
                          pagination
                          responsive
                        />

                        <div className="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            className="btn btn-success btn-label right ms-auto nexttab nexttab"
                            onClick={() => {
                              toggleTab(activeTab + 1, 100);
                            }}
                          >
                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                            Submit
                          </button>
                        </div>
                      </TabPane>

                      <TabPane tabId={3}>
                        <div>
                          <div className="text-center">
                            <div className="mb-4">
                              <lord-icon
                                src="https://cdn.lordicon.com/lupuorrc.json"
                                trigger="loop"
                                colors="primary:#0ab39c,secondary:#405189"
                                style={{ width: "120px", height: "120px" }}
                              ></lord-icon>
                            </div>
                            <h5>Well Done !</h5>
                            <p className="text-muted">
                              You have Successfully Added users
                            </p>
                          </div>
                          <Button
                            type="button"
                            onClick={() => props.history.push("/viewClient")}
                            color='primary'
                          >
                            Go Back
                          </Button>
                        </div>
                      </TabPane>
                    </TabContent>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(BulkAdd);
