import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const FormModal = (props) => {
  return (
    <Modal
      size={props.small ? props.small : props.width ? "xl" : "lg"}
      isOpen={props.open}
      toggle={props.toggle}
      {...props.args}
    >
      <ModalHeader toggle={props.toggle}>
        <h4>{props.title}</h4>
      </ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      {props.showFooter && (
        <ModalFooter>
          <Button color="primary" type="submit">
            Save
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default FormModal;
