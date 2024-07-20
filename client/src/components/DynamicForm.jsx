import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

const DynamicForm = ({ title, onSubmit, message, success, listForm }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Card style={{ width: "25rem" }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center">{title}</Card.Title>

          {message && <p className={`text-center text-${success ? "success" : "danger"}`}>{message}</p>}

          <Form onSubmit={onSubmit}>
            {listForm.map((form) => (
              <Form.Group controlId={form.id} key={form.id}>
                <Form.Label>{form.label}</Form.Label>
                {form.type === 'select' ? (
                  <Form.Control as="select" required={form.required}>
                    {form.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                ) : form.type === 'textarea' ? (
                  <Form.Control as="textarea" rows={form.rows || 3} placeholder={form.placeholder} required={form.required} />
                ) : form.type === 'checkbox' ? (
                  <Form.Check type="checkbox" label={form.label} required={form.required} />
                ) : form.type === 'radio' ? (
                  form.options.map((option, index) => (
                    <Form.Check
                      key={index}
                      type="radio"
                      label={option}
                      value={option}
                      name={form.id}
                      required={form.required}
                    />
                  ))
                ) : (
                  <Form.Control
                    type={form.type}
                    placeholder={form.placeholder}
                    required={form.required}
                    defaultValue={form.defaultValue}
                    pattern={form.pattern}
                  />
                )}
              </Form.Group>
            ))}
            <Button variant="primary" type="submit" className="w-100 mt-3">
              {title}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DynamicForm;
