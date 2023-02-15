import React, { useEffect, useState } from "react";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import UiContent from "src/Components/Common/UiContent";

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
  CardGroup,
  CardImg,
  CardTitle,
} from "reactstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import Notify from "src/common/Toaster/toast";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { fetchStoreDropdown } from "src/helpers/StoreMethod/store";
import { getTradesList } from "src/helpers/Vendors";
import DragAndDropFile from "src/Components/Common/DragAndDropFile";
import {
  addWorkRequest,
  getRecallDetails,
  getRecallId,
} from "src/helpers/WorkRequest";
import Loading from "src/common/Loader";
import ListImage from "src/Components/Common/ListImage";

const AddWorkRequest = (props) => {
  const { tags = [], userData = {} } = useSelector((state) => state.Login);
  const [storeList, setStoreList] = useState([]);
  const [tradeList, setTradeList] = useState([]);
  const [files, setFiles] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [recallList, setRecallList] = useState([]);
  const [loading, setLoading] = useState(false);
  const addWorkRequestObj = useState({
    storeId: "",
    tradeId: "",
    createdBy: "",
    description: "",
    isRecall: false,
    // recallId: "",
  })[0];

  const optionalParams = tags.includes(CONSTANT.GET_STORE_DROPDOWN)
    ? { storeId: yup.string().required("Site is required") }
    : {};

  const validationSchema = yup.object().shape({
    ...optionalParams,
    tradeId: yup.string().required("Trade is required"),
    createdBy: yup.string().required("Request by is required"),
    description: yup.string().required(),
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

  useEffect(() => {
    fetchTradesList();
  }, []);

  useEffect(() => {
    if (tags.includes(CONSTANT.GET_STORE_DROPDOWN)) {
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

  const fetchStores = async () => {
    try {
      const response = await fetchStoreDropdown();
      setStoreList(response);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async (values) => {
    if (files.length !== 0) {
      setLoading(true);
      try {
        const form = new FormData();
        Object.entries(values).map((key) => {
          form.append(key[0], key[1]);
          return key;
        });

        console.log({ id: values.storeId });
        if (!values.storeId) {
          form.append("storeId", userData.storeId);
        }

        for (let i = 0; i < files.length; i++) {
          form.append("files", files[i]);
        }

        const response = await addWorkRequest(form, true);
        setLoading(false);
        Notify(response.message || "Successfully added service request", true);
        if (response.trackingId) {
          props.history.push(`/workRequestDetails/${response.trackingId}`);
        }
      } catch (err) {
        Notify(err || "Something went wrong!!", false);
        setLoading(false);
      }
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

  const handleFile = (file) => {
    setFiles((prev) => [...prev, ...file]);
  };

  const handleFileDelete = (e, index) => {
    e.preventDefault();
    setFiles((prev) => {
      const data = prev;
      data.splice(index, 1);
      return [...data];
    });
  };

  const handleRecallIdChange = async (e) => {
    setLoading(true);
    try {
      validation.setFieldValue("recallId", e.target.value);
      const response = await getRecallDetails(e.target.value);
      validation.setFieldValue("tradeId", response?.trade?.id);
      validation.setFieldValue("createdBy", response.createdBy);
      validation.setFieldValue("description", response.description);
      validation.setFieldValue("storeId", response?.store?.id);
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
            <BreadCrumb
              title="Add Service request"
              pageTitle="Service Request"
            />
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
                          <h5 className="pb-3">Add Service Request</h5>
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
                          {tags.includes(CONSTANT.GET_STORE_DROPDOWN) && (
                            <Col md="4">
                              <FormGroup
                                style={{ width: "100%" }}
                                className="mb-6"
                              >
                                <Label>Site *</Label>
                                <>
                                  <Input
                                    type="select"
                                    name="storeId"
                                    style={{ width: "100%" }}
                                    placeholder="Select Site *"
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
                                    <option value="">Select Site *</option>
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
                                  disabled={validation.values.isRecall}
                                  className="form-control"
                                  onChange={(e) => {
                                    validation.setFieldValue(
                                      "tradeId",
                                      e.target.value,
                                    );
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

                        <Row>
                          <Col md="12">
                            <Label>Upload File *</Label>
                            {/* <div className="mb-3"> */}
                            <DragAndDropFile
                              multiple={true}
                              accept=".jpg, .jpeg, .png, .pdf, .mp4"
                              handleFile={handleFile}
                            />
                            {/* </div> */}
                          </Col>
                          {hasSubmit && files.length === 0 ? (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              File is required field
                            </div>
                          ) : null}
                          {files.length > 0 && (
                            <Col md="12 mt-3">
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
                                        flexBasis: "180px",
                                        marginRight: 15,
                                        marginLeft: index === 0 ? "3rem" : 0,
                                      }}
                                      key={index}
                                    >
                                      <ListImage
                                        file={file}
                                        handleFileDelete={handleFileDelete}
                                        index={index}
                                      />
                                    </Card>
                                  ))}
                                </CardGroup>
                              </div>
                            </Col>
                          )}
                        </Row>

                        <div className="d-flex flex-md-row justify-content-between mt-3">
                          <Button color="primary" type="submit">
                            Add Service Request
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

export default AddWorkRequest;
