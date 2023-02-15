import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { object, string, date, boolean } from "yup";
import Loading from "src/common/Loader";
import Notify from "src/common/Toaster/toast";
import { createReturnTrip, getTenantList } from "src/helpers/WorkOrder";
import { CONSTANT } from "src/utils/constant";
import { getDateTime } from "src/helpers/format_helper";
import { getTechnicianDropdown } from "src/helpers/Technician";
import { getVendorDropdown } from "src/helpers/Vendors";
import { MultiSelect } from "react-multi-select-component";

const TripReturn = (props) => {
  const [loading, setLoading] = useState(false);
  const { tags = [], userData = {} } = useSelector((state) => state.Login);
  const [technicianList, setTechnicianList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [selectedTrades, setSelectedTrades] = useState([]);
  const [submit, setSubmit] = useState(false);

  const { tripId } = props;

  const returnTripSchema = object().shape({
    tenantId: !tags.includes(CONSTANT.GET_TENANT_DROPDOWN)
      ? string().notRequired()
      : string().required("Corporate is required"),
    vendorId: !tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)
      ? string().notRequired()
      : string().required("Vendor is required"),
    technician: string().required("Technician is a required field"),
    date: date().required("Date and time is required"),
    serviceRequested: string().required("Service requested is required"),
    additionalInformation: string().notRequired(),
  });

  const validation = useFormik({
    initialValues: {
      tenantId: "",
      vendorId: "",
      technician: "",
      date: getDateTime(),
      serviceRequested: "",
      additionalInformation: "",
    },
    validationSchema: returnTripSchema,
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  useEffect(() => {
    const { role = [] } = userData;
    const isSuperAdmin = role.filter(
      (item) => item.name === CONSTANT.SUPER_ADMIN,
    );

    if (tags.includes(CONSTANT.GET_TENANT_DROPDOWN)) {
      fetchTenantList();
    } else if (tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)) {
      fetchVendors();
    }

    if (
      tags.includes(CONSTANT.CREATE_RETURN_TRIP) &&
      isSuperAdmin.length === 0
    ) {
      fetchTechnician();
    }
  }, []);

  const fetchTenantList = async () => {
    try {
      const response = await getTenantList();
      setTenantList(response);
    } catch (error) {
      console.log("");
    }
  };

  const handleSubmitForm = async (values) => {
    setLoading(true);
    try {
      const payload = { ...values };
      delete payload.tenantId;
      delete payload.vendorId;
      payload.tripId = tripId;
      payload.technician = selectedTrades.map((item) => item.value);
      const response = await createReturnTrip(payload);
      Notify(response.message, true);
      setLoading(false);
      props.toggle();
      validation.resetForm();
    } catch (error) {
      Notify(error, false);
      setLoading(false);
      validation.setFieldValue("technician", JSON.stringify(technicianList[0]));
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
      const list = response.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setTechnicianList(list);
    } catch (error) {
      console.log("");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Form
          className="needs-validation"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            setSubmit(true);
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

            {tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN) && (
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
                  <MultiSelect
                    options={technicianList}
                    value={selectedTrades}
                    onChange={(value) => {
                      setSelectedTrades(value);
                      validation.setFieldValue(
                        "technician",
                        JSON.stringify(value),
                      );
                    }}
                    name={`technician`}
                    labelledBy="Select Technician*"
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched?.business &&
                      validation.touched?.business?.tradeId &&
                      validation.errors?.business &&
                      validation.errors?.business?.tradeId
                        ? true
                        : false
                    }
                  />
                  {submit && selectedTrades.length === 0 ? (
                    // <FormFeedback type="invalid">
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      Technician is a required field
                    </div>
                  ) : null}
                </>
                {/* <>
                  <Input
                    type="select"
                    name="technicianId"
                    placeholder="Select Technician *"
                    className="form-control"
                    onChange={(e) => {
                      validation.setFieldValue("technicianId", e.target.value);
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
                </> */}
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup className="mb-3">
                <Label>Date *</Label>
                <Input
                  name="date"
                  placeholder="Date *"
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
                props.toggle();
                validation.resetForm();
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Fragment>
  );
};

export default TripReturn;
