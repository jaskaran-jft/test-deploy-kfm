import { Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loading from "src/common/Loader";
import { CONSTANT } from "src/utils/constant";
import DragAndDropFile from "src/Components/Common/DragAndDropFile";
import { useSelector } from "react-redux";

const AddExpenseForm = (props) => {
  const { tags = [], userData = {} } = useSelector((state) => state.Login);

  const {
    validation,
    loading,
    setShowExpense,
    expenseTypes = [],
    files = [],
    handleFileDelete,
    handleFile,
    hasSubmit,
    setHasSubmit,
    trips = [],
    details,
  } = props;

  const { ticketVendor = [] } = details;

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
            setHasSubmit(true);
          }}
        >
          <Row>
            {tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN) && (
              <Col md="12">
                <FormGroup className="mb-3">
                  <Label>Vendor *</Label>
                  <>
                    <Input
                      type="select"
                      name="vendorId"
                      placeholder="Select Vendor *"
                      className="form-control"
                      onChange={(e) => {
                        validation.setFieldValue("vendorId", e.target.value);
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

            <Col md="6">
              <FormGroup className="mb-3">
                <Label>Expense Name *</Label>
                <Input
                  name="name"
                  placeholder="Expense Name *"
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
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup className="mb-3">
                <Label>Type *</Label>
                <>
                  <Input
                    type="select"
                    name="typeId"
                    placeholder="Select Type *"
                    className="form-control"
                    onChange={(e) => {
                      validation.setFieldValue("typeId", e.target.value);
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values?.typeId || ""}
                    invalid={
                      validation.touched?.typeId && validation.errors?.typeId
                        ? true
                        : false
                    }
                  >
                    <option value="">Select Type</option>
                    {expenseTypes?.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched?.typeId && validation.errors.typeId ? (
                    <FormFeedback typeId="invalid">
                      {validation.errors?.typeId}
                    </FormFeedback>
                  ) : null}
                </>
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup className="mb-3">
                <Label>Trip </Label>
                <>
                  <Input
                    type="select"
                    name="tripId"
                    placeholder="Select Trip "
                    className="form-control"
                    onChange={(e) => {
                      validation.setFieldValue("tripId", e.target.value);
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values?.tripId || ""}
                    invalid={
                      validation.touched?.tripId && validation.errors?.tripId
                        ? true
                        : false
                    }
                  >
                    <option value="">Select Trip</option>
                    {trips?.map((option, index) => (
                      <option key={index} value={option.id}>
                        # {option.trackingId}
                      </option>
                    ))}
                  </Input>
                  {validation.touched?.tripId && validation.errors.tripId ? (
                    <FormFeedback tripId="invalid">
                      {validation.errors?.tripId}
                    </FormFeedback>
                  ) : null}
                </>
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup className="mb-3">
                <Label>Purchased By *</Label>
                <>
                  <Input
                    type="select"
                    name="purchasedBy"
                    placeholder="Purchased By *"
                    className="form-control"
                    onChange={(e) => {
                      validation.setFieldValue("purchasedBy", e.target.value);
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values?.purchasedBy || ""}
                    invalid={
                      validation.touched?.purchasedBy &&
                      validation.errors?.purchasedBy
                        ? true
                        : false
                    }
                  >
                    <option value="">Select Purchased By</option>
                    {CONSTANT?.PURCHASE_BY.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched?.purchasedBy &&
                  validation.errors.purchasedBy ? (
                    <FormFeedback purchasedBy="invalid">
                      {validation.errors?.purchasedBy}
                    </FormFeedback>
                  ) : null}
                </>
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup className="mb-3">
                <Label>Amount </Label>
                <Input
                  name="amount"
                  placeholder="Amount "
                  type="number"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.amount || ""}
                  invalid={
                    (validation.touched.amount && validation.errors.amount) ||
                    (validation.values.splitExpense &&
                      Number(validation.values.amount) <
                        Number(validation.values.partAmount))
                      ? true
                      : false
                  }
                />
                {validation.touched.amount && validation.errors.amount ? (
                  <FormFeedback type="invalid">
                    {validation.errors.amount}
                  </FormFeedback>
                ) : null}
                {validation.values.splitExpense &&
                Number(validation.values.amount) <
                  Number(validation.values.partAmount) ? (
                  <FormFeedback type="invalid">
                    Amount can't be less than part Amt.
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup className="mb-3">
                <Label>Tax </Label>
                <Input
                  name="tax"
                  placeholder="Tax "
                  type="number"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.tax || ""}
                  invalid={
                    validation.touched.tax && validation.errors.tax
                      ? true
                      : false
                  }
                />
                {validation.touched.tax && validation.errors.tax ? (
                  <FormFeedback type="invalid">
                    {validation.errors.tax}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup className="mb-3">
                <Label>Quantity </Label>
                <Input
                  name="quantity"
                  placeholder="Quantity "
                  type="number"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.quantity || ""}
                  invalid={
                    validation.touched.quantity && validation.errors.quantity
                      ? true
                      : false
                  }
                />
                {validation.touched.quantity && validation.errors.quantity ? (
                  <FormFeedback type="invalid">
                    {validation.errors.quantity}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup className="mb-3">
                <Label>Supplier *</Label>
                <Input
                  name="supplier"
                  placeholder="Supplier *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.supplier || ""}
                  invalid={
                    validation.touched.supplier && validation.errors.supplier
                      ? true
                      : false
                  }
                />
                {validation.touched.supplier && validation.errors.supplier ? (
                  <FormFeedback type="invalid">
                    {validation.errors.supplier}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup className="mb-3">
                <Label>Split Expense</Label>
                <Input
                  name="splitExpense"
                  placeholder="Split Expense"
                  type="checkbox"
                  className="form-control"
                  onChange={() =>
                    validation.setFieldValue(
                      "splitExpense",
                      !validation.values.splitExpense,
                    )
                  }
                  onBlur={validation.handleBlur}
                  value={validation.values.splitExpense}
                  invalid={
                    validation.touched.splitExpense &&
                    validation.errors.splitExpense
                      ? true
                      : false
                  }
                />
                {validation.touched.splitExpense &&
                validation.errors.splitExpense ? (
                  <FormFeedback type="invalid">
                    {validation.errors.splitExpense}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>

            {validation.values.splitExpense ? (
              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Part Amount</Label>
                  <Input
                    name="partAmount"
                    placeholder="Part Amount"
                    type="number"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.partAmount || ""}
                    invalid={
                      validation.touched.partAmount &&
                      validation.errors.partAmount
                        ? true
                        : false
                    }
                  />
                  {validation.touched.partAmount &&
                  validation.errors.partAmount ? (
                    <FormFeedback type="invalid">
                      {validation.errors.partAmount}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            ) : null}

            <Col md="12">
              <div className="mb-3">
                <DragAndDropFile
                  multiple={true}
                  accept=".jpg, .jpeg, .png, .pdf, .mp4"
                  handleFile={handleFile}
                />
              </div>
            </Col>
            {hasSubmit &&
            validation.values.purchasedBy === "Vendor" &&
            files.length === 0 ? (
              <div className="invalid-feedback" style={{ display: "block" }}>
                File is required field
              </div>
            ) : null}
            {files.length > 0 && (
              <Col md="12">
                <div className="mb-3 file-list-container">
                  <CardGroup
                    style={{
                      flexWrap: "nowrap",
                      overflowX: "scroll",
                      overflowY: "hidden",
                    }}
                  >
                    {files.map((file, index) => (
                      <Card
                        style={{
                          flexBasis: "180px",
                          marginRight: 15,
                          marginLeft: index === 0 ? "3rem" : 0,
                        }}
                        key={index}
                      >
                        <CardImg
                          alt="file image"
                          src={URL.createObjectURL(file)}
                          top
                          width="100%"
                          style={{
                            height: "12rem",
                            width: "180px",
                            objectFit: "fill",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            window
                              .open(URL.createObjectURL(file), "_blank")
                              .focus();
                          }}
                        />
                        <CardBody>
                          <CardTitle tag="h5">{file.fileName}</CardTitle>
                          <Button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => handleFileDelete(e, index)}
                          >
                            Delete
                          </Button>
                        </CardBody>
                      </Card>
                    ))}
                  </CardGroup>
                </div>
              </Col>
            )}

            <Col md="12 mt-2">
              <FormGroup className="mb-3">
                <Label>Description</Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={validation.values.description || ""}
                  name="description"
                  onChange={(_, editor) => {
                    const data = editor.getData();
                    validation.setFieldValue("description", data);
                  }}
                />
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
                setShowExpense(false);
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

export default AddExpenseForm;
