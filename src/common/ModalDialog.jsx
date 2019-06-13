// common/ModalDialog.jsx
import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { ERROR_TITLE } from "../config/AppConstants";

const ModalDialog = ({ errorMessage, setErrorMessageHandler }) => (
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

ModalDialog.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  setErrorMessageHandler: PropTypes.func.isRequired
};

export default ModalDialog;
