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
import { object, string, number } from "yup";
import Loading from "src/common/Loader";
import Notify from "src/common/Toaster/toast";
import { assignVendor, getTenantList } from "src/helpers/WorkOrder";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { getVendorDropdown } from "src/helpers/Vendors";
import VendorDropdown from "src/Components/Common/VendorDropdown";

const AddVendor = (props) => {
  const { tags = [] } = useSelector((state) => state.Login);
  const [loading, setLoading] = useState(false);
  const [showVendor, setShowVendor] = useState(false);
  const [tenantList, setTenantList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  const { details } = props;
  const { store = {}, ticketVendor = [{}] } = details;

  useEffect(() => {
    if (store.id) {
      if (tags.includes(CONSTANT.GET_TENANT_DROPDOWN)) {
        fetchTenantList();
      } else {
        fetchVendors();
      }
    }
  }, [store?.id]);

  const addVendorSchema = object().shape({
    tenantId: !tags.includes(CONSTANT.GET_TENANT_DROPDOWN)
      ? string().notRequired()
      : string().required("Corporate is required"),
    vendorId: string().required("Vendor is a required field"),
    nte: number().required("NTE is a required field"),
  });

  const vendorValidation = useFormik({
    initialValues: {
      tenantId: "",
      vendorId: "",
      nte: 0,
    },
    validationSchema: addVendorSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = { ...values };
      payload.ticketId = details.id;
      delete payload.tenantId;
      const response = await assignVendor(payload);
      Notify(response.message, true);
      setLoading(false);
      props.update();
      setShowVendor(false);
      vendorValidation.resetForm();
    } catch (error) {
      Notify(error, false);
      setLoading(false);
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

  const fetchVendors = async (id) => {
    try {
      let params = {};

      params.trade = details?.trade?.name;
      params.ticketId = details?.id;
      if (id) {
        params.tenantId = id;
      }

      const response = await getVendorDropdown(params);
      setVendorList(response);
    } catch (error) {
      console.log({ error });
    }
  };

  const toggleVendor = () => {
    setShowVendor((prev) => !prev);
  };

  return (
    <Fragment>
      {" "}
      <FormModal
        open={showVendor}
        toggle={toggleVendor}
        title={"Assign Vendor"}
      >
        {loading ? (
          <Loading />
        ) : (
          <Form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              vendorValidation.handleSubmit();
            }}
          >
            <div className="d-flex justify-content-between ">
              <h5 className="pb-3">Please assign the ticket to a vendor</h5>
            </div>

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
                          vendorValidation.setFieldValue(
                            "tenantId",
                            e.target.value,
                          );
                          fetchVendors(e.target.value);
                        }}
                        onBlur={vendorValidation.handleBlur}
                        value={vendorValidation.values?.tenantId || ""}
                        invalid={
                          vendorValidation.touched?.tenantId &&
                          vendorValidation.errors?.tenantId
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
                      {vendorValidation.touched?.tenantId &&
                      vendorValidation.errors.tenantId ? (
                        <FormFeedback type="invalid">
                          {vendorValidation.errors?.tenantId}
                        </FormFeedback>
                      ) : null}
                    </>
                  </FormGroup>
                </Col>
              )}

              <Col md="12">
                <FormGroup className="mb-3">
                  <Label>Select Vendor *</Label>
                  <>
                    <Input
                      type="select"
                      name="vendorId"
                      placeholder="Select Vendor *"
                      className="form-control"
                      onChange={(e) => {
                        vendorValidation.setFieldValue(
                          "vendorId",
                          e.target.value,
                        );
                      }}
                      onBlur={vendorValidation.handleBlur}
                      value={vendorValidation.values?.vendorId || ""}
                      invalid={
                        vendorValidation.touched?.vendorId &&
                        vendorValidation.errors?.vendorId
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Vendor *</option>
                      {vendorList?.map((option, index) => (
                        <option key={index} value={option.id}>
                          {/* {option.name} */}
                          <VendorDropdown item={option} />
                        </option>
                      ))}
                    </Input>
                    {vendorValidation.touched?.vendorId &&
                    vendorValidation.errors.vendorId ? (
                      <FormFeedback type="invalid">
                        {vendorValidation.errors?.vendorId}
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
                    onChange={vendorValidation.handleChange}
                    onBlur={vendorValidation.handleBlur}
                    value={vendorValidation.values.nte || ""}
                    invalid={
                      vendorValidation.touched.nte &&
                      vendorValidation.errors.nte
                        ? true
                        : false
                    }
                  />
                  {vendorValidation.touched.nte &&
                  vendorValidation.errors.nte ? (
                    <FormFeedback type="invalid">
                      {vendorValidation.errors.nte}
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
                  setShowVendor(false);
                  vendorValidation.resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </FormModal>
      <Form>
        <Row md="12">
          <Col>
            <h4>Vendors:</h4>{" "}
          </Col>
          <Col style={{ alignSelf: "flex-end" }}>
            <Button
              type="button"
              style={{ float: "right" }}
              color="primary"
              onClick={toggleVendor}
            >
              Assign Vendor
            </Button>
          </Col>
        </Row>
        <hr></hr>
        <Row className="mb-4">
          {ticketVendor && ticketVendor.length > 0 ? (
            <Fragment>
              {ticketVendor.map((_vendor) => (
                <Row key={_vendor.id}>
                  <Col>
                    <span
                      className="mdi mdi-screwdriver"
                      style={{ fontSize: 18 }}
                    ></span>
                    &nbsp;
                    <b>{_vendor.vendor?.businessName}</b>
                  </Col>
                  <Col>
                    NTE: <b>${_vendor.nte.toFixed(2)}</b>
                  </Col>
                  <Col>
                    Status: <b>{_vendor?.status}</b>
                  </Col>
                  <Col>
                    Phone: <b>{_vendor.vendor?.businessPhone}</b>
                  </Col>
                </Row>
              ))}
            </Fragment>
          ) : (
            <p>No Vendor assigned.</p>
          )}
        </Row>
      </Form>
    </Fragment>
  );
};

export default AddVendor;
