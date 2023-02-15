import React, {
  Fragment,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Button, Col, Form, Row } from "reactstrap";
import { useFormik } from "formik";
import FormModal from "src/Components/Common/FormModal";
import Loading from "src/common/Loader";
import Notify from "src/common/Toaster/toast";
import {
  addEstimateInitialValues,
  initialReducer,
  initial,
  incurredLabourObj,
  incurredMaterialObj,
  incurredTripObj,
  estimateLabourObj,
  estimateMaterialObj,
  estimateTripObj,
} from "./utils";
import { string, object } from "yup";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { deepClone } from "src/helpers/format_helper";
import { getInvoiceExpense, saveInvoiceDetails } from "src/helpers/WorkOrder";
import EstimateAddForm from "src/common/EstimatePDF/EstimateAddForm";
import InvoiceList from "src/pages/Invoice/InvoiceList";

const AddInvoice = (props) => {
  const [showEstimate, setShowEstimate] = useState(false);
  const { tags = [], userData = {} } = useSelector((state) => state.Login);
  const [loading, setLoading] = useState(
    !tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN) ? true : false,
  );
  const [collapse, setCollapse] = useState(false);
  const [estimateCollapse, setEstimateCollapse] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [rateType, setRateType] = useState([]);
  const [tripType, setTripType] = useState([]);
  const [taxExempted, setTaxExempted] = useState(false);
  const [taxExemptedUrl, setTaxExemptedUrl] = useState("");
  const [draft, setDraft] = useState(false);

  const [labourWork, setLabourWork] = useReducer(
    initialReducer,
    deepClone(initial),
  );
  const [materialWork, setMaterialWork] = useReducer(
    initialReducer,
    deepClone(initial),
  );
  const [tripWork, setTripWork] = useReducer(
    initialReducer,
    deepClone(initial),
  );
  const [labourWork2, setLabourWork2] = useReducer(
    initialReducer,
    deepClone(initial),
  );
  const [materialWork2, setMaterialWork2] = useReducer(
    initialReducer,
    deepClone(initial),
  );
  const [tripWork2, setTripWork2] = useReducer(
    initialReducer,
    deepClone(initial),
  );

  const { details } = props;
  const { ticketVendor = [] } = details;

  const addEstimateSchema = object().shape({
    vendorId: tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)
      ? string().required("User is a required field")
      : string().notRequired(),
    assessment: string().notRequired(),
    scopeOfRepairs: string().notRequired(),
  });

  const validation = useFormik({
    initialValues: addEstimateInitialValues,
    validationSchema: addEstimateSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (!tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)) {
      validation.setFieldValue("user", userData.vendorId);
      setVendor(userData.vendorId);
      getFormData(userData.vendorId, details.id);
    }
  }, []);

  const getFormData = async (vendorId, ticketId) => {
    setLoading(true);
    try {
      const response = await getInvoiceExpense({ vendorId, ticketId });
      const _rate = response.rateType.filter((item) => item.rate);
      const _trip = response.tripCharge.filter((item) => item.rate);
      const _taxExempted = response.exempt?.exempt || false;
      setMaterialWork2({ type: "ADD_MULTIPLE", payload: response.material });

      setRateType(_rate);
      setTripType(_trip);
      setTaxExempted(_taxExempted);
      setLoading(false);
      if (_taxExempted) {
        setTaxExemptedUrl(response.exempt?.url);
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  const handleEstimate = () => {
    if (ticketVendor && ticketVendor.length > 0) {
      setShowEstimate(true);
      if (!tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)) {
        getFormData(userData.vendorId, details.id);
      }
    } else {
      Notify("Please assign a vendor first", false);
    }
  };

  useEffect(() => {
    if (ticketVendor && ticketVendor.length > 0 && validation.values.vendorId) {
      setVendor(validation.values.vendorId);
    }
  }, [validation.values.vendorId, ticketVendor]);

  const setVendor = (id) => {
    const vendor = ticketVendor.find((_) => _.vendor.id === id);
    setSelectedVendor(vendor?.vendor || null);
  };

  const change = (e, setChange, index) => {
    const { name, value } = e.target;
    setChange({ type: "UPDATE", payload: { name, value, index } });
    if (name === "rateType") {
      const _value = rateType.find((item) => item.name === value);
      setChange({
        type: "UPDATE",
        payload: { name: "unitPrice", value: _value.rate || 0, index },
      });
    } else if (name === "tripCharge") {
      const _value = tripType.find((item) => item.name === value);
      setChange({
        type: "UPDATE",
        payload: { name: "unitPrice", value: _value.rate || 0, index },
      });
    }
  };

  const handleDelete = (setChange, index) => {
    setChange({ type: "DELETE", payload: { index } });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = { ...values };
      if (!tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)) {
        payload.vendorId = userData.vendorId;
      }

      payload.ticketId = details.id;
      payload.labor = [...labourWork.data, ...labourWork2.data];
      payload.material = [...materialWork.data, ...materialWork2.data];
      payload.trip = [...tripWork.data, ...tripWork2.data];
      payload.draft = draft;

      const response = await saveInvoiceDetails(payload);
      Notify(response.message, true);
      props.update();
      setShowEstimate(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Notify(error, false);
    }
  };

  const toggleEstimate = () => {
    setShowEstimate((prev) => !prev);
  };

  const t_collapse = () => {
    setCollapse(!collapse);
    setEstimateCollapse(false);
  };

  const t_estimateCollapse = () => {
    setEstimateCollapse(!estimateCollapse);
    setCollapse(false);
  };

  const addIncurred = (setIncurredData, object) => {
    setIncurredData({ type: "ADD", payload: { object } });
  };

  const addEstimate = (setEstimateData, object) => {
    setEstimateData({ type: "ADD", payload: { object } });
  };

  const NetTotal = useMemo(() => {
    const labourData = [...labourWork.data, ...labourWork2.data];
    const restData = [
      ...materialWork.data,
      ...materialWork2.data,
      ...tripWork.data,
      ...tripWork2.data,
    ];
    let total = 0;
    labourData.forEach((_) => {
      total += Number(_.quantity) * Number(_.technicians) * Number(_.unitPrice);
    });

    restData.length > 0 &&
      restData.forEach((_) => {
        total += Number(_.quantity) * Number(_.unitPrice);
      });

    return total;
  }, [
    labourWork,
    labourWork2,
    tripWork,
    tripWork2,
    materialWork,
    materialWork2,
  ]);

  return (
    <Fragment>
      <FormModal
        open={showEstimate}
        toggle={toggleEstimate}
        title="Add Invoice"
        width
      >
        {loading ? (
          <Loading />
        ) : (
          <EstimateAddForm
            details={props.details}
            dataForm={{
              showIncurred: true,
              rateType,
              tripType,
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
              taxExempted,
              taxExemptedUrl,
              getFormData,
              draft,
              setDraft,
            }}
          />
        )}
      </FormModal>

      <Form>
        <Row md="12">
          <Col>
            <h5>Invoices</h5>
          </Col>
          {tags.includes(CONSTANT.CREATE_INVOICE) && details?.canInvoice && (
            <Col style={{ alignSelf: "flex-end" }}>
              <Button
                type="button"
                style={{ float: "right" }}
                color="primary"
                onClick={handleEstimate}
              >
                Add Invoice
              </Button>
            </Col>
          )}
        </Row>

        <hr></hr>
        <Row className="trip-list">
          <InvoiceList id={details.id} />
        </Row>
      </Form>
    </Fragment>
  );
};

export default AddInvoice;
