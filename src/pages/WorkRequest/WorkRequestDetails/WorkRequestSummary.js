import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  Form,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import DragAndDropFile from "src/Components/Common/DragAndDropFile";
import FormModal from "src/Components/Common/FormModal";
import Loading from "src/common/Loader";
import Notify from "src/common/Toaster/toast";
import { updateWorkRequest } from "src/helpers/WorkRequest";

import { CONSTANT } from "src/utils/constant";
const WorkRequestSummary = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tags } = useSelector((state) => state.Login);

  const { data = {} } = props;
  const { resourceFiles = [{}] } = data;

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleFileDelete = (e, index) => {
    e.preventDefault();
    setFiles((prev) => {
      const data = prev;
      data.splice(index, 1);
      return [...data];
    });
  };

  const handleFile = (file) => {
    console.log({ file });
    setFiles((prev) => [...prev, ...file]);
  };

  const handleFileSave = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("id", data.id);

      for (let i = 0; i < files.length; i++) {
        form.append("files", files[i]);
      }

      const response = await props.api(form, true);
      Notify(response.message || "Successfully updated", true);
      props.update();
      handleEdit();
      setLoading(false);
    } catch (error) {
      Notify(error || "Something went wrong!!", false);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <FormModal
        title={`Edit Work ${props.work ? "Order" : "Request"} #${
          data.trackingId
        }`}
        toggle={handleEdit}
        open={edit}
        showFooter={false}
      >
        {loading ? (
          <Loading />
        ) : (
          <Form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              handleFileSave();
            }}
          >
            <Row>
              <Col md="12">
                <div className="mb-3">
                  <DragAndDropFile
                    multiple={true}
                    accept=".jpg, .jpeg, .png, .pdf, .mp4"
                    handleFile={handleFile}
                  />
                </div>
              </Col>
              {files.length > 0 && (
                <Col md="12">
                  <div className="mb-3 file-list-container">
                    <CardGroup
                      style={{
                        flexWrap: "nowrap",
                        overflowX: "scroll",
                        overflowY: "hidden",
                      }}
                    >
                      {files.map((file, index) => (
                        <Card
                          style={{
                            flexBasis: "200px",
                            marginRight: 15,
                            marginLeft: index === 0 ? "3rem" : 0,
                          }}
                          key={index}
                        >
                          <CardImg
                            alt="file image"
                            src={URL.createObjectURL(file)}
                            top
                            width="100%"
                            style={{
                              height: "12rem",
                              width: "200px",
                              objectFit: "fill",
                              cursor: "pointer",
                              alignSelf: "center",
                            }}
                            onClick={() => {
                              window
                                .open(URL.createObjectURL(file), "_blank")
                                .focus();
                            }}
                          />
                          <CardBody>
                            <CardTitle
                              style={{
                                overflow: "hidden",
                                width: "200px",
                              }}
                              tag="h5"
                            >
                              {file.fileName}
                            </CardTitle>
                            <Button
                              type="button"
                              className="btn btn-danger"
                              onClick={(e) => handleFileDelete(e, index)}
                            >
                              Delete
                            </Button>
                          </CardBody>
                        </Card>
                      ))}
                    </CardGroup>
                  </div>
                </Col>
              )}
            </Row>

            <div className="d-flex flex-md-row justify-content-between">
              <Button color="primary" type="submit">
                Add file
              </Button>
            </div>
          </Form>
        )}
      </FormModal>
      <Col>
        <Card style={{ height: "auto" }}>
          <CardHeader>
            <Nav
              className="nav-tabs-custom rounded card-header-tabs border-bottom-0 p-2"
              role="tablist"
            >
              <NavItem>
                <NavLink
                  to="#"
                  className={`p-2 ${
                    activeTab === "1"
                      ? "bg-light text-dark rounded-top p-3"
                      : "text-dark p-3"
                  }`}
                  onClick={() => {
                    tabChange("1");
                    if (activeTab !== "1") setEdit(false);
                  }}
                  type="button"
                >
                  Files
                </NavLink>
              </NavItem>
              {tags.includes(CONSTANT.EDIT_WORK_REQUEST_DETAILS) &&
                data.status !== CONSTANT.REJECTED &&
                !edit && (
                  <NavItem className="float-end">
                    <NavLink
                      to="#"
                      className={`p-2 text-dark p-3`}
                      onClick={handleEdit}
                      type="button"
                    >
                      <i
                        style={{ fontSize: 18 }}
                        className="mdi mdi-pencil"
                      ></i>
                    </NavLink>
                  </NavItem>
                )}
            </Nav>
          </CardHeader>
          <CardBody className="p-4 bg-light" style={{ overflowY: "hidden" }}>
            <TabContent activeTab={activeTab} className="pt-2">
              <TabPane tabId="1">
                <Form>
                  <Row>
                    {resourceFiles.length > 0 ? (
                      <Col md="12">
                        <div className="mb-3 file-list-container">
                          <CardGroup
                            style={{
                              flexWrap: "nowrap",
                              overflowX: "scroll",
                              overflowY: "hidden",
                            }}
                          >
                            {resourceFiles.map((file, index) => (
                              <Card
                                style={{
                                  flexBasis: "200px",
                                  marginRight: 15,
                                  marginLeft: index === 0 ? "3rem" : 0,
                                }}
                                key={index}
                              >
                                <CardImg
                                  alt="file image"
                                  src={file.url}
                                  top
                                  width="100%"
                                  style={{
                                    height: "12rem",
                                    width: "200px",
                                    objectFit: "fill",
                                    cursor: "pointer",
                                    alignSelf: "center",
                                  }}
                                  onClick={() => {
                                    window.open(file.url, "_blank").focus();
                                  }}
                                />
                                <CardBody>
                                  <CardTitle
                                    style={{
                                      overflow: "hidden",
                                      width: "200px",
                                    }}
                                    tag="h5"
                                  >
                                    {file.name}
                                  </CardTitle>
                                </CardBody>
                              </Card>
                            ))}
                          </CardGroup>
                        </div>
                      </Col>
                    ) : (
                      <p>No files found</p>
                    )}
                  </Row>
                </Form>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default WorkRequestSummary;
