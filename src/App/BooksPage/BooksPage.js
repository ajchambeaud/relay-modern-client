import React from 'react';
import CategoryMenu from './CategoryMenu';
import BooksList from './BooksList';
import { Grid, Row, Col } from 'react-bootstrap';
import BookDetail from './BookDetail';
import { Route, Switch } from 'react-router-dom';

const BooksPage = props => (
  <Grid>
    <Row className="show-grid">
      <Col xs={12} md={4}>
        <CategoryMenu {...props} />
      </Col>
      <Col xs={12} md={8}>
        <Switch>
          <Route path={`/detail/:bookId`} render={() => <BookDetail {...props} />} />
          <Route exact path={props.match.url} render={() => <BooksList {...props} />} />
        </Switch>
      </Col>
    </Row>
  </Grid>
);

export default BooksPage;
