import React from "react";
import { Modal } from "react-bootstrap";

export default props => {
  return (
    <Modal
      show={!!props.errorMessage}
      centered
      onHide={() => props.setErrorMessageHandler("")}
    >
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.errorMessage}</p>
      </Modal.Body>
    </Modal>
  );
};
