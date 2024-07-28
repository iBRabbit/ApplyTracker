import React from "react";
import DynamicForm from "./DynamicForm";

import { Modal, Button, Form } from "react-bootstrap";

import Alert from 'react-bootstrap/Alert';

function DynamicModalForm({ title, listForm, onSubmit, show, handleClose, message, onStatusChange }) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="dark text-light">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="dark text-light">
          {message.message && (
            <Alert variant= {message.type}>{message.message}</Alert>
          )}
          <DynamicForm 
            title={title}
            listForm={listForm}
            onSubmit={onSubmit}
            onStatusChange={onStatusChange}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DynamicModalForm;
