import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import * as yup from "yup";
import { useFormik } from "formik";
import FormModal from "src/Components/Common/FormModal";
import Loading from "src/common/Loader";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { updateTradeIssue } from "src/helpers/Vendors";
import Notify from "src/common/Toaster/toast";

const Info = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [edit, setEdit] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const [loading, setLoading] = useState(false);
  const { details = {} } = props;

  const validationSchema = yup.object({
    name: yup.string().required("Name is required field"),
    description: yup.string().notRequired(),
  });

  const validation = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await updateTradeIssue(values, details.id);
      Notify(response.message, true);
      props.update();
      setLoading(true);
    } catch (error) {
      Notify(error, false);
      setLoading(false);
    }
  };

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const toggleEdit = () => {
    validation.setFieldValue("name", details.name);
    validation.setFieldValue("description", details.description);
    setEdit(true);
  };

  return (
    <React.Fragment>
      <FormModal
        title={`Edit Trade Details`}
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
              validation.handleSubmit();
            }}
          >
            <Row>
              <Col md="3">
                <FormGroup className="mb-3">
                  <Label>Name *</Label>
                  <>
                    <Input
                      name="name"
                      placeholder="Enter Name *"
                      type="text"
                      className="form-control"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.name || ""}
                      invalid={
                        validation.touched.name && validation.errors.name
                          ? true
                          : false
                      }
                    />
                    {validation.touched.name && validation.errors.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup className="mb-3">
                  <Label>Description</Label>
                  <>
                    <Input
                      name="description"
                      placeholder="Enter Description"
                      type="text"
                      className="form-control"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.description || ""}
                      invalid={
                        validation.touched.description &&
                        validation.errors.description
                          ? true
                          : false
                      }
                    />
                    {validation.touched.description &&
                    validation.errors.description ? (
                      <FormFeedback type="invalid">
                        {validation.errors.description}
                      </FormFeedback>
                    ) : null}
                  </>
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex flex-md-row justify-content-end">
              <Button color="primary" type="submit" style={{ marginRight: 20 }}>
                Save
              </Button>
              <Button
                color="danger"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(false);
                  validation.resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </FormModal>
      <Col>
        <Card style={{ height: "auto" }}>
          <CardHeader>
            <Row>
              <Nav
                className="nav-tabs-custom rounded card-header-tabs border-bottom-0 p-2"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    to="#"
                    className={`p-2 ${
                      activeTab === "1"
                        ? "text-dark rounded-top p-3 bg-light"
                        : "text-dark p-3"
                    }`}
                    onClick={() => {
                      tabChange("1");
                    }}
                    type="button"
                  >
                    Trade Details
                  </NavLink>
                </NavItem>
                {tags.includes(CONSTANT.UPDATE_TRADE_ISSUE) && (
                  <NavItem className="float-end">
                    <NavLink
                      to="#"
                      className={`p-2 text-dark p-3`}
                      onClick={toggleEdit}
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
            </Row>
          </CardHeader>
          <CardBody className="p-4 bg-light" style={{ overflowY: "hidden" }}>
            <TabContent activeTab={activeTab} className="pt-2">
              <TabPane tabId="1">
                <Form>
                  <Row>
                    <p>
                      Name :{" "}
                      {details.name ? (
                        <h6 className="service_details_text">{details.name}</h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Description :{" "}
                      {details.description ? (
                        <h6 className="service_details_text">
                          {details.description}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
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

export default Info;
