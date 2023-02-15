import React from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";

const MaterialInputs = (props) => {
  const { validation, change, setChange, handleDelete, index } = props;
  const { quantity = 0, unitPrice = 0 } = validation;
  const netValue = Number(Number(quantity) * Number(unitPrice)).toFixed(2);

  return (
    <Row>
      <Col md="1">
        <FormGroup className="mb-3">
          <Label>Qty. *</Label>
          <Input
            name="quantity"
            placeholder="Qty *"
            type="number"
            className="form-control"
            onChange={(e) => change(e, setChange, index)}
            value={validation.quantity}
            invalid={validation.quantity === ""}
          />
          {validation.quantity === "" ? (
            <FormFeedback type="invalid">
              {"This field is invalid"}
            </FormFeedback>
          ) : null}
        </FormGroup>
      </Col>

      <Col md="6">
        <FormGroup className="mb-3">
          <Label>Description</Label>
          <Input
            name="description"
            placeholder="Description"
            type="text"
            className="form-control"
            onChange={(e) => change(e, setChange, index)}
            value={validation.description || ""}
          />
        </FormGroup>
      </Col>
      <Col md="2">
        <FormGroup className="mb-3">
          <Label>Unit Price *</Label>
          <Input
            name="unitPrice"
            placeholder="Unit Price *"
            type="number"
            className="form-control"
            onChange={(e) => change(e, setChange, index)}
            value={validation.unitPrice}
            invalid={validation.unitPrice === ""}
          />
          {validation.unitPrice === "" ? (
            <FormFeedback type="invalid">
              {"This field is invalid"}
            </FormFeedback>
          ) : null}
        </FormGroup>
      </Col>
      <Col md="2">
        <FormGroup className="mb-3">
          <Label>Net Price</Label>
          <Input
            name="netPrice"
            placeholder=""
            type="number"
            disabled={true}
            className="form-control"
            onChange={(e) => change(e, setChange, index)}
            value={netValue || 0}
          />
        </FormGroup>
      </Col>
      {
        <Col md="1">
          <FormGroup className="mb-3">
            <Label>&nbsp;</Label>
            <br />
            <span
              className="mdi mdi-delete btn-danger-text "
              onClick={() => handleDelete(setChange, index)}
            ></span>
          </FormGroup>
        </Col>
      }
    </Row>
  );
};

export default MaterialInputs;
