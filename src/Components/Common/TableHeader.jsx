import { Fragment } from "react";
import { Button, Input } from "reactstrap";
import { noop } from "src/helpers/format_helper";

const TableListHeader = ({
  onSearchResources,
  show = false,
  onClick = noop,
  title = "+",
  show2 = false,
  onClick2 = noop,
  title2 = "+",
  toggle = noop,
  hideFilters = false,
}) => {
  return (
    <Fragment>
      <div className="d-flex justify-content-end">
        <div>
          <Input
            placeholder="Search"
            onChange={(e) => onSearchResources(e)}
          ></Input>
        </div>
        {show && (
          <div>
            <Button
              className="ml-3"
              color="primary"
              type="button"
              onClick={onClick}
            >
              {title}
            </Button>
          </div>
        )}
        {show2 && (
          <div>
            <button
              type="button"
              className="btn btn-soft-danger ml-3"
              onClick={onClick2}
            >
              {title2}
            </button>
          </div>
        )}
        {!hideFilters ? (
          <button
            type="button"
            onClick={toggle}
            className="btn btn-success btn-icon waves-effect waves-light layout-rightside-btn ml-3"
          >
            <i className="mdi mdi-tune fs-22"></i>
          </button>
        ) : null}
      </div>
    </Fragment>
  );
};

export default TableListHeader;
