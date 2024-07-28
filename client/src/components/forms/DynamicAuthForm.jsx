import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const DynamicBox = ({ title, onSubmit, message, success }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Card style={{ width: "25rem", backgroundColor: "#1e1e1e", color: "#ffffff" }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center">{title}</Card.Title>

          {message && (
            <p className={`text-center text-${success ? "success" : "danger"}`}>{message}</p>
          )}

          <Form onSubmit={onSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" required style={{ backgroundColor: "#333333", color: "#ffffff", borderColor: "#555555" }} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required style={{ backgroundColor: "#333333", color: "#ffffff", borderColor: "#555555" }} />
            </Form.Group>

            {title === "Register" && (
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" required style={{ backgroundColor: "#333333", color: "#ffffff", borderColor: "#555555" }} />
              </Form.Group>
            )}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              {title}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DynamicBox;
