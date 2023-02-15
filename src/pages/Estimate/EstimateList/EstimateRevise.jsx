import React, {
  Fragment,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useFormik } from "formik";
import Loading from "src/common/Loader";
import Notify from "src/common/Toaster/toast";
import {
  addEstimateInitialValues,
  initialReducer,
  incurredLabourObj,
  incurredMaterialObj,
  incurredTripObj,
  estimateLabourObj,
  estimateMaterialObj,
  estimateTripObj,
} from "src/pages/WorkOrder/WorkOrderDetails/utils";
import { string, object } from "yup";
import { CONSTANT } from "src/utils/constant";
import { deepClone } from "src/helpers/format_helper";
import {
  getEstimateExpense,
  updateEstimateDetails,
  updateEstimateDraft,
  updateInvoiceDraft,
} from "src/helpers/WorkOrder";
import EstimateAddForm from "src/common/EstimatePDF/EstimateAddForm";
const { INCURRED, ESTIMATE, INVOICE } = CONSTANT;

const EstimateRevise = (props) => {
  const [loading, setLoading] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [estimateCollapse, setEstimateCollapse] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [rateType, setRateType] = useState([]);
  const [tripType, setTripType] = useState([]);
  const [draft, setDraft] = useState(false);
  const [taxExempted, setTaxExempted] = useState(false);
  const [taxExemptedUrl, setTaxExemptedUrl] = useState("");

  const { setShowEstimate, data } = props;
  const {
    labor = [],
    material = [],
    trip = [],
    vendor = {},
    id = "",
    assessment = "",
    scopeOfRepairs = "",
    ticket = {},
  } = data;

  const labourWorkData = labor.length
    ? labor.filter((item) => item.type === INCURRED)
    : [];
  const labourWorkData2 = labor.length
    ? labor.filter((item) => item.type === ESTIMATE || item.type === INVOICE)
    : [];
  const materialWorkData = material.length
    ? material.filter((item) => item.type === INCURRED)
    : [];
  const materialWorkData2 = material.length
    ? material.filter((item) => item.type === ESTIMATE || item.type === INVOICE)
    : [];
  const tripWorkData = trip.length
    ? trip.filter((item) => item.type === INCURRED)
    : [];
  const tripWorkData2 = trip.length
    ? trip.filter((item) => item.type === ESTIMATE || item.type === INVOICE)
    : [];

  const [labourWork, setLabourWork] = useReducer(
    initialReducer,
    deepClone({ data: labourWorkData }),
  );
  const [materialWork, setMaterialWork] = useReducer(
    initialReducer,
    deepClone({ data: materialWorkData }),
  );
  const [tripWork, setTripWork] = useReducer(
    initialReducer,
    deepClone({ data: tripWorkData }),
  );
  const [labourWork2, setLabourWork2] = useReducer(
    initialReducer,
    deepClone({ data: labourWorkData2 }),
  );
  const [materialWork2, setMaterialWork2] = useReducer(
    initialReducer,
    deepClone({ data: materialWorkData2 }),
  );
  const [tripWork2, setTripWork2] = useReducer(
    initialReducer,
    deepClone({ data: tripWorkData2 }),
  );

  const addEstimateSchema = object().shape({
    vendorId: string().notRequired(),
    assessment: string().required("Assessment is a required field"),
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
    validation.setFieldValue("vendorId", vendor?.id || "");
    validation.setFieldValue("assessment", assessment || "");
    validation.setFieldValue("scopeOfRepairs", scopeOfRepairs || "");
    getFormData(vendor?.id, ticket?.id);
    setVendor();
  }, []);

  const setVendor = () => {
    setSelectedVendor({
      ...vendor,
      businessName: vendor.user?.firstName,
      businessPhone: vendor.user?.contact?.primaryContactPhone,
    });
  };

  const change = (e, setChange, index) => {
    // const { name, value } = e.target;
    // setChange({ type: "UPDATE", payload: { name, value, index } });
    const { name, value } = e.target;
    setChange({ type: "UPDATE", payload: { name, value, index } });
    if (name === "rateType") {
      const _value = rateType.find((item) => item.name === value);
      setChange({
        type: "UPDATE",
        payload: { name: "unitPrice", value: _value?.rate || 0, index },
      });
    } else if (name === "tripCharge") {
      const _value = tripType.find((item) => item.name === value);
      setChange({
        type: "UPDATE",
        payload: { name: "unitPrice", value: _value?.rate || 0, index },
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
      payload.vendorId = vendor?.id;
      payload.labor = [...labourWork.data, ...labourWork2.data];
      payload.material = [...materialWork.data, ...materialWork2.data];
      payload.trip = [...tripWork.data, ...tripWork2.data];
      if (props.invoice) {
        payload.invoiceId = id;
      } else {
        payload.estimateId = id;
      }

      let url;
      if (data?.status === CONSTANT.DRAFT) {
        url = props.invoice ? updateInvoiceDraft : updateEstimateDraft;
        payload.send = !draft;
      } else if (props.api) {
        url = props?.api || updateEstimateDetails;
      }

      const response = await url(payload);
      Notify(response.message, true);
      props.update();
      setShowEstimate(false);
      setLoading(false);
    } catch (error) {
      console.log({ revise: error });
      setLoading(false);
      Notify(error, false);
    }
  };

  const getFormData = async (vendorId, ticketId) => {
    setLoading(true);
    try {
      const response = await getEstimateExpense({ vendorId, ticketId });
      const _rate = response.rateType.filter((item) => item.rate);
      const _trip = response.tripCharge.filter((item) => item.rate);
      const _taxExempted = response.exempt?.exempt || false;
      // setMaterialWork({ type: "ADD_MULTIPLE", payload: response.material });

      console.log({ _rate, _trip });
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
      {loading ? (
        <Loading />
      ) : (
        <EstimateAddForm
          details={{ ...data, store: data?.ticket?.store }}
          dataForm={{
            disabled: true,
            selectedVendor,
            validation,
            showIncurred: props.showIncurred,
            ticketVendor: [],
            collapse,
            t_collapse,
            addIncurred,
            setLabourWork,
            incurredLabourObj,
            labourWork,
            rateType,
            tripType,
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
            setVendor,
            setDraft,
          }}
        />
      )}
    </Fragment>
  );
};

export default EstimateRevise;
