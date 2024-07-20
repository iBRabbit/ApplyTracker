import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { DynamicForm } from "./DynamicForm";

const DynamicFormBox = ({ title, onSubmit, message, success, listForm }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Card style={{ width: "25rem" }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center">{title}</Card.Title>

          {message && <p className={`text-center text-${success ? "success" : "danger"}`}>{message}</p>}

          <DynamicFormBox 
          listForm={listForm} 
          onSubmit={onSubmit} 
          title={title}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DynamicFormBox;
