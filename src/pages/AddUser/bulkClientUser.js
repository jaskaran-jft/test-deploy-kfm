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
import {
  importClientUsers,
  fetchClientList,
} from "../../helpers/StoreMethod/store";
import Sample from "../../assets/files/import_client_users_sample.csv";
import { storeUserPayload } from "../AddStore/utils";
import IntlTelInput from "react-intl-tel-input";
import { formatNumber } from "src/helpers/format_helper";
import { withRouter } from "react-router";

createTheme("dark", {
  background: {
    default: "transparent",
  },
});

const BulkStoreUser = (props) => {
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
    // delete newData[Number(row) - 1];
    newData.splice(Number(row) - 1, 1);

    setData(newData);
    validateData(newData);
  };

  const ChangeData = (e, i) => {
    e.preventDefault();
    let value = e.target.value;
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
        name: "First Name *",
        wrap: false,
        minWidth: "250px",
        grow: 3,
        selector: (row) => {
          return editRow === row.id ? (
            <Input
              value={row["First Name"] || row["firstName"]}
              onChange={(e) => ChangeData(e, row.id)}
              name="First Name"
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["First Name"] || row["firstName"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          );
        },
        sortable: true,
      },
      {
        name: "Last Name *",
        minWidth: "250px",
        grow: 3,
        selector: (row) =>
          editRow === row.id ? (
            <Input
              name="Last Name"
              value={row["Last Name"] || row["lastName"]}
              onChange={(e) => ChangeData(e, row.id)}
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Last Name"] || row["lastName"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "E-mail *",
        minWidth: "250px",
        grow: 3,
        selector: (row) =>
          editRow === row.id ? (
            <Input
              name="Username"
              value={row["Username"] || row["username"]}
              onChange={(e) => ChangeData(e, row.id)}
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Username"] || row["username"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "Password *",
        minWidth: "250px",
        grow: 3,
        selector: (row) =>
          editRow === row.id ? (
            <Input
              name="Password"
              type="password"
              value={row["Password"] || row["password"]}
              onChange={(e) => ChangeData(e, row.id)}
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Password"] || row["password"] || (
                <i style={{ color: "silver" }}>Empty</i>
              )}
            </p>
          ),
        sortable: true,
      },
      {
        name: "Is Manager *",
        minWidth: "250px",
        grow: 3,
        selector: (row) =>
          editRow === row.id ? (
            <>
              <Input
                name="Is Manager"
                type="select"
                value={row["Is Manager"] || row["isManager"]}
                onChange={(e) => ChangeData(e, row.id)}
                defaultValue="TRUE"
              >
                {["TRUE", "FALSE"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Input>
            </>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {((row["Is Manager"] || row["isManager"]) === true
                ? "TRUE"
                : "FALSE") || <i style={{ color: "silver" }}>Empty</i>}
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
            <IntlTelInput
              containerClassName="intl-tel-input"
              name="Primary Contact Phone"
              inputClassName={`form-control ${
                (row["Primary Contact Phone"] || row["primaryContactPhone"]) ===
                ""
                  ? "is-invalid"
                  : ""
              }`}
              style={{ width: "100%" }}
              onPhoneNumberChange={(e, value, country) => {
                handlePhoneChange(value, row.id);
              }}
              formatOnInit
              value={row["Primary Contact Phone"] || row["primaryContactPhone"]}
              onlyCountries={["us", "ca", "pr"]}
              defaultCountry={"us"}
              length={10}
              preferredCountries={["us"]}
            />
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
        name: "Ext.",
        minWidth: "100px",

        selector: (row) =>
          editRow === row.id ? (
            <Input
              value={row["Ext."] || row["ext"]}
              onChange={(e) => ChangeData(e, row.id)}
              name="Ext."
            ></Input>
          ) : (
            <p
              onClick={(e) => setEditRow(row.id)}
              style={{ whiteSpace: "normal" }}
            >
              {row["Ext."] || row["ext"] || (
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

      if (!item["First Name"] && !item["firstName"]) {
        Errors.push("First Name is required");
      }

      if (!item["Last Name"] && !item["lastName"]) {
        Errors.push("Last Name is required");
      }

      if (!item["Username"] && !item["username"]) {
        Errors.push("E-mail is required");
      }

      if (!item["Password"] && !item["password"]) {
        Errors.push("Password is required");
      }

      if (!String(item["Is Manager"]) || !String(item["isManager"])) {
        Errors.push("Is Manager is required");
      }

      if (!item["Primary Contact Phone"] && !item["primaryContactPhone"]) {
        Errors.push("Primary Contact Phone is required");
      }

      if (!item["Primary Contact Email"] && !item["primaryContactEmail"]) {
        Errors.push("Primary Contact Email is required");
      }

      //   if (!item["Ext"] && !item["ext"]) {
      //     Errors.push("Ext. is required");
      //   }

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
    fetchClientList()
      .then(async (data) => {
        setClientList(data || []);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  const toggleTab = (tab, value) => {
    if (activeTab === 1) {
      if (!client || !client.name) {
        Notify("Please Select a client", false);
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
        const newData = storeUserPayload(data);
        newData.primaryContactPhone = formatNumber(newData.primaryContactPhone);
        const payload = {
          data: newData,
          clientId: client.id,
        };

        importClientUsers(payload)
          .then((data) => {
            stop = false;
            setactiveTab(tab);
            setPassedSteps(modifiedSteps);
          })
          .catch((error) => {
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
                  <h4 className="card-title mb-0">Add Multiple Brand Users</h4>
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
                            to="#"
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
                                <Input
                                  onChange={(e) => {
                                    console.log({ target: e.target.value });
                                    setClient(JSON.parse(e.target.value));
                                  }}
                                  type="select"
                                  name="clientId"
                                  placeholder="Select Brand *"
                                  className="form-control"
                                >
                                  <option value="">Select Brand</option>
                                  {clientList.length > 0 &&
                                    clientList.map((option) => (
                                      <option
                                        key={option.id}
                                        value={JSON.stringify(option)}
                                      >
                                        {option.name}
                                      </option>
                                    ))}
                                </Input>
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
                                <p>Brand: {client?.name}</p>
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
                                <p>Total Users: {data.length}</p>
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
                              You have Successfully added Brand users
                            </p>
                          </div>
                          <Button
                            type="button"
                            onClick={() =>
                              props.history.push("/clientUserList")
                            }
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

export default withRouter(BulkStoreUser);
