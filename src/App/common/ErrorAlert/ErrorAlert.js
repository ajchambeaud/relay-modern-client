import React from 'react';
import { Alert, Col } from 'react-bootstrap';

const ErrorAlert = error => (
  <Col md={12}>
    <Alert bsStyle="danger">
      <h4>Error:</h4>
      <p>
        {error.message}
      </p>
    </Alert>
  </Col>
);

export default ErrorAlert;
