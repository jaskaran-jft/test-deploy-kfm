import {
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
import { withTranslation } from "react-i18next";
import CropEasy from "../../common/reactEasyCrop/cropEasy";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import IntlTelInput from "react-intl-tel-input";
import { withRouter } from "react-router-dom";
import AddTenantAddress from "./AddTenantAddress";
import AddTenantSecondaryAddress from "./AddTenantSecondaryAddress";

const AddTenantInputs = (props) => {
  const {
    validation,
    imgUpload,
    editPage,
    id,
    openModal,
    setOpenModal,
    setImgUpload,
    imageUpload,
    handleEditChange,
    handleDomainNameChange,
    checkDomain,
    handleChangeNumber,
    handleContactValidation,
    initialValue,
    addressTypeList,
    handleCheck,
    isChecked,
    addNewAddress,
  } = props.data;
  return (
    <Form
      className="needs-validation"
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      {/* <h5 className="pb-3">General Info</h5> */}
      <div className="d-flex justify-content-between">
        <h5 className="pb-3">General info</h5>
        <div className="d-flex">
          {(imgUpload === "" && !id) || (editPage && id) ? (
            <Col className="p-2" style={{ cursor: "pointer" }}>
              <label htmlFor="file">
                <i className="mdi mdi-folder-upload bx-sm text-primary"></i>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  name="image"
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                  multiple=""
                  data-original-title="upload photos"
                  onChange={(e) => imageUpload(e.target.files)}
                  disabled={id && !editPage}
                />
              </label>
            </Col>
          ) : null}
          {openModal ? (
            <CropEasy
              imgUpload={imgUpload}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setImgUpload={setImgUpload}
            />
          ) : null}
          {id ? (
            editPage ? (
              <Col className="p-2" style={{ cursor: "pointer" }}></Col>
            ) : (
              <Col className="p-2" style={{ cursor: "pointer" }}>
                <div
                  onClick={() => handleEditChange()}
                  title="Edit"
                  style={{ cursor: "pointer" }}
                >
                  {/* <div color="primary">Edit icon</div> */}
                  <i className="bx bxs-edit-alt bx-sm text-primary"></i>
                </div>
              </Col>
            )
          ) : null}
        </div>
      </div>
      <Row>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Domain Name {editPage ? "*" : ""} </Label>
            {id && !editPage ? (
              <h6>{validation.values.tenant?.domainName || "--"}</h6>
            ) : (
              <div className="position-relative auth-pass-inputgroup">
                <Input
                  name="tenant.domainName"
                  placeholder="Enter Domain Name *"
                  type="text"
                  className="form-control"
                  // onChange={validation.handleChange}
                  onChange={(e) => {
                    handleDomainNameChange(e);
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.tenant?.domainName || ""}
                  invalid={
                    validation.touched.tenant?.domainName &&
                    validation.errors.tenant?.domainName
                      ? true
                      : false
                  }
                />
                {validation.touched.tenant?.domainName &&
                validation.errors.tenant?.domainName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.tenant?.domainName}
                  </FormFeedback>
                ) : null}
                <button
                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                  type="button"
                  id="password-addon"
                >
                  <i
                    className={
                      validation.values.tenant?.domainName === ""
                        ? null
                        : !checkDomain
                        ? "ri-checkbox-circle-fill"
                        : "ri-close-circle-fill"
                    }
                  ></i>
                </button>
              </div>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Corporate Name {editPage ? "*" : ""} </Label>
            {id && !editPage ? (
              <h6>{validation.values.tenant?.name || "--"}</h6>
            ) : (
              <>
                <Input
                  name="tenant.name"
                  placeholder="Enter Corporate Name *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.tenant?.name || ""}
                  invalid={
                    validation.touched.tenant?.name &&
                    validation.errors.tenant?.name
                      ? true
                      : false
                  }
                />
                {validation.touched.tenant?.name &&
                validation.errors.tenant?.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.tenant?.name}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Short Code {editPage ? "*" : ""} </Label>
            {id && !editPage ? (
              <h6>{validation.values.tenant?.shortCode || "--"}</h6>
            ) : (
              <>
                <Input
                  name="tenant.shortCode"
                  placeholder="Enter Short Code *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.tenant?.shortCode || ""}
                  invalid={
                    validation.touched.tenant?.shortCode &&
                    validation.errors.tenant?.shortCode
                      ? true
                      : false
                  }
                />
                {validation.touched.tenant?.shortCode &&
                validation.errors.tenant?.shortCode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.tenant?.shortCode}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Work order dispatch email {editPage ? "*" : ""} </Label>
            {id && !editPage ? (
              <h6>{validation.values.contact?.email || "--"}</h6>
            ) : (
              <>
                <Input
                  name="contact.email"
                  placeholder="Enter Work order dispatch email *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contact?.email || ""}
                  invalid={
                    validation.touched.contact?.email &&
                    validation.errors.contact?.email
                      ? true
                      : false
                  }
                />
                {validation.touched.contact?.email &&
                validation.errors.contact?.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contact?.email}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Website</Label>
            {id && !editPage ? (
              <h6>{validation.values.contact?.website || "--"}</h6>
            ) : (
              <>
                <Input
                  name="contact.website"
                  placeholder="Enter Website"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contact?.website || ""}
                  invalid={
                    validation.touched.contact?.website &&
                    validation.errors.contact?.website
                      ? true
                      : false
                  }
                />
                {validation.touched.contact?.website &&
                validation.errors.contact?.website ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contact?.website}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Corporate Telephone {editPage ? "*" : ""} </Label>
            {id && !editPage ? (
              <h6>{validation.values.contact?.telephone || "--"}</h6>
            ) : (
              <>
                <IntlTelInput
                  containerClassName="intl-tel-input"
                  name="contact.telephone"
                  inputClassName={`form-control ${
                    validation.touched.contact?.telephone &&
                    validation.values.contact?.telephone === ""
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{ width: "100%" }}
                  onPhoneNumberChange={(e, value, country) =>
                    handleChangeNumber(e, value, country, "contact.telephone")
                  }
                  onPhoneNumberBlur={(e, value, country) =>
                    handleContactValidation(
                      e,
                      value,
                      country,
                      "contact.telephone",
                    )
                  }
                  formatOnInit
                  value={
                    validation?.values.contact?.telephone ||
                    initialValue?.contact?.telephone
                  }
                  onlyCountries={["us", "ca", "pr"]}
                  defaultCountry={"us"}
                  length={10}
                  preferredCountries={["us"]}
                  invalid={
                    validation.values.contact?.telephone?.length < 1 ||
                    (validation.touched.contact?.telephone &&
                    validation.errors.contact?.telephone
                      ? true
                      : false)
                  }
                />
                {validation.touched.contact?.telephone &&
                validation.errors.contact?.telephone ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.contact?.telephone}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Dial-in IVR Number {editPage ? "*" : ""} </Label>
            {id && !editPage ? (
              <h6>{validation.values.contact?.dialInNumber || "--"}</h6>
            ) : (
              <>
                <IntlTelInput
                  containerClassName="intl-tel-input"
                  name="contact.dialInNumber"
                  inputClassName={`form-control ${
                    validation.touched.contact?.dialInNumber &&
                    validation.values.contact?.dialInNumber === ""
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{ width: "100%" }}
                  onPhoneNumberChange={(e, value, country) =>
                    handleChangeNumber(
                      e,
                      value,
                      country,
                      "contact.dialInNumber",
                    )
                  }
                  onPhoneNumberBlur={(e, value, country) =>
                    handleContactValidation(
                      e,
                      value,
                      country,
                      "contact.dialInNumber",
                    )
                  }
                  formatOnInit
                  value={
                    validation.values.contact?.dialInNumber ||
                    initialValue.contact.dialInNumber
                  }
                  onlyCountries={["us", "ca", "pr"]}
                  defaultCountry={"us"}
                  length={10}
                  preferredCountries={["us"]}
                  invalid={
                    validation.values.contact?.dialInNumber?.length < 1 ||
                    (validation.touched.contact?.dialInNumber &&
                    validation.errors.contact?.dialInNumber
                      ? true
                      : false)
                  }
                />
                {validation.touched.contact?.dialInNumber &&
                validation.errors.contact?.dialInNumber ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.contact?.dialInNumber}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Pin Number / Instructions</Label>
            {id && !editPage ? (
              <h6>{validation.values.contact?.dialInInstruction || "--"}</h6>
            ) : (
              <>
                <Input
                  name="contact.dialInInstruction"
                  placeholder="Enter Pin Number / Instructions"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contact?.dialInInstruction || ""}
                  invalid={
                    validation.touched.contact?.dialInInstruction &&
                    validation.errors.contact?.dialInInstruction
                      ? true
                      : false
                  }
                />
                {validation.touched.contact?.dialInInstruction &&
                validation.errors.contact?.dialInInstruction ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contact?.dialInInstruction}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        {imgUpload !== "" && !openModal ? (
          <Col md="3">
            <FormGroup className="mb-3">
              <Label className="d-block">Logo</Label>
              <div id="container">
                <button
                  id="x"
                  onClick={() => setImgUpload("")}
                  disabled={id && !editPage}
                >
                  X
                </button>
                <img alt="Logo" src={imgUpload} width="150px" height="100px" />
              </div>
            </FormGroup>
          </Col>
        ) : null}

        <Col md="12">
          <FormGroup className="mb-3">
            <Label>Dial-in Notes</Label>
            {id && !editPage ? (
              <h6
                dangerouslySetInnerHTML={{
                  __html: validation.values.contact?.dialInNotes || "--",
                }}
              />
            ) : (
              <>
                <CKEditor
                  editor={ClassicEditor}
                  data={validation.values.contact?.dialInNotes || ""}
                  name="contact.dialInNotes"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    validation.setFieldValue("contact.dialInNotes", data);
                  }}
                  config={{
                    height: 100,
                  }}
                  id="editor"
                  onBlur={() => {
                    validation.handleBlur();
                  }}
                />
              </>
            )}
          </FormGroup>
        </Col>
      </Row>
      <hr></hr>

      <h5 className="pb-3">Primary contact info</h5>

      <Row>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Primary Contact Name {editPage ? "*" : ""} </Label>
            {id && !editPage ? (
              <h6>{validation.values.contact?.primaryContactName || "--"}</h6>
            ) : (
              <>
                <Input
                  name="contact.primaryContactName"
                  placeholder="Enter Primary Contact Name *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contact?.primaryContactName || ""}
                  invalid={
                    validation.touched.contact?.primaryContactName &&
                    validation.errors.contact?.primaryContactName
                      ? true
                      : false
                  }
                />
                {validation.touched.contact?.primaryContactName &&
                validation.errors.contact?.primaryContactName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contact?.primaryContactName}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Primary Contact Email {editPage ? "*" : ""} </Label>
            {id && !editPage ? (
              <h6>{validation.values.contact?.primaryContactEmail || "--"}</h6>
            ) : (
              <>
                <Input
                  name="contact.primaryContactEmail"
                  placeholder="Enter Primary Contact Email *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contact?.primaryContactEmail || ""}
                  invalid={
                    validation.touched.contact?.primaryContactEmail &&
                    validation.errors.contact?.primaryContactEmail
                      ? true
                      : false
                  }
                />
                {validation.touched.contact?.primaryContactEmail &&
                validation.errors.contact?.primaryContactEmail ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contact?.primaryContactEmail}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Primary Contact Phone {editPage ? "*" : ""} </Label>
            {id && !editPage ? (
              <h6>{validation.values.contact?.primaryContactPhone || "--"}</h6>
            ) : (
              <>
                <IntlTelInput
                  containerClassName="intl-tel-input"
                  name="contact.primaryContactPhone"
                  inputClassName={`form-control ${
                    validation.touched.contact?.primaryContactPhone &&
                    validation.values.contact?.primaryContactPhone === ""
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{ width: "100%" }}
                  onPhoneNumberChange={(e, value, country) =>
                    handleChangeNumber(
                      e,
                      value,
                      country,
                      "contact.primaryContactPhone",
                    )
                  }
                  onPhoneNumberBlur={(e, value, country) =>
                    handleContactValidation(
                      e,
                      value,
                      country,
                      "contact.primaryContactPhone",
                    )
                  }
                  formatOnInit
                  value={
                    validation.values.contact?.primaryContactPhone ||
                    initialValue.contact.primaryContactPhone
                  }
                  onlyCountries={["us", "ca", "pr"]}
                  defaultCountry={"us"}
                  length={10}
                  preferredCountries={["us"]}
                  invalid={
                    validation.values.contact?.primaryContactPhone?.length <
                      1 ||
                    (validation.touched.contact?.primaryContactPhone &&
                    validation.errors.contact?.primaryContactPhone
                      ? true
                      : false)
                  }
                />
                {validation.touched.contact?.primaryContactPhone &&
                validation.errors.contact?.primaryContactPhone ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.contact?.primaryContactPhone}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Ext.</Label>
            {id && !editPage ? (
              <h6>{validation.values.contact?.ext || "--"}</h6>
            ) : (
              <Input
                name="contact.ext"
                placeholder="Enter Ext."
                type="text"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.contact?.ext || ""}
              />
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Cellphone {editPage ? "*" : ""} </Label>
            {id && !editPage ? (
              <h6>{validation.values.contact?.cellphone || "--"}</h6>
            ) : (
              <>
                <IntlTelInput
                  containerClassName="intl-tel-input"
                  name="contact.cellphone"
                  inputClassName={`form-control ${
                    validation.touched.contact?.cellphone &&
                    validation.values.contact?.cellphone === ""
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{ width: "100%" }}
                  onPhoneNumberChange={(e, value, country) =>
                    handleChangeNumber(e, value, country, "contact.cellphone")
                  }
                  onPhoneNumberBlur={(e, value, country) =>
                    handleContactValidation(
                      e,
                      value,
                      country,
                      "contact.cellphone",
                    )
                  }
                  formatOnInit
                  value={
                    validation.values.contact?.cellphone ||
                    initialValue.contact.cellphone
                  }
                  onlyCountries={["us", "ca", "pr"]}
                  defaultCountry={"us"}
                  length={10}
                  preferredCountries={["us"]}
                  invalid={
                    validation.values.contact?.cellphone?.length < 1 ||
                    (validation.touched.contact?.cellphone &&
                    validation.errors.contact?.cellphone
                      ? true
                      : false)
                  }
                />

                {validation.touched.contact?.cellphone &&
                validation.errors.contact?.cellphone ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.contact?.cellphone}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
      </Row>
      <hr></hr>
      <h5 className="pb-3">Corporate address</h5>

      <AddTenantAddress {...props} />
      <hr></hr>
      <Row>
        <Col>
          <h5 className="pb-3">{props.t("Secondary address")}</h5>
        </Col>
        {!id && (
          <Col md="5" style={{ justifyContent: "flex-end" }}>
            <FormGroup
              style={{ float: "right", display: "inline" }}
              className="pb-1"
            >
              <Input
                name="isChecked"
                placeholder="Is Recall"
                type="checkbox"
                className="form-control"
                onChange={handleCheck}
                onBlur={validation.handleBlur}
                checked={isChecked || false}
                value={isChecked || false}
                style={{ display: "inline-block" }}
              />
              <Label style={{ marginLeft: 10 }}>
                {props.t("Same as above")}
              </Label>
            </FormGroup>
          </Col>
        )}
      </Row>
      {validation.values.address.length < addressTypeList.length && editPage ? (
        <div className="add-option d-flex flex-row justify-content-end">
          <i className="bx bx-plus text-primary font-weight-bold d-flex align-items-center"></i>
          <div
            className="text-primary font-weight-bold d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => (id && !editPage ? null : addNewAddress())}
          >
            Add Address
          </div>
        </div>
      ) : null}
      <AddTenantSecondaryAddress {...props} />

      <div className="d-flex flex-md-row justify-content-between">
        {!id ? (
          <Button color="primary" type="submit">
            Add Corporate
          </Button>
        ) : id && !editPage ? null : (
          <Button color="primary" type="submit">
            Update Corporate
          </Button>
        )}
      </div>

      {id && !editPage && (
        <Row>
          <Col lg={12}>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  props.history.push({
                    pathname: "/addCorporateUser",
                    search: "",
                    hash: "",
                    state: { type: "Corporate", id: id },
                  })
                }
              >
                {props.t("Add Corporate User")}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  props.history.push({
                    pathname: "/addClient",
                    search: "",
                    hash: "",
                    state: { type: "Client", id: id },
                  })
                }
              >
                {props.t("Add Brand")}
              </button>
            </div>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default withRouter(withTranslation()(AddTenantInputs));
