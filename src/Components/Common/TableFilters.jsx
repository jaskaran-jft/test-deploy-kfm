import Flatpickr from "react-flatpickr";
import { withTranslation } from "react-i18next";
import { Row, Col, Input, FormGroup, Label } from "reactstrap";
import { noop } from "src/helpers/format_helper";

const TableFilters = ({
  handleChange = noop,
  value = {},
  t = noop,
  status = false,
  options = [],
}) => {
  return (
    <Row>
      <Col className="col-md-12">
        <div className="card">
          <div className="card-header">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <h5 className="card-title mb-0">{t("Filters")}</h5>
              </div>
            </div>
          </div>
          <div className="card-body">
            <Row>
              <Col md="4">
                <FormGroup className="">
                  <Label>{t("Select Range")} </Label>
                  <div className="input-group">
                    <Flatpickr
                      className="form-control border-0 dash-filter-picker shadow"
                      options={{
                        mode: "range",
                        dateFormat: "d M, Y",
                        defaultDate: ["01 Jan 2022", "31 Jan 2022"],
                      }}
                      name="date"
                      value={value.date || ""}
                      onChange={handleChange}
                    />
                    <div className="input-group-text bg-primary border-primary text-white">
                      <i className="ri-calendar-2-line"></i>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              {status ? (
                <Col md="4">
                  <FormGroup className="">
                    <Label>{t("Status")}</Label>
                    <>
                      <Input
                        type="select"
                        name="status"
                        className="form-control"
                        onChange={handleChange}
                        value={value.status || ""}
                      >
                        <option value="">{t("Select Status")}</option>
                        {options?.map((option, index) => (
                          <option key={index} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </Input>
                    </>
                  </FormGroup>
                </Col>
              ) : null}
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default withTranslation()(TableFilters);
