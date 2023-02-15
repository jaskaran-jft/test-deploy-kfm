import { useSelector } from "react-redux";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Accordion,
  AccordionItem,
  Collapse,
  Card,
  CardBody,
  Button,
  Badge,
} from "reactstrap";
import classNames from "classnames";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AddEstimateDetails from "src/pages/WorkOrder/WorkOrderDetails/AddEstimateDetails";
import { CONSTANT } from "src/utils/constant";
import EstimateInputs from "src/Components/EstimateInputs";
import MaterialInputs from "src/Components/EstimateInputs/MaterialInput";
import TripInputs from "src/Components/EstimateInputs/TripInputs";
import EstimateTotalTax from "src/pages/WorkOrder/WorkOrderDetails/EstimateTotalTax";

const EstimateAddForm = (props) => {
  const { tags = [] } = useSelector((state) => state.Login);
  const {
    selectedVendor,
    validation,
    ticketVendor,
    collapse,
    t_collapse,
    addIncurred,
    setLabourWork,
    incurredLabourObj,
    labourWork,
    materialWork,
    setLabourWork2,
    materialWork2,
    setMaterialWork,
    setMaterialWork2,
    tripWork,
    tripWork2,
    setTripWork,
    setTripWork2,
    change,
    handleDelete,
    incurredMaterialObj,
    incurredTripObj,
    estimateCollapse,
    t_estimateCollapse,
    addEstimate,
    labourWork2,
    estimateLabourObj,
    estimateMaterialObj,
    estimateTripObj,
    NetTotal,
    setShowEstimate,
    disabled = false,
    showIncurred = false,
    getFormData,
    rateType,
    tripType,
    taxExempted,
    taxExemptedUrl,
    setDraft,
  } = props.dataForm;

  const { details } = props;

  return (
    <Form
      className="needs-validation"
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
      }}
    >
      {taxExempted ? (
        <div className="mb-2 mt-2 btn-danger pt-4 pb-3">
          <h5>
            This state is tax exempt. Certificate &nbsp;&nbsp;
            <Badge>
              <a href={taxExemptedUrl} target="_blank" rel="noreferrer">
                Show
              </a>
            </Badge>{" "}
          </h5>
        </div>
      ) : null}
      <AddEstimateDetails
        details={props.details}
        selectedVendor={selectedVendor}
      />
      <Row>
        <Col className="col-md-12">
          <Row>
            {tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN) && (
              <Col md="12">
                <FormGroup className="mb-3">
                  <Label>Vendor *</Label>
                  <>
                    <Input
                      type="select"
                      name="vendorId"
                      disabled={disabled}
                      placeholder="Select Vendor *"
                      className="form-control"
                      onChange={(e) => {
                        validation.setFieldValue("vendorId", e.target.value);
                        // if (e.target.value) {
                        getFormData(e.target.value, details.id);
                        // }
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
                      {disabled ? (
                        <option value={validation.values?.vendorId}>
                          {selectedVendor?.businessName}
                        </option>
                      ) : null}
                      <option value="">Select Vendor *</option>
                      {ticketVendor?.map((option, index) => (
                        <option key={index} value={option?.vendor?.id}>
                          {option?.vendor?.businessName}
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
            <Col md="12">
              <FormGroup className="mb-3">
                <Label>Assessment</Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={validation.values.assessment || ""}
                  name="assessment"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    validation.setFieldValue("assessment", data);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup className="mb-3">
                <Label>Scope Of Repair</Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={validation.values.scopeOfRepairs || ""}
                  name="scopeOfRepairs"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    validation.setFieldValue("scopeOfRepairs", data);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <br></br>

      {/* start of collapse */}

      <Accordion id="default-accordion-example">
        {!showIncurred && (
          <AccordionItem>
            <h2 className="accordion-header" id="headingOne">
              <button
                className={classNames("accordion-button", {
                  collapsed: !collapse,
                })}
                type="button"
                onClick={t_collapse}
                style={{ cursor: "pointer" }}
              >
                Incurred
              </button>
            </h2>
            <Collapse
              isOpen={collapse}
              className="accordion-collapse"
              id="collapseOne"
            >
              <div className="accordion-body">
                <Card>
                  <CardBody>
                    <Row>
                      <Row
                        className="mb-3"
                        style={{
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Col className="col-md-2 d-flex align-items-center">
                          <h5 className="d-inline-flex">Labor </h5>
                          <span
                            onClick={() =>
                              addIncurred(setLabourWork, incurredLabourObj)
                            }
                            className="mdi mdi-plus-circle-outline add-btn ml-1"
                            color="primary"
                          ></span>
                        </Col>
                      </Row>
                      {labourWork.data.length > 0 &&
                        labourWork.data.map((item, index) => {
                          return (
                            <EstimateInputs
                              key={index}
                              index={index}
                              validation={item}
                              change={change}
                              setChange={setLabourWork}
                              handleDelete={handleDelete}
                              rateType={rateType}
                            />
                          );
                        })}
                    </Row>
                    <br></br>
                    <Row>
                      <Row
                        className="mb-3"
                        style={{
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Col className="col-md-12 align-items-end">
                          <h5 className="d-inline-flex "> Material</h5>
                          <span
                            onClick={() =>
                              addIncurred(setMaterialWork, incurredMaterialObj)
                            }
                            className="mdi mdi-plus-circle-outline add-btn  ml-1"
                            color="primary"
                          ></span>
                        </Col>
                      </Row>
                      {materialWork.data.length > 0 &&
                        materialWork.data.map((item, index) => {
                          return (
                            <MaterialInputs
                              key={index}
                              index={index}
                              validation={item}
                              change={change}
                              setChange={setMaterialWork}
                              handleDelete={handleDelete}
                            />
                          );
                        })}
                    </Row>
                    <br></br>
                    <Row>
                      <Row
                        className="mb-3"
                        style={{
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Col className="col-md-12 align-items-end">
                          <h5 className="d-inline-flex "> Trip</h5>
                          <span
                            onClick={() =>
                              addIncurred(setTripWork, incurredTripObj)
                            }
                            className="mdi mdi-plus-circle-outline add-btn  ml-1"
                            color="primary"
                          ></span>
                        </Col>
                      </Row>
                      {tripWork.data.length > 0 &&
                        tripWork.data.map((item, index) => {
                          return (
                            <TripInputs
                              key={index}
                              index={index}
                              validation={item}
                              change={change}
                              setChange={setTripWork}
                              handleDelete={handleDelete}
                              tripType={tripType}
                            />
                          );
                        })}
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </Collapse>
          </AccordionItem>
        )}
        <AccordionItem>
          <h2 className="accordion-header" id="headingTwo">
            <button
              className={classNames("accordion-button", {
                collapsed: !estimateCollapse,
              })}
              type="button"
              onClick={t_estimateCollapse}
              style={{ cursor: "pointer" }}
            >
              {!showIncurred ? "Estimate" : "Invoice"}
            </button>
          </h2>
          <Collapse
            isOpen={estimateCollapse}
            className="accordion-collapse"
            id="collapseTwo"
          >
            <div className="accordion-body">
              <Card>
                <CardBody>
                  <Row>
                    <Row
                      className="mb-3"
                      style={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Col className="col-md-12 align-items-end">
                        <h5 className="d-inline-flex ">Labor </h5>
                        <span
                          onClick={() =>
                            addEstimate(setLabourWork2, estimateLabourObj)
                          }
                          className="mdi mdi-plus-circle-outline add-btn  ml-1"
                          color="primary"
                        ></span>
                      </Col>
                    </Row>
                    {labourWork2.data.length > 0 &&
                      labourWork2.data.map((item, index) => {
                        return (
                          <EstimateInputs
                            key={index}
                            index={index}
                            validation={item}
                            change={change}
                            setChange={setLabourWork2}
                            handleDelete={handleDelete}
                            rateType={rateType}
                          />
                        );
                      })}
                  </Row>
                  <br></br>
                  <Row>
                    <Row
                      className="mb-3"
                      style={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Col className="col-md-12 align-items-end">
                        <h5 className="d-inline-flex ">Material</h5>
                        <span
                          onClick={() =>
                            addEstimate(setMaterialWork2, estimateMaterialObj)
                          }
                          className="mdi mdi-plus-circle-outline add-btn  ml-1"
                          color="primary"
                        ></span>
                      </Col>
                    </Row>
                    {materialWork2.data.length > 0 &&
                      materialWork2.data.map((item, index) => {
                        return (
                          <MaterialInputs
                            key={index}
                            index={index}
                            validation={item}
                            change={change}
                            setChange={setMaterialWork2}
                            handleDelete={handleDelete}
                          />
                        );
                      })}
                  </Row>
                  <br></br>
                  <Row>
                    <Row
                      className="mb-3"
                      style={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Col className="col-md-12 align-items-end">
                        <h5 className="d-inline-flex ">Trip</h5>
                        <span
                          onClick={() =>
                            addEstimate(setTripWork2, estimateTripObj)
                          }
                          className="mdi mdi-plus-circle-outline add-btn ml-1"
                          color="primary"
                        ></span>
                      </Col>
                    </Row>
                    {tripWork2.data.length > 0 &&
                      tripWork2.data.map((item, index) => {
                        return (
                          <TripInputs
                            key={index}
                            index={index}
                            validation={item}
                            change={change}
                            setChange={setTripWork2}
                            handleDelete={handleDelete}
                            tripType={tripType}
                          />
                        );
                      })}
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Collapse>
        </AccordionItem>
      </Accordion>

      <EstimateTotalTax NetTotal={NetTotal} />

      <div className="d-flex flex-md-row justify-content-end">
        {details?.status !== "Rejected" ? (
          <Button
            color="primary"
            type="submit"
            style={{ marginRight: 20 }}
            onClick={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              setDraft(true);
            }}
          >
            Save as draft
          </Button>
        ) : null}
        <Button
          color="primary"
          type="submit"
          style={{ marginRight: 20 }}
          onClick={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            setDraft(false);
          }}
        >
          Send for Review
        </Button>
        <Button
          color="danger"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowEstimate(false);
            validation.resetForm();
          }}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EstimateAddForm;
