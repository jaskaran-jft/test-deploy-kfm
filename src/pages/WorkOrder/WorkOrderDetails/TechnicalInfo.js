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
import * as yup from "yup";
import { useFormik } from "formik";
import FormModal from "src/Components/Common/FormModal";

import { CONSTANT } from "src/utils/constant";
import { getTradesList } from "src/helpers/Vendors";
import { getRecallDetails, getRecallId } from "src/helpers/WorkRequest";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import { updateWorkOrder } from "src/helpers/WorkOrder";

const TechnicalInfo = (props) => {
  const { data = {} } = props;
  const { trade = {}, client = {} } = data;

  const [activeTab, setActiveTab] = useState("1");
  const [edit, setEdit] = useState(false);
  const { tags = [] } = useSelector((state) => state.Login);
  const [tradeList, setTradeList] = useState([]);
  const [recallList, setRecallList] = useState([]);
  const [loading, setLoading] = useState(false);
  const addWorkRequestObj = useState({
    tradeId: "",
    createdBy: "",
    isRecall: false,
    // recallId: "",
  })[0];

  const validationSchema = yup.object().shape({
    tradeId: yup.string().required("Trade is required"),
    createdBy: yup.string().required("Request by is required"),
    isRecall: yup.boolean().notRequired(),
    recallId: yup.string().when("isRecall", {
      is: true,
      then: yup.string().required(),
    }),
  });

  const validation = useFormik({
    initialValues: addWorkRequestObj,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    fetchTradesList();
    getRecallIds();
  }, []);

  const fetchTradesList = async () => {
    try {
      const response = await getTradesList();
      setTradeList(response);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (data) {
      validation.setFieldValue("createdBy", data.createdBy);
      validation.setFieldValue("isRecall", data.isRecall);
      validation.setFieldValue("tradeId", data?.trade?.id);
      if (data.recallId) {
        validation.setFieldValue("recallId", data.recallId);
        getRecallIds();
      }
    }
  }, [data]);

  const handleSubmit = async (values) => {
    try {
      const form = new FormData();
      Object.entries(values).map((key) => {
        form.append(key[0], key[1]);
        return key;
      });

      form.append("id", data.id);
      const response = await updateWorkOrder(form, true);
      Notify(response.message || "Successfully updated work order", true);
      props.update();
      validation.resetForm();
      setEdit(false);
    } catch (err) {
      console.log({ error: err });
      Notify(err || "Something went wrong!!", false);
      setEdit(false);
      validation.resetForm();
    }
  };

  const getRecallIds = async () => {
    try {
      const response = await getRecallId();
      setRecallList(response);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleIsRecall = (e) => {
    validation.setFieldValue("isRecall", !validation.values.isRecall);
    if (!validation.values.isRecall) {
      getRecallIds();
    }
  };

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleRecallIdChange = async (e) => {
    setLoading(true);
    try {
      validation.setFieldValue("recallId", e.target.value);
      const response = await getRecallDetails(e.target.value);
      validation.setFieldValue("tradeId", response?.trade?.id);
      validation.setFieldValue("createdBy", response.createdBy);
      setLoading(false);
    } catch (error) {
      validation.setFieldValue("recallId", e.target.value);
      setLoading(false);
    }
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
            }}
          >
            <Row>
              <Col md="12">
                <FormGroup style={{ width: "100%" }} className="mb-3">
                  <Label>Is Recall</Label>
                  <Input
                    name="isRecall"
                    placeholder="Is Recall"
                    type="checkbox"
                    className="form-control"
                    onChange={(e) => handleIsRecall(e)}
                    onBlur={validation.handleBlur}
                    checked={validation.values.isRecall || false}
                    value={validation.values.isRecall || false}
                    invalid={
                      validation.touched.isRecall && validation.errors.isRecall
                        ? true
                        : false
                    }
                  />
                  {validation.touched.isRecall && validation.errors.isRecall ? (
                    <FormFeedback type="invalid">
                      {validation.errors.isRecall}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              {validation.values.isRecall && (
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label>Recall Id *</Label>
                    <>
                      <Input
                        type="select"
                        name="recallId"
                        style={{ width: "100%" }}
                        placeholder="Select recall Id *"
                        className="form-control"
                        onChange={(e) => {
                          // validation.setFieldValue("recallId", e.target.value);
                          handleRecallIdChange(e);
                        }}
                        onBlur={validation.handleBlur}
                        value={validation.values?.recallId || ""}
                        invalid={
                          validation.touched?.recallId &&
                          validation.errors?.recallId
                            ? true
                            : false
                        }
                      >
                        <option value="">Select Recall Id *</option>
                        {recallList?.map((option, index) => (
                          <option key={index} value={option.trackingId}>
                            {option.trackingId}
                          </option>
                        ))}
                      </Input>
                      {validation.touched?.recallId &&
                      validation.errors.recallId ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.recallId}
                        </FormFeedback>
                      ) : null}
                    </>
                  </FormGroup>
                </Col>
              )}

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Requested By Person *</Label>
                  <Input
                    name="createdBy"
                    placeholder="Requested Person's Name *"
                    type="text"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.createdBy || ""}
                    invalid={
                      validation.touched.createdBy &&
                      validation.errors.createdBy
                        ? true
                        : false
                    }
                  />
                  {validation.touched.createdBy &&
                  validation.errors.createdBy ? (
                    <FormFeedback type="invalid">
                      {validation.errors.createdBy}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Select Trade *</Label>
                  <>
                    <Input
                      type="select"
                      name="tradeId"
                      placeholder="Select Trade *"
                      className="form-control"
                      disabled={validation.values.isRecall}
                      onChange={(e) => {
                        validation.setFieldValue("tradeId", e.target.value);
                      }}
                      onBlur={validation.handleBlur}
                      value={validation.values?.tradeId || ""}
                      invalid={
                        validation.touched?.tradeId &&
                        validation.errors?.tradeId
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Trade *</option>
                      {tradeList?.map((option, index) => (
                        <option key={index} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Input>
                    {validation.touched?.tradeId &&
                    validation.errors.tradeId ? (
                      <FormFeedback type="invalid">
                        {validation.errors?.tradeId}
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
        <Card style={{ height: "35em" }}>
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
                      ? "text-dark rounded-top p-3 bg-light"
                      : "text-dark p-3"
                  }`}
                  onClick={() => {
                    tabChange("1");
                    if (activeTab !== "1") setEdit(false);
                  }}
                  type="button"
                >
                  Work Order Details
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
                      Created On :{" "}
                      {data.createdAt ? (
                        <h6 className="service_details_text">
                          {new Date(data.createdAt).toLocaleDateString()},&nbsp;
                          {new Date(data.createdAt).toLocaleTimeString()}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Status :{" "}
                      {data.status ? (
                        <h6 className="service_details_text">{data.status}</h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Client Tracking # :{" "}
                      {client.trackingId ? (
                        <h6 className="service_details_text">
                          {client.trackingId}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Requested By :{" "}
                      {data.createdBy ? (
                        <h6 className="service_details_text">
                          {data.createdBy}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Trade :{" "}
                      {trade?.name ? (
                        <h6 className="service_details_text">{trade?.name}</h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Recall :{" "}
                      {data.isRecall ? (
                        <span
                          style={{ fontSize: 18 }}
                          className="mdi mdi-check"
                        ></span>
                      ) : (
                        <span
                          className="mdi mdi-close-circle btn-danger-text"
                          style={{ fontSize: 18 }}
                        ></span>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Rejection Reason :{" "}
                      {data.rejectionReason ? (
                        <h6
                          className="service_details_text"
                          dangerouslySetInnerHTML={{
                            __html: data.rejectionReason,
                          }}
                        />
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

export default TechnicalInfo;
