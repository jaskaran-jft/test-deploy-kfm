import React, { useLayoutEffect, useState } from "react";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import UiContent from "src/Components/Common/UiContent";
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
import Loading from "src/common/Loader";
import { addTradeIssue, getTradesList } from "src/helpers/Vendors";

const AddIssue = (props) => {
  const [loading, setLoading] = useState(false);
  const [tradeList, setTradesList] = useState([]);
  const validationSchema = yup.object({
    id: yup.string().required("Trade is required"),
    description: yup.string().required("Description is required"),
  });

  useLayoutEffect(() => {
    fetchVendorTrades();
  }, []);

  const validation = useFormik({
    initialValues: {
      id: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const fetchVendorTrades = async () => {
    try {
      const response = await getTradesList();
      if (response) {
        setTradesList(response || []);
      }
    } catch (err) {
      console.log("Error ", err);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {};
      payload.id = values.id;
      payload.issue = [{ description: values.description }];
      const response = await addTradeIssue(payload);
      Notify(response.message || "Successfully added issue", true);
      setLoading(false);
      // props.history.push(`/tradeList`);
      props.toggle();
    } catch (err) {
      Notify(err || "Something went wrong!!", false);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {/* <ToastContainer></ToastContainer>
      <UiContent />
      {loading ? (
        <Loading />
      ) : (
        <div className="page-content">
          <Container fluid={true}>
            <BreadCrumb title="Add Issue" pageTitle="Trade" />
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
                        }}
                      >
                        <div className="d-flex justify-content-between ">
                          <h5 className="pb-3">Add Issue</h5>
                        </div>
                        <Row>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>Select Trade *</Label>
                              <>
                                <Input
                                  type="select"
                                  name="id"
                                  placeholder="Select Trade *"
                                  className="form-control"
                                  disabled={validation.values.isRecall}
                                  onChange={(e) => {
                                    validation.setFieldValue(
                                      "id",
                                      e.target.value
                                    );
                                  }}
                                  onBlur={validation.handleBlur}
                                  value={validation.values?.id || ""}
                                  invalid={
                                    validation.touched?.id &&
                                    validation.errors?.id
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
                                {validation.touched?.id &&
                                validation.errors.id ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors?.id}
                                  </FormFeedback>
                                ) : null}
                              </>
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>Description *</Label>
                              <>
                                <Input
                                  name="description"
                                  placeholder="Enter Description *"
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

                        <div className="d-flex flex-md-row justify-content-between">
                          <Button color="primary" type="submit">
                            Add Issue
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
      )} */}
      <Form
        className="needs-validation"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
        }}
      >
        {/* <div className="d-flex justify-content-between ">
          <h5 className="pb-3">Add Issue</h5>
        </div> */}
        <Row>
          <Col md="6">
            <FormGroup className="mb-3">
              <Label>Select Trade *</Label>
              <>
                <Input
                  type="select"
                  name="id"
                  placeholder="Select Trade *"
                  className="form-control"
                  disabled={validation.values.isRecall}
                  onChange={(e) => {
                    validation.setFieldValue("id", e.target.value);
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values?.id || ""}
                  invalid={
                    validation.touched?.id && validation.errors?.id
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
                {validation.touched?.id && validation.errors.id ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.id}
                  </FormFeedback>
                ) : null}
              </>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className="mb-3">
              <Label>Description *</Label>
              <>
                <Input
                  name="description"
                  placeholder="Enter Description *"
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

        <div className="d-flex flex-md-row justify-content-between">
          <Button color="primary" type="submit">
            Add Issue
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default AddIssue;
