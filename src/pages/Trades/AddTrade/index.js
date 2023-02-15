import React, { useState } from "react";
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
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import { addTrade } from "src/helpers/Vendors";

const AddTrade = (props) => {
  const [loading, setLoading] = useState(false);

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
      const response = await addTrade(values);
      Notify(response.message || "Successfully added Trade", true);
      setLoading(false);
      props.toggle();
      // props.history.push(`/tradeList`);
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
            <BreadCrumb title="Add Trade" pageTitle="Trade" />
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
                          <h5 className="pb-3">Add Trade</h5>
                        </div>
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
                                    validation.touched.name &&
                                    validation.errors.name
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.name &&
                                validation.errors.name ? (
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

                        <div className="d-flex flex-md-row justify-content-between">
                          <Button color="primary" type="submit">
                            Add Trade
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
          <h5 className="pb-3">Add Trade</h5>
        </div> */}
        <Row>
          <Col md="6">
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
          <Col md="6">
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

        <div className="d-flex flex-md-row justify-content-between">
          <Button color="primary" type="submit">
            Add Trade
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default AddTrade;
