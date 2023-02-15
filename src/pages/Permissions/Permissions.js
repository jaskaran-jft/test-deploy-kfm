import React, { Fragment, useEffect, useState } from "react";
import Notify from "../../common/Toaster/toast";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Col,
  Collapse,
  Container,
  FormGroup,
  Input,
  Row,
  TabContent,
  Table,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import classnames from "classnames";
import UiContent from "../../Components/Common/UiContent";
import { addPermission, deletePermissions, fetchPermissions } from "./utils";
import { fetchCorporateList } from "../../helpers/StoreMethod/store";
import { CONSTANT } from "src/utils/constant";

const Permissions = () => {
  const [colOpen, setcolOpen] = useState([]);
  const [data, setData] = useState({});
  const [Resources, setResources] = useState([]);
  const [Groups, setGroups] = useState(data.allRoles);
  const [permissionsList, setPermissionsList] = useState({});
  const [filtered, setFiltered] = useState("Select Group");
  const [clientList, setClientList] = useState([]);
  const [enable, setEnable] = useState("Enabled");
  const tenantId = JSON.parse(localStorage.getItem("authUser")).tenantId;
  const t_col1 = (index) => {
    if (!colOpen.includes(index)) setcolOpen([index]);
    else setcolOpen([]);
  };
  const findTenantPermissions = (e) => {
    setData([]);
    setResources([]);
    setGroups([]);
    setPermissionsList([]);
    !e.target.value.match("Select Corporate") && fetchAndSave(e.target.value);
  };
  const fetchAndSave = (tenant) => {
    fetchPermissions(tenant).then((data) => {
      data.allRoutes = data.allRoutes.filter((item) => {
        return item.name.replace(" ", "").length;
      });
      // data.allRoutes = data.allRoutes.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
      setData(data);
      setResources(data.allRoutes);
      setGroups(data.allRoles);
      setPermissionsList(data.permissions);
    });
  };
  useEffect(() => {
    !tenantId &&
      fetchCorporateList().then((data) => {
        setClientList(data);
      });
    tenantId &&
      fetchAndSave(JSON.parse(localStorage.getItem("authUser")).tenantId);
  }, []);

  const findResources = (matchStr) => {
    if (matchStr !== "") {
      const filteredResources =
        data &&
        data.allRoutes &&
        data.allRoutes.filter((value) => {
          if (
            value.name
              .toLowerCase()
              .replace(/ /g, "")
              .match(matchStr.toLowerCase().replace(/ /g, ""))
          )
            return value;
        });
      setResources(filteredResources);
    } else {
      setResources(data.allRoutes || []);
    }
  };
  const findGroups = (matchStr) => {
    matchStr = matchStr.target.value;
    setFiltered(matchStr);
    if (matchStr !== "Select Group") {
      const filteredGroups = data.allRoles.filter((value) => {
        if (
          value.name
            .toLowerCase()
            .replace(/ /g, "")
            .match(matchStr.toLowerCase().replace(/ /g, ""))
        )
          return value;
      });
      setGroups(filteredGroups);
    } else {
      setGroups(data.allRoles);
    }
    return 0;
  };
  const setFunction = (resource, group) => {
    const permission = permissionsList.find((item) => item.id === resource.id);
    if (permission) {
      const groupPermission = permission.role.find(
        (item) => item.id === group.id,
      );
      if (groupPermission) {
        const data = { routeId: resource.id, roleId: group.id };
        deletePermissions(data)
          .then(() => {
            const roles = [];
            permission.role.map((item) => {
              if (item.id !== group.id) roles.push(item);
              return item;
            });
            permission.role = roles;
            const newPermissions = [permission];
            permissionsList.map((item) => {
              if (item.id !== permission.id) newPermissions.push(item);
              return item;
            });
            setPermissionsList(newPermissions);
          })
          .catch((err) => {
            Notify("Something went wrong!", false);
          });
      } else {
        //Add permission
        const groupId = Groups.find((item) => {
          return item.id === group.id;
        });
        addPermission({ routeId: resource.id, roleId: groupId.id })
          .then(() => {
            permission.role.push({
              id: Groups.find((item) => item.id === group.id).id,
              name: group.name,
            });
            const newPermissions = [permission];
            permissionsList.map((item) => {
              if (item.id !== permission.id) newPermissions.push(item);
              return item;
            });
            setPermissionsList(newPermissions);
          })
          .catch((err) => {
            Notify("Something went wrong!", false);
          });
      }
    } else {
      const findRoute = Resources.find((item) => item.id === resource.id);
      const groupId = Groups.find((item) => {
        return item.id === group.id;
      });
      addPermission({ routeId: findRoute.id, roleId: groupId.id })
        .then(() => {
          const data = {
            id: Resources.find((item) => item.id === resource.id).id,
            name: resource.name,
            role: [
              {
                id: Groups.find((item) => item.id === group.id).id,
                name: group.name,
              },
            ],
          };
          const newPermissions = [data];
          permissionsList.map((item) => {
            if (item.id !== data.id) newPermissions.push(item);
            return item;
          });
          setPermissionsList(newPermissions);
        })
        .catch((err) => {
          Notify("Something went wrong!", false);
        })
        .catch((err) => {
          Notify("Something went wrong!", false);
        });
    }
  };

  const onSearchResources = (e, group) => {
    if (group) findGroups(e.target.value);
    else findResources(e.target.value);
  };

  return (
    <div>
      <React.Fragment>
        <UiContent></UiContent>
        <div className="page-content">
          <Container fluid={true}>
            <BreadCrumb title={`Permissions`} pageTitle="Super User" />

            <Row>
              <Col lg={12}>
                <Row className="p-1">
                  {!tenantId && (
                    <Col className="col-md-3">
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        onChange={(e) => findTenantPermissions(e)}
                      >
                        <option value="Select Corporate">
                          Select Corporate
                        </option>
                        {clientList &&
                          clientList.length > 0 &&
                          clientList.map((client) => {
                            return (
                              <option key={client.id} value={client.id}>
                                {client.name}
                              </option>
                            );
                          })}
                      </Input>
                    </Col>
                  )}
                  <Col className="col-md-3">
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => findGroups(e)}
                    >
                      <option value="Select Group">Select Group</option>
                      {data.allRoles &&
                        data.allRoles.length > 0 &&
                        data.allRoles.map((group) => {
                          return (
                            <option key={group.name} value={group.name}>
                              {group.description}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                  <Col className="col-md-3">
                    <Input
                      type="select"
                      name="select"
                      id="enables"
                      value={enable || true}
                      onChange={(e) => setEnable(e.target.value)}
                    >
                      {CONSTANT.PERMISSION_TYPE.map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                  <Col className="col-md-3">
                    <Input
                      placeholder="Search"
                      onKeyUp={(e) => onSearchResources(e)}
                    ></Input>
                  </Col>
                </Row>
                <br />
                <Card>
                  <Accordion id="default-accordion-example" open={true}>
                    {Resources && Resources.length === 0 && (
                      <>
                        <h4 className="p-4">No data found.</h4>
                      </>
                    )}
                    {Resources.length > 0 &&
                      Resources.map((resource, i) => {
                        if (Groups.length > 0) {
                          let isEnabled = false;
                          let isDisabled = false;
                          Groups.map((group) => {
                            // console.log({ permissionsList, group, resource });
                            if (
                              permissionsList.length > 0 &&
                              permissionsList
                                .find((item) => item.id === resource.id)
                                ?.role.some((item) => item.id === group.id)
                            ) {
                              isEnabled = true;
                            } else {
                              isDisabled = true;
                            }

                            return group;
                          });

                          if (
                            (enable === "Disabled" && isDisabled) ||
                            enable === "All" ||
                            (enable === "Enabled" && isEnabled)
                          ) {
                            return (
                              <Fragment key={resource.id}>
                                <AccordionItem key={resource.id}>
                                  <h2
                                    className={`accordion-header ${resource.name}`}
                                    id="headingOne"
                                  >
                                    <button
                                      className={classnames(
                                        "accordion-button",
                                        {
                                          collapsed: !colOpen.includes(i),
                                        },
                                      )}
                                      type="button"
                                      onClick={(e) => t_col1(i)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {resource.name}
                                    </button>
                                  </h2>

                                  <Collapse
                                    isOpen={colOpen.includes(i)}
                                    className="accordion-collapse"
                                    id={resource.id}
                                  >
                                    <div className="accordion-body">
                                      <Row className="text-center">
                                        {Groups.length === 0 && (
                                          <>
                                            <h3 className="p-4">
                                              No data found.
                                            </h3>
                                          </>
                                        )}
                                        {Groups.length > 0 &&
                                          Groups.map((group) => {
                                            return (
                                              <Col
                                                className="col-md-2 border pr-4 mb-2 pt-3 pb-3 text-center shadow shadow-sm"
                                                key={group.description}
                                              >
                                                <Row className="mb-1">
                                                  <Col>{group.description}</Col>
                                                  <Col>
                                                    <FormGroup switch>
                                                      <Input
                                                        type="switch"
                                                        checked={
                                                          permissionsList.length >
                                                            0 &&
                                                          permissionsList
                                                            .find(
                                                              (item) =>
                                                                item.id ===
                                                                resource.id,
                                                            )
                                                            ?.role.some(
                                                              (item) =>
                                                                item.id ===
                                                                group.id,
                                                            )
                                                        }
                                                        onChange={(e) =>
                                                          setFunction(
                                                            resource,
                                                            group,
                                                          )
                                                        }
                                                      />
                                                    </FormGroup>
                                                  </Col>
                                                </Row>
                                              </Col>
                                            );
                                          })}
                                      </Row>
                                    </div>
                                  </Collapse>
                                </AccordionItem>
                              </Fragment>
                            );
                          }
                        }

                        return null;
                      })}
                  </Accordion>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Permissions;
