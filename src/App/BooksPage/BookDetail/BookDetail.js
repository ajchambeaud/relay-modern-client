import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Row, Col, Image, Label } from 'react-bootstrap';
import styles from './BookDetail.css';
import environment from 'App/createRelayEnvironment';
import LoadingSpinner from 'Common/LoadingSpinner';
import ErrorAlert from 'Common/ErrorAlert';

const Book = ({ book }) => (
  <Row>
    <Col md={4}>
      <Image src={book.image} rounded responsive />
    </Col>
    <Col md={8}>
      <h2>{book.title}</h2>
      <p>By: {book.author}</p>
      <p>
        {book.categories.edges.map(item => (
          <Label className={styles.catLabel} bsStyle="primary">{item.node.label}</Label>
        ))}
      </p>
    </Col>
  </Row>
);

const BookDetail = ({ books, match }) => (
  <QueryRenderer
    environment={environment}
    query={
      graphql`
        query BookDetailRendererQuery($bookId: String) {
          book (id: $bookId) {
            id,
            title,
            image,
            author,
            categories {
              edges {
                node {
                  id
                  label
                }
              }
            }
          }
        }
      `
    }
    variables={{
      bookId: match && match.params.bookId
    }}
    render={({ error, props }) => {
      if (error)
        return (
          <Row>
            <ErrorAlert error={error} />
          </Row>
        );

      if (props) return <Book {...props} />;

      return (
        <Row>
          <LoadingSpinner />
        </Row>
      );
    }}
  />
);

export default BookDetail;
