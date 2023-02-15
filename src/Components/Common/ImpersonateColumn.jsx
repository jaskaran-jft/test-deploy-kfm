import { Fragment } from "react";
import { UncontrolledTooltip } from "reactstrap";

const ImpersonateColumn = ({ ImpersonateUser, props, dispatch, id }) => {
  return (
    <Fragment>
      <span
        onClick={(e) => ImpersonateUser(e, id, props, dispatch)}
        className="ri-exchange-line add-btn"
        id={`tooltipTop${id}`}
      ></span>
      <UncontrolledTooltip placement="left" target={`tooltipTop${id}`}>
        Impersonate
      </UncontrolledTooltip>
    </Fragment>
  );
};

export default ImpersonateColumn;
