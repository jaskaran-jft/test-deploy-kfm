import React from "react";
import { Modal, ModalBody } from "reactstrap";

const LoginModal = (props) => {
  return (
    <Modal
      id="success-Payment"
      tabIndex="-1"
      isOpen={props.isOpen}
      toggle={props.toggle}
      centered
    >
      <ModalBody className="text-center p-5">
        <div className="text-end">
          <button
            type="button"
            onClick={props.toggle}
            className="btn-close text-end"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="mt-2">
          <lord-icon
            src="https://cdn.lordicon.com/tqywkdcz.json"
            trigger="hover"
            style={{ width: "150px", height: "150px" }}
          ></lord-icon>
          <h4 className="mb-3 mt-4">Your Login is Successful !</h4>
          <p className="text-muted fs-15 mb-4">
            Thanks you for signing into FMI portal. Would you like to change
            your password or continue with the current password.
          </p>
          <div className="hstack gap-2 justify-content-center">
            <button className="btn btn-primary" onClick={props.changePassword}>
              Change Password
            </button>
            <button className="btn btn-soft-success" onClick={props.toggle}>
              Cancel
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default LoginModal;
