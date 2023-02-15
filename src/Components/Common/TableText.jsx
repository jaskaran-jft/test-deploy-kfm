import { Fragment, useState } from "react";
import FormModal from "./FormModal";

const TableText = ({ children }) => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <Fragment>
      {/* <FormModal toggle={toggle} title="" open={show}>
        {children}
      </FormModal> */}
      <div
        className="text_truncate"
        ref={(node) => {
          if (node) {
            node.style.setProperty("white-space", "nowrap", "important");
            node.style.setProperty("overflow", "hidden", "important");
            node.style.setProperty("max-width", "10vw", "important");
            node.style.setProperty("text-overflow", "ellipsis", "important");
          }
        }}
        onClick={toggle}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default TableText;
