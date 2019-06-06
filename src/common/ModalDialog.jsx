// common/ModalDialog.jsx
import React from "react";
import { Modal } from "react-bootstrap";
import { ERROR_TITLE } from "../config/AppConstants";

export default props => (
  <Modal
    show={!!props.errorMessage}
    centered
    onHide={() => props.setErrorMessageHandler("")}
  >
    <Modal.Header closeButton>
      <Modal.Title>{ERROR_TITLE}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{props.errorMessage}</p>
    </Modal.Body>
  </Modal>
);
