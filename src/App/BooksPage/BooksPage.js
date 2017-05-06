import React from 'react';
import CategoryMenu from './CategoryMenu';
import BooksList from './BooksList';
import { Grid, Row, Col } from 'react-bootstrap';

const BooksPage = props => (
  <Grid>
    <Row className="show-grid">
      <Col xs={12} md={4}>
        <CategoryMenu {...props} />
      </Col>
      <Col xs={12} md={8}>
        <BooksList {...props} />
      </Col>
    </Row>
  </Grid>
);

export default BooksPage;
