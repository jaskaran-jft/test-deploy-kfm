import React, { useEffect, useState } from "react";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import UiContent from "src/Components/Common/UiContent";
// import "react-intl-tel-input/dist/main.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import Notify from "src/common/Toaster/toast";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { fetchStoreDropdown } from "src/helpers/StoreMethod/store";
import { getTradesList } from "src/helpers/Vendors";
import {
  getIssueList,
  getPriorityList,
  getRecallDetails,
  getRecallId,
} from "src/helpers/WorkRequest";
import {
  addWorkOrder,
  getClientList,
  getStoreList,
  getTenantList,
} from "src/helpers/WorkOrder";
import { getDateTime } from "src/helpers/format_helper";
import Loading from "src/common/Loader";

const AddWorkOrder = (props) => {
  const { tags = [], userData = {} } = useSelector((state) => state.Login);
  const [storeList, setStoreList] = useState([]);
  const [tradeList, setTradeList] = useState([]);
  const [recallList, setRecallList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [issueList, setIssueList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);
  const addWorkOrderObj = useState({
    storeId: "",
    tenantId: "",
    clientId: "",
    tradeId: "",
    createdBy: "",
    description: "",
    isRecall: false,
    priority: "",
    issueId: "",
    nte: 0,
    etaStart: getDateTime(),
  })[0];

  const _schema = {
    storeId: !tags.includes(CONSTANT.GET_STORE_DROPDOWN)
      ? yup.string().notRequired()
      : yup.string().required("Store is required"),
    tenantId: !tags.includes(CONSTANT.GET_TENANT_DROPDOWN)
      ? yup.string().notRequired()
      : yup.string().required("Corporate is required"),
    clientId: !tags.includes(CONSTANT.GET_CLIENT_DROPDOWN)
      ? yup.string().notRequired()
      : yup.string().required("Brand is required"),
  };

  const validationSchema = yup.object().shape({
    ..._schema,
    tradeId: yup.string().required("Trade is required"),
    createdBy: yup.string().required("Requested by is required"),
    description: yup.string().required("Description is required"),
    priority: yup.string().required("Priority is required"),
    issueId: yup.string().required("Issue is required"),
    nte: yup.number().required("NTE is required"),
    etaStart: yup.date().required("ETA is required"),
    isRecall: yup.boolean().notRequired(),
    recallId: yup.string().when("isRecall", {
      is: true,
      then: yup.string().required(),
    }),
  });

  const validation = useFormik({
    initialValues: addWorkOrderObj,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    fetchTradesList();
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
    if (tags.includes(CONSTANT.GET_TENANT_DROPDOWN)) {
      fetchTenantList();
    } else if (tags.includes(CONSTANT.GET_CLIENT_DROPDOWN)) {
      fetchClientsList();
    } else if (tags.includes(CONSTANT.GET_STORE_DROPDOWN)) {
      fetchStores();
    } else {
      validation.setFieldValue("storeId", userData.storeId);
    }
  }, [tags]);

  const fetchTradesList = async () => {
    try {
      const response = await getTradesList();
      setTradeList(response);
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchTenantList = async () => {
    try {
      const response = await getTenantList();
      setTenantList(response);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleTenantChange = async (e) => {
    const { value } = e.target;
    validation.setFieldValue("tenantId", value);
    try {
      const clients = await getClientList(value);
      setClientList(clients);
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchClientsList = async () => {
    try {
      const clients = await getClientList(userData.tenantId);
      setClientList(clients);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleClientChange = async (e) => {
    const { value } = e.target;
    validation.setFieldValue("clientId", value);
    try {
      const clients = await getStoreList(value);
      setStoreList(clients);
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchStores = async () => {
    try {
      const response = await fetchStoreDropdown();
      setStoreList(response);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(values).map((key) => {
        form.append(key[0], key[1]);
        return key;
      });

      if (!values.storeId) {
        form.append("storeId", userData.storeId);
      }

      const response = await addWorkOrder(form, true);
      setLoading(false);
      Notify(response.message || "Successfully added work order", true);
      if (response.trackingId) {
        props.history.push(`/workOrderDetails/${response.trackingId}`);
      }
    } catch (err) {
      setLoading(false);
      Notify(err || "Something went wrong!!", false);
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

  const handleTradeChange = async (e) => {
    const { value } = e.target;
    validation.setFieldValue("tradeId", value);
    try {
      const issueResponse = await getIssueList(value);
      setIssueList(issueResponse);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleRecallIdChange = async (e) => {
    setLoading(true);
    try {
      validation.setFieldValue("recallId", e.target.value);
      const response = await getRecallDetails(e.target.value);
      validation.setFieldValue("createdBy", response.createdBy);
      validation.setFieldValue("description", response.description);
      validation.setFieldValue("storeId", response?.store?.id);
      validation.setFieldValue("priority", response?.priority);
      validation.setFieldValue("nte", response?.nte);
      if (response?.trade?.id) {
        validation.setFieldValue("tradeId", response?.trade?.id);
        handleTradeChange({ target: { value: response?.trade?.id } });
      }
      setLoading(false);
    } catch (error) {
      validation.setFieldValue("recallId", e.target.value);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <UiContent />
      {loading ? (
        <Loading />
      ) : (
        <div className="page-content">
          <Container fluid={true}>
            <BreadCrumb title="Add Work Order" pageTitle="Work Order" />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <div className="live-preview">
                      <Form
                        className="needs-validation"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          setHasSubmit(true);
                        }}
                      >
                        <div className="d-flex justify-content-between ">
                          <h5 className="pb-3">Add Work Order</h5>
                        </div>

                        <Row>
                          <Col md={validation.values.isRecall ? "1" : "12"}>
                            <FormGroup
                              style={{ width: "100%" }}
                              className="mb-3"
                            >
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
                                  validation.touched.isRecall &&
                                  validation.errors.isRecall
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.isRecall &&
                              validation.errors.isRecall ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.isRecall}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </Col>

                          {validation.values.isRecall && (
                            <Col md="3">
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
                                      // validation.setFieldValue(
                                      //   "recallId",
                                      //   e.target.value
                                      // );
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
                                      <option
                                        key={index}
                                        value={option.trackingId}
                                      >
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
                        </Row>
                        <Row>
                          {tags.includes(CONSTANT.GET_TENANT_DROPDOWN) && (
                            <Col md="4">
                              <FormGroup className="mb-3">
                                <Label>Select Corporate *</Label>
                                <>
                                  <Input
                                    type="select"
                                    name="tenantId"
                                    placeholder="Select Corporate *"
                                    className="form-control"
                                    onChange={(e) => {
                                      handleTenantChange(e);
                                    }}
                                    onBlur={validation.handleBlur}
                                    value={validation.values?.tenantId || ""}
                                    invalid={
                                      validation.touched?.tenantId &&
                                      validation.errors?.tenantId
                                        ? true
                                        : false
                                    }
                                  >
                                    <option value="">Select Corporate *</option>
                                    {tenantList?.map((option, index) => (
                                      <option key={index} value={option.id}>
                                        {option.name}
                                      </option>
                                    ))}
                                  </Input>
                                  {validation.touched?.tenantId &&
                                  validation.errors.tenantId ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors?.tenantId}
                                    </FormFeedback>
                                  ) : null}
                                </>
                              </FormGroup>
                            </Col>
                          )}

                          {tags.includes(CONSTANT.GET_CLIENT_DROPDOWN) && (
                            <Col md="4">
                              <FormGroup className="mb-3">
                                <Label>Select Brand *</Label>
                                <>
                                  <Input
                                    type="select"
                                    name="clientId"
                                    placeholder="Select Brand *"
                                    className="form-control"
                                    onChange={(e) => {
                                      handleClientChange(e);
                                    }}
                                    onBlur={validation.handleBlur}
                                    value={validation.values?.clientId || ""}
                                    invalid={
                                      validation.touched?.clientId &&
                                      validation.errors?.clientId
                                        ? true
                                        : false
                                    }
                                  >
                                    <option value="">Select Brand *</option>
                                    {clientList?.map((option, index) => (
                                      <option key={index} value={option.id}>
                                        {option.name}
                                      </option>
                                    ))}
                                  </Input>
                                  {validation.touched?.clientId &&
                                  validation.errors.clientId ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors?.clientId}
                                    </FormFeedback>
                                  ) : null}
                                </>
                              </FormGroup>
                            </Col>
                          )}

                          {tags.includes(CONSTANT.GET_STORE_DROPDOWN) && (
                            <Col md="4">
                              <FormGroup className="mb-3">
                                <Label>Select Store *</Label>
                                <>
                                  <Input
                                    type="select"
                                    name="storeId"
                                    placeholder="Select Store *"
                                    className="form-control"
                                    onChange={(e) => {
                                      validation.setFieldValue(
                                        "storeId",
                                        e.target.value,
                                      );
                                    }}
                                    onBlur={validation.handleBlur}
                                    value={validation.values?.storeId || ""}
                                    invalid={
                                      validation.touched?.storeId &&
                                      validation.errors?.storeId
                                        ? true
                                        : false
                                    }
                                  >
                                    <option value="">Select Store *</option>
                                    {storeList?.map((option, index) => (
                                      <option key={index} value={option.id}>
                                        {option.storeName}
                                      </option>
                                    ))}
                                  </Input>
                                  {validation.touched?.storeId &&
                                  validation.errors.storeId ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors?.storeId}
                                    </FormFeedback>
                                  ) : null}
                                </>
                              </FormGroup>
                            </Col>
                          )}

                          <Col md="4">
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

                          <Col md="4">
                            <FormGroup className="mb-3">
                              <Label>Select Trade *</Label>
                              <>
                                <Input
                                  type="select"
                                  name="tradeId"
                                  placeholder="Select Trade *"
                                  className="form-control"
                                  onChange={(e) => {
                                    handleTradeChange(e);
                                  }}
                                  disabled={validation.values.isRecall}
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

                          <Col md="4">
                            <FormGroup className="mb-3">
                              <Label>Select Issue *</Label>
                              <>
                                <Input
                                  type="select"
                                  name="issueId"
                                  placeholder="Select Issue *"
                                  className="form-control"
                                  onChange={(e) => {
                                    validation.setFieldValue(
                                      "issueId",
                                      e.target.value,
                                    );
                                  }}
                                  onBlur={validation.handleBlur}
                                  value={validation.values?.issueId || ""}
                                  invalid={
                                    validation.touched?.issueId &&
                                    validation.errors?.issueId
                                      ? true
                                      : false
                                  }
                                >
                                  <option value="">Select issue *</option>
                                  {issueList?.map((option, index) => (
                                    <option key={index} value={option.id}>
                                      {option.description}
                                    </option>
                                  ))}
                                </Input>
                                {validation.touched?.issueId &&
                                validation.errors.issueId ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors?.issueId}
                                  </FormFeedback>
                                ) : null}
                              </>
                            </FormGroup>
                          </Col>

                          <Col md="4">
                            <FormGroup className="mb-3">
                              <Label>Select Priority *</Label>
                              <>
                                <Input
                                  type="select"
                                  name="priority"
                                  placeholder="Select Priority *"
                                  className="form-control"
                                  onChange={(e) => {
                                    validation.setFieldValue(
                                      "priority",
                                      e.target.value,
                                    );
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

                          <Col md="4">
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
                                  validation.touched.nte &&
                                  validation.errors.nte
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.nte &&
                              validation.errors.nte ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.nte}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </Col>

                          <Col md="4">
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
                                  validation.touched.etaStart &&
                                  validation.errors.etaStart
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.etaStart &&
                              validation.errors.etaStart ? (
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
                              {hasSubmit &&
                              validation.values.description.length === 0 ? (
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

                        <div className="d-flex flex-md-row justify-content-between">
                          <Button color="primary" type="submit">
                            Add Work Order
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddWorkOrder;
