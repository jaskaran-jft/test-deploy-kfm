import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { string, object, number, date } from "yup";
import { useFormik } from "formik";
import FormModal from "src/Components/Common/FormModal";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CONSTANT } from "src/utils/constant";
import { getPriorityList } from "src/helpers/WorkRequest";
import Notify from "src/common/Toaster/toast";
import { getDateTime } from "src/helpers/format_helper";
import { updateWorkOrder } from "src/helpers/WorkOrder";
import Loading from "src/common/Loader";

const WorkOrderPayDetail = (props) => {
  const { data = {} } = props;

  const [activeTab, setActiveTab] = useState("1");
  const [edit, setEdit] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [priorityList, setPriorityList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tags = [] } = useSelector((state) => state.Login);
  const payDetailSchema = useState({
    description: "",
    priority: "",
    etaStart: getDateTime(),
    nte: 0,
  })[0];

  const validationSchema = object().shape({
    description: string().required(),
    priority: string().required(),
    nte: number().required(),
    etaStart: date().required("ETA is required"),
  });

  const validation = useFormik({
    initialValues: payDetailSchema,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    fetchPriorityList();
  }, []);

  const fetchPriorityList = async () => {
    try {
      const response = await getPriorityList();
      setPriorityList(response);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (data) {
      validation.setFieldValue("description", data.description);
      validation.setFieldValue("priority", data.priority);
      validation.setFieldValue("etaStart", getDateTime(data.etaStart));
      validation.setFieldValue("nte", data.nte);
    }
  }, [data]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(values).map((key) => {
        form.append(key[0], key[1]);
        return key;
      });

      form.append("id", data.id);
      const response = await updateWorkOrder(form, true);
      Notify(response.message || "Successfully updated work order", true);
      setLoading(false);
      props.update();
      handleEdit();
    } catch (err) {
      Notify(err || "Something went wrong!!", false);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <React.Fragment>
      <FormModal
        title={`Edit Work Order #${data.trackingId}`}
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
              setHasSubmit(true);
            }}
          >
            <Row>
              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Select Priority *</Label>
                  <>
                    <Input
                      type="select"
                      name="priority"
                      placeholder="Select Priority *"
                      className="form-control"
                      onChange={(e) => {
                        validation.setFieldValue("priority", e.target.value);
                      }}
                      onBlur={validation.handleBlur}
                      value={validation.values?.priority || ""}
                      invalid={
                        validation.touched?.priority &&
                        validation.errors?.priority
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Priority *</option>
                      {priorityList?.map((option, index) => (
                        <option key={index} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </Input>
                    {validation.touched?.priority &&
                    validation.errors.priority ? (
                      <FormFeedback type="invalid">
                        {validation.errors?.priority}
                      </FormFeedback>
                    ) : null}
                  </>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>NTE *</Label>
                  <Input
                    name="nte"
                    placeholder="NTE *"
                    type="number"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.nte || ""}
                    invalid={
                      validation.touched.nte && validation.errors.nte
                        ? true
                        : false
                    }
                  />
                  {validation.touched.nte && validation.errors.nte ? (
                    <FormFeedback type="invalid">
                      {validation.errors.nte}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Estimate Time of Arrival *</Label>
                  <Input
                    name="etaStart"
                    placeholder="Estimate Time of Arrival *"
                    type="datetime-local"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.etaStart || ""}
                    invalid={
                      validation.touched.etaStart && validation.errors.etaStart
                        ? true
                        : false
                    }
                  />
                  {validation.touched.etaStart && validation.errors.etaStart ? (
                    <FormFeedback type="invalid">
                      {validation.errors.etaStart}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup className="mb-3">
                  <Label>Description *</Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={validation.values.description || ""}
                    name="description"
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      validation.setFieldValue("description", data);
                    }}
                    onBlur={(event, editor) => {
                      validation.handleBlur();
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                  {hasSubmit && validation.values.description.length === 0 ? (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      Description is required field
                    </div>
                  ) : null}
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
                  Work Order Summary
                </NavLink>
              </NavItem>
              {tags.includes(CONSTANT.EDIT_WORK_ORDER) &&
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
                    <p>
                      Description :{" "}
                      {data.description ? (
                        <h6
                          className="service_details_text"
                          dangerouslySetInnerHTML={{ __html: data.description }}
                        ></h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Priority :{" "}
                      {data.priority ? (
                        <h6 className="service_details_text">
                          {data.priority}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Original ETA :{" "}
                      {data.etaStart ? (
                        <h6 className="service_details_text">
                          {new Date(data.etaStart).toLocaleDateString()}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Original NTE :{" "}
                      {data.originalNte ? (
                        <h6 className="service_details_text">
                          {data.originalNte}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      NTE :{" "}
                      {data.nte ? (
                        <h6 className="service_details_text">${data.nte}</h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Complete Date :{" "}
                      {data.completionDate ? (
                        <h6 className="service_details_text">
                          {data.completionDate}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
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

export default WorkOrderPayDetail;
