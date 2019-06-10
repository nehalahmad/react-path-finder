// common/ModalDialog.jsx
import React from "react";
import { Modal } from "react-bootstrap";
import { ERROR_TITLE } from "../config/AppConstants";

export default ({ errorMessage, setErrorMessageHandler }) => (
  <Modal
    show={!!errorMessage}
    centered
    onHide={() => setErrorMessageHandler("")}
  >
    <Modal.Header closeButton>
      <Modal.Title>{ERROR_TITLE}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{errorMessage}</p>
    </Modal.Body>
  </Modal>
);
