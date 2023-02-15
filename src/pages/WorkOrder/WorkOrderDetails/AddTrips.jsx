import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useFormik } from "formik";
import FormModal from "src/Components/Common/FormModal";
import { object, string, date, boolean } from "yup";
import Loading from "src/common/Loader";
import TripsList from "./TripsList";
import Notify from "src/common/Toaster/toast";
import { addTrip as addTechnician, getTenantList } from "src/helpers/WorkOrder";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { getDateTime } from "src/helpers/format_helper";
import { getTechnicianDropdown } from "src/helpers/Technician";
import { getVendorDropdown } from "src/helpers/Vendors";

const AddTrips = (props) => {
  const { tags = [], userData = {} } = useSelector((state) => state.Login);
  const [loading, setLoading] = useState(false);
  const [showTechnician, setShowTechnician] = useState(false);
  const [technicianList, setTechnicianList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  const { details } = props;
  const { store = {} } = details;

  const addTechnicianSchema = object().shape({
    tenantId: !tags.includes(CONSTANT.GET_TENANT_DROPDOWN)
      ? string().notRequired()
      : string().required("Corporate is required"),
    vendorId: !tags.includes(CONSTANT.GET_TENANT_DROPDOWN)
      ? string().notRequired()
      : string().required("Vendor is required"),
    technicianId: string().required("Technician is a required field"),
    date: date().required("Date and time is required"),
    serviceRequested: string().required("Service requested is required"),
    additionalInformation: string().notRequired(),
    nightWork: boolean().notRequired(),
    lights: boolean().notRequired(),
    securityRequired: boolean().notRequired(),
    emergency: boolean().notRequired(),
  });

  const validation = useFormik({
    initialValues: {
      tenantId: "",
      vendorId: "",
      technicianId: "",
      date: getDateTime(),
      serviceRequested: "",
      additionalInformation: "",
      nightWork: false,
      lights: false,
      securityRequired: false,
      emergency: false,
    },
    validationSchema: addTechnicianSchema,
    onSubmit: (values) => {
      handleTechnicianSubmit(values);
    },
  });

  useEffect(() => {
    const { role = [] } = userData;
    const isSuperAdmin = role.filter(
      (item) => item.name === CONSTANT.SUPER_ADMIN,
    );

    if (tags.includes(CONSTANT.CREATE_TRIP) && isSuperAdmin.length === 0) {
      fetchTechnician();
    }
  }, []);

  useEffect(() => {
    if (store.id) {
      if (tags.includes(CONSTANT.GET_TENANT_DROPDOWN)) {
        fetchTenantList();
      } else if (tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)) {
        fetchVendors();
      }
    }
  }, [store?.id]);

  const fetchTenantList = async () => {
    try {
      const response = await getTenantList();
      setTenantList(response);
    } catch (error) {
      console.log("");
    }
  };

  const addTrip = () => {
    if (details.ticketVendor && details.ticketVendor.length > 0) {
      setShowTechnician((prev) => !prev);
    } else {
      Notify("Please assign a vendor first", false);
    }
  };

  const handleTechnicianSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = { ...values };
      payload.ticketId = details.id;
      delete payload.tenantId;
      delete payload.vendorId;
      const response = await addTechnician(payload);
      Notify(response.message, true);
      setLoading(false);
      props.update();
      setShowTechnician(false);
      validation.resetForm();
    } catch (error) {
      Notify(error, false);
      setLoading(false);
    }
  };

  const fetchVendors = async (id) => {
    try {
      let params = {};
      if (id) {
        params.tenantId = id;
      }

      const response = await getVendorDropdown(params);
      setVendorList(response);
    } catch (error) {
      console.log("");
    }
  };

  const fetchTechnician = async (id) => {
    try {
      let params = {};
      if (id) {
        params.vendorId = id;
      }

      const response = await getTechnicianDropdown(params);
      setTechnicianList(response);
    } catch (error) {
      console.log("");
    }
  };

  const toggleTechnician = () => {
    setShowTechnician((prev) => !prev);
  };

  return (
    <Fragment>
      <FormModal
        open={showTechnician}
        toggle={toggleTechnician}
        title={"Add Trip"}
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
              {tags.includes(CONSTANT.GET_TENANT_DROPDOWN) && (
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label>Select Corporate *</Label>
                    <>
                      <Input
                        type="select"
                        name="tenantId"
                        placeholder="Select Corporate *"
                        className="form-control"
                        onChange={(e) => {
                          validation.setFieldValue("tenantId", e.target.value);
                          fetchVendors(e.target.value);
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

              {tags.includes(CONSTANT.GET_TENANT_DROPDOWN) && (
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label>Select Vendor *</Label>
                    <>
                      <Input
                        type="select"
                        name="vendorId"
                        placeholder="Select Vendor *"
                        className="form-control"
                        onChange={(e) => {
                          validation.setFieldValue("vendorId", e.target.value);
                          fetchTechnician(e.target.value);
                        }}
                        onBlur={validation.handleBlur}
                        value={validation.values?.vendorId || ""}
                        invalid={
                          validation.touched?.vendorId &&
                          validation.errors?.vendorId
                            ? true
                            : false
                        }
                      >
                        <option value="">Select Vendor *</option>
                        {vendorList?.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </Input>
                      {validation.touched?.vendorId &&
                      validation.errors.vendorId ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.vendorId}
                        </FormFeedback>
                      ) : null}
                    </>
                  </FormGroup>
                </Col>
              )}

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Select Technician *</Label>
                  <>
                    <Input
                      type="select"
                      name="technicianId"
                      placeholder="Select Technician *"
                      className="form-control"
                      onChange={(e) => {
                        validation.setFieldValue(
                          "technicianId",
                          e.target.value,
                        );
                      }}
                      onBlur={validation.handleBlur}
                      value={validation.values?.technicianId || ""}
                      invalid={
                        validation.touched?.technicianId &&
                        validation.errors?.technicianId
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Technician *</option>
                      {technicianList?.map((option, index) => (
                        <option key={index} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Input>
                    {validation.touched?.technicianId &&
                    validation.errors.technicianId ? (
                      <FormFeedback type="invalid">
                        {validation.errors?.technicianId}
                      </FormFeedback>
                    ) : null}
                  </>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Date & Time ETA *</Label>
                  <Input
                    name="date"
                    placeholder="Date & Time ETA *"
                    type="datetime-local"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.date || ""}
                    invalid={
                      validation.touched.date && validation.errors.date
                        ? true
                        : false
                    }
                  />
                  {validation.touched.date && validation.errors.date ? (
                    <FormFeedback type="invalid">
                      {validation.errors.date}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Service Requested *</Label>
                  <Input
                    name="serviceRequested"
                    placeholder="Service Requested *"
                    type="textarea"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.serviceRequested || ""}
                    invalid={
                      validation.touched.serviceRequested &&
                      validation.errors.serviceRequested
                        ? true
                        : false
                    }
                  />
                  {validation.touched.serviceRequested &&
                  validation.errors.serviceRequested ? (
                    <FormFeedback type="invalid">
                      {validation.errors.serviceRequested}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Additional Instructions</Label>
                  <Input
                    name="additionalInformation"
                    placeholder="Additional Instructions"
                    type="textarea"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.additionalInformation || ""}
                    invalid={
                      validation.touched.additionalInformation &&
                      validation.errors.additionalInformation
                        ? true
                        : false
                    }
                  />
                  {validation.touched.additionalInformation &&
                  validation.errors.additionalInformation ? (
                    <FormFeedback type="invalid">
                      {validation.errors.additionalInformation}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup style={{ width: "100%" }} className="mb-3">
                  <Label>Night Work</Label>
                  <Input
                    name="nightWork"
                    placeholder="Night Work"
                    type="checkbox"
                    className="form-control"
                    onChange={(e) => {
                      validation.setFieldValue(
                        "nightWork",
                        !validation.values.nightWork,
                      );
                    }}
                    onBlur={validation.handleBlur}
                    checked={validation.values.nightWork || false}
                    value={validation.values.nightWork || false}
                    invalid={
                      validation.touched.nightWork &&
                      validation.errors.nightWork
                        ? true
                        : false
                    }
                  />
                  {validation.touched.nightWork &&
                  validation.errors.nightWork ? (
                    <FormFeedback type="invalid">
                      {validation.errors.nightWork}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup style={{ width: "100%" }} className="mb-3">
                  <Label>HVAC/Lights</Label>
                  <Input
                    name="lights"
                    placeholder="HVAC/Lights"
                    type="checkbox"
                    className="form-control"
                    onChange={(e) => {
                      validation.setFieldValue(
                        "lights",
                        !validation.values.lights,
                      );
                    }}
                    onBlur={validation.handleBlur}
                    checked={validation.values.lights || false}
                    value={validation.values.lights || false}
                    invalid={
                      validation.touched.lights && validation.errors.lights
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lights && validation.errors.lights ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lights}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup style={{ width: "100%" }} className="mb-3">
                  <Label>Security Required</Label>
                  <Input
                    name="securityRequired"
                    placeholder="Security Required"
                    type="checkbox"
                    className="form-control"
                    onChange={(e) => {
                      validation.setFieldValue(
                        "securityRequired",
                        !validation.values.securityRequired,
                      );
                    }}
                    onBlur={validation.handleBlur}
                    checked={validation.values.securityRequired || false}
                    value={validation.values.securityRequired || false}
                    invalid={
                      validation.touched.securityRequired &&
                      validation.errors.securityRequired
                        ? true
                        : false
                    }
                  />
                  {validation.touched.securityRequired &&
                  validation.errors.securityRequired ? (
                    <FormFeedback type="invalid">
                      {validation.errors.securityRequired}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup style={{ width: "100%" }} className="mb-3">
                  <Label>Emergency Request</Label>
                  <Input
                    name="emergency"
                    placeholder="Emergency Request"
                    type="checkbox"
                    className="form-control"
                    onChange={(e) => {
                      validation.setFieldValue(
                        "emergency",
                        !validation.values.emergency,
                      );
                    }}
                    onBlur={validation.handleBlur}
                    checked={validation.values.emergency || false}
                    value={validation.values.emergency || false}
                    invalid={
                      validation.touched.emergency &&
                      validation.errors.emergency
                        ? true
                        : false
                    }
                  />
                  {validation.touched.emergency &&
                  validation.errors.emergency ? (
                    <FormFeedback type="invalid">
                      {validation.errors.emergency}
                    </FormFeedback>
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
                  setShowTechnician(false);
                  validation.resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </FormModal>

      <Form>
        {tags.includes(CONSTANT.CREATE_TRIP) && (
          <Row md="12">
            <Col>
              <h5>Trips</h5>{" "}
            </Col>
            <Col style={{ alignSelf: "flex-end" }}>
              <Button
                type="button"
                style={{ float: "right" }}
                color="primary"
                onClick={addTrip}
              >
                Add Trip
              </Button>
            </Col>
          </Row>
        )}

        <hr></hr>
        {details.id && (
          <Row className="trip-list">
            <TripsList id={details.id} />
          </Row>
        )}
      </Form>
    </Fragment>
  );
};

export default AddTrips;
