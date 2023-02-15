import React, { Fragment, useState } from "react";
import Loading from "../../../common/Loader";
import { Form, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { object, string } from "yup";
import { useFormik } from "formik";
import Notify from "src/common/Toaster/toast";

const EstimateActionButton = (props) => {
  const [loading, setLoading] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);
  const validation = object().shape({
    comment: string().notRequired(),
  });

  const comment = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    if (props.cancel && comment.values.comment.length === 0) {
      console.log("if");
    } else {
      setLoading(true);
      try {
        const payload = { ...values };
        if (props.invoice) {
          payload.invoiceId = props.id;
        } else {
          payload.estimateId = props.id;
        }

        const response = await props.api(payload);
        setLoading(false);
        props.toggle();
        Notify(response.message, true);
      } catch (error) {
        setLoading(false);
        Notify(error, false);
      }
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
            comment.handleSubmit();
            setHasSubmit(true);
          }}
        >
          <Row>
            <Col md="12">
              <FormGroup className="mb-3">
                <Label>Comment {props.cancel ? "*" : ""}</Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={comment.values.comment || ""}
                  name="comment"
                  onChange={(_, editor) => {
                    const data = editor.getData();
                    comment.setFieldValue("comment", data);
                  }}
                />
                {props.cancel &&
                hasSubmit &&
                comment.values.comment.length === 0 ? (
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
          </div>
        </Form>
      )}
    </Fragment>
  );
};

export default EstimateActionButton;
