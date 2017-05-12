import React from 'react';
import { Col } from 'react-bootstrap';
import styles from './Loading.css';
import Spinner from 'react-spinkit';

const LoadingSpinner = () => (
  <Col md={12}>
    <div className={styles.container}>
      <Spinner spinnerName="rotating-plane" />
    </div>
  </Col>
);

export default LoadingSpinner;
