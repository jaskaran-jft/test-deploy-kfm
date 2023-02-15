import { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";

import * as yup from "yup";
import { useFormik } from "formik";
import FormModal from "src/Components/Common/FormModal";
import Notify from "src/common/Toaster/toast";
import {
  acceptWorkRequest,
  declineWorkRequest,
  getIssueList,
  getPriorityList,
  getRecallDetails,
  getRecallId,
} from "src/helpers/WorkRequest";
import { withRouter } from "react-router-dom";
import { getTradesList } from "src/helpers/Vendors";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { getDateTime } from "src/helpers/format_helper";
import Loading from "src/common/Loader";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const WorkRequestHandle = (props) => {
  const { data = {} } = props;
  const [showAccept, setShowAccept] = useState(false);
  const [showDecline, setShowDecline] = useState(false);
  const [priorityList, setPriorityList] = useState([]);
  const { tags = [] } = useSelector((state) => state.Login);
  const [tradeList, setTradeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [issueList, setIssueList] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);
  const acceptWorkRequestObj = useState({
    tradeId: "",
    createdBy: "",
    priority: "",
    issueId: "",
    nte: 0,
    etaStart: getDateTime(),
    description: "",
  })[0];

  const declineSchema = yup.object().shape({
    rejectionReason: yup
      .string()
      .required("Rejection reason is a required field"),
  });

  const validationSchema = yup.object().shape({
    tradeId: yup.string().required("Trade is required"),
    createdBy: yup.string().required("Requested by is required"),
    priority: yup.string().required(),
    issueId: yup.string().required(),
    nte: yup.number().required(),
    etaStart: yup.date().required(),
    description: yup.string().required(),
  });

  const validation = useFormik({
    initialValues: acceptWorkRequestObj,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const declineForm = useFormik({
    initialValues: {
      rejectionReason: "",
    },
    validationSchema: declineSchema,
    onSubmit: (values) => {
      handleDeclineSubmit(values);
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
      validation.setFieldValue("createdBy", data.createdBy || "");
      validation.setFieldValue("description", data.description || "");

      if (data?.trade?.id) {
        validation.setFieldValue("tradeId", data?.trade?.id);
        handleTradeChange({ target: { value: data?.trade?.id } });
      }
    }
  }, [data]);

  const handleDeclineSubmit = async (values) => {
    setLoading(true);

    try {
      values.id = data.id;
      const response = await declineWorkRequest(values);
      Notify(response.message || "Successfully declined work request", true);
      setLoading(false);
      props.update();
      setShowDecline(false);
      props.history.push("/pendingWorkRequest");
    } catch (error) {
      Notify(error || "Something went wrong!!", false);
      setLoading(false);
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

      form.append("id", data.id);
      // values.id = data.id;
      const response = await acceptWorkRequest(form, true);
      Notify(response.message || "Successfully accepted work request", true);
      setLoading(false);
      props.update();

      setShowAccept(false);
      if (response.trackingId) {
        props.history.push(`/workOrderDetails/${response.trackingId}`);
      }
      // props.history.push("/workOrderList");
    } catch (error) {
      Notify(error || "Something went wrong!!", false);
      setLoading(false);
    }
  };

  const handleAccept = (e) => {
    e.preventDefault();
    setShowAccept((prev) => !prev);
  };

  const handleDecline = (e) => {
    e.preventDefault();
    setShowDecline((prev) => !prev);
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

  return (
    <Fragment>
      <FormModal
        title={`Accept Work Request #${data.trackingId}`}
        toggle={handleAccept}
        open={showAccept}
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
                      onChange={(e) => {
                        handleTradeChange(e);
                      }}
                      disabled={data.isRecall || false}
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

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Select Issue *</Label>
                  <>
                    <Input
                      type="select"
                      name="issueId"
                      placeholder="Select Issue *"
                      className="form-control"
                      onChange={(e) => {
                        validation.setFieldValue("issueId", e.target.value);
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
                  setShowAccept(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </FormModal>

      <FormModal
        title={`Reject Work Request #${data.trackingId}`}
        toggle={handleDecline}
        open={showDecline}
        showFooter={false}
      >
        {loading ? (
          <Loading />
        ) : (
          <Form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              declineForm.handleSubmit();
              setHasSubmit(true);
            }}
          >
            <div className="d-flex justify-content-between ">
              <h5 className="pb-3">
                Are you sure that you want to decline this request?
              </h5>
            </div>
            <Row>
              <Col md="12">
                <FormGroup className="mb-3">
                  <Label>Reason *</Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={declineForm.values.rejectionReason || ""}
                    name="description"
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      declineForm.setFieldValue("rejectionReason", data);
                    }}
                    onBlur={(event, editor) => {
                      declineForm.handleBlur();
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                  {hasSubmit &&
                  declineForm.values.rejectionReason.length === 0 ? (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      Description is required field
                    </div>
                  ) : null}
                  {/* <Input
                    name="rejectionReason"
                    placeholder="Reason *"
                    type="textarea"
                    className="form-control"
                    onChange={declineForm.handleChange}
                    onBlur={declineForm.handleBlur}
                    value={declineForm.values.rejectionReason || ""}
                    invalid={
                      declineForm.touched.rejectionReason &&
                      declineForm.errors.rejectionReason
                        ? true
                        : false
                    }
                  />
                  {declineForm.touched.rejectionReason &&
                  declineForm.errors.rejectionReason ? (
                    <FormFeedback type="invalid">
                      {declineForm.errors.rejectionReason}
                    </FormFeedback>
                  ) : null} */}
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex flex-md-row justify-content-end">
              <Button
                color="danger"
                type="button"
                style={{ marginRight: 20 }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowDecline(false);
                }}
              >
                No
              </Button>
              <Button color="primary" type="submit">
                Yes
              </Button>
            </div>
          </Form>
        )}
      </FormModal>

      <Row>
        {tags.includes(CONSTANT.ACCEPT_SERVICE_REQUEST) &&
          data.status !== CONSTANT.REJECTED && (
            <Col md={2}>
              <Button onClick={handleAccept} color="success" type="submit">
                Accept Request
              </Button>
            </Col>
          )}
        {tags.includes(CONSTANT.REJECT_SERVICE_REQUEST) &&
          data.status !== CONSTANT.REJECTED && (
            <Col md={2}>
              <Button
                onClick={handleDecline}
                className="btn btn-danger"
                type="submit"
              >
                Decline Request
              </Button>
            </Col>
          )}
      </Row>
    </Fragment>
  );
};

export default withRouter(WorkRequestHandle);
