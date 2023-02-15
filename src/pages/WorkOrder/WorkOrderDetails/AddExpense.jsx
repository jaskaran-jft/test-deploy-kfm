import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "reactstrap";
import { object, string, array, number, boolean } from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import FormModal from "src/Components/Common/FormModal";
import { CONSTANT } from "src/utils/constant";
import AddExpenseForm from "./AddExpenseForm";
import {
  addExpense,
  getExpenseType,
  getTripDropdown,
} from "src/helpers/WorkOrder";
import Notify from "src/common/Toaster/toast";
import ExpenseList from "src/pages/Expenses/ExpenseList";

const AddExpenseComponent = (props) => {
  const [showExpense, setShowExpense] = useState(false);
  const { tags = [], userData = {} } = useSelector((state) => state.Login);
  const [loading, setLoading] = useState(false);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [files, setFiles] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [trips, setTrips] = useState([]);

  const { details = {} } = props;

  const payDetailSchema = useState({
    name: "",
    typeId: "",
    purchasedBy: "",
    description: "",
    files: "",
    supplier: "",
    amount: 0,
    quantity: 0,
    tax: 0,
    tripId: "",
    splitExpense: false,
    partAmount: 0,
    vendorId: "",
  })[0];

  const validationSchema = object().shape({
    name: string().required("Expense name is required"),
    typeId: string().required("Expense type is required"),
    purchasedBy: string().required("Purchased by is required"),
    files: string().notRequired(),
    description: string().notRequired(),
    supplier: string().required("Supplier is required"),
    amount: number().notRequired(),
    quantity: number().notRequired(),
    tax: number().notRequired(),
    tripId: string().notRequired(),
    splitExpense: boolean().notRequired(),
    partAmount: number().notRequired(),
    vendorId: tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)
      ? string().required("Vendor is a required field")
      : string().notRequired(),
  });

  const validation = useFormik({
    initialValues: payDetailSchema,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (!tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)) {
      validation.setFieldValue("vendorId", userData.vendorId);
    }
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log({ outer: values });

      if (
        Number(validation.values.amount) >=
          Number(validation.values.partAmount) &&
        ((values.purchasedBy === "Vendor" && files.length > 0) ||
          values.purchasedBy === "Stock")
      ) {
        console.log({ submitExpense: values });
        const form = new FormData();
        Object.entries(values).map((key) => {
          form.append(key[0], key[1]);
          return key;
        });

        form.delete("files");

        form.append("ticketId", details.id);

        for (let i = 0; i < files.length; i++) {
          form.append("files", files[i]);
        }

        const response = await addExpense(form);
        Notify(response.message, true);
        setLoading(false);
        props.update();
        validation.setFieldValue("splitExpense", false);
        toggle();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log({ error });
      validation.setFieldValue("splitExpense", false);
      Notify(error, false);
      setLoading(false);
    }
  };

  const toggle = () => setShowExpense((prev) => !prev);

  const handleExpense = async () => {
    setLoading(true);
    setShowExpense((prev) => !prev);
    try {
      const response = await getExpenseType();
      const tripsList = await getTripDropdown({ ticketId: details.id });
      setExpenseTypes(response);
      setLoading(false);
      if (tripsList.trip) {
        setTrips(tripsList.trip);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFile = (file) => {
    setFiles((prev) => {
      validation.setFieldValue("files", JSON.stringify([...prev, ...file]));
      return [...prev, ...file];
    });
  };

  const handleFileDelete = (e, index) => {
    e.preventDefault();
    setFiles((prev) => {
      const data = prev;
      data.splice(index, 1);
      validation.setFieldValue("files", JSON.stringify([...data]));
      return [...data];
    });
  };

  return (
    <Fragment>
      <FormModal
        open={showExpense}
        toggle={toggle}
        title="Add Expense"
        showFooter={false}
        width
      >
        <AddExpenseForm
          validation={validation}
          loading={loading}
          details={details}
          expenseTypes={expenseTypes}
          setShowExpense={setShowExpense}
          files={files}
          setFiles={setFiles}
          handleFileDelete={handleFileDelete}
          handleFile={handleFile}
          setHasSubmit={setHasSubmit}
          hasSubmit={hasSubmit}
          trips={trips}
        />
      </FormModal>

      <Form>
        <Row md="12">
          <Col>
            <h5>Expenses</h5>
          </Col>
          {tags.includes(CONSTANT.CREATE_ESTIMATE) && (
            <Col style={{ alignSelf: "flex-end" }}>
              <Button
                type="button"
                style={{ float: "right" }}
                color="primary"
                onClick={handleExpense}
              >
                Add Expense
              </Button>
            </Col>
          )}
        </Row>

        <hr></hr>
        <Row className="trip-list">
          <ExpenseList id={details.id} />
        </Row>
      </Form>
    </Fragment>
  );
};

export default AddExpenseComponent;
