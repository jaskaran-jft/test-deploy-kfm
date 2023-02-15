import { Fragment, useState } from "react";
import FormModal from "./FormModal";

const TableDescription = ({ children, title, row = "" }) => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow((prev) => !prev);
  };

  const length = JSON.stringify(row).length;

  return (
    <Fragment>
      <FormModal
        small={
          length > 4000
            ? "xl"
            : length > 2000
            ? "lg"
            : length > 1000
            ? "md"
            : "sm"
        }
        toggle={toggle}
        title={`Ticket #${title}`}
        open={show}
      >
        <h5 className="fs-15">Description: </h5>
        <div className="text-muted">{children}</div>
      </FormModal>
      <div
        data-id={"one"}
        className="custom_description"
        ref={(node) => {
          if (node) {
            node.style.setProperty("overflow", "hidden", "important");
          }
        }}
        onClick={toggle}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default TableDescription;
