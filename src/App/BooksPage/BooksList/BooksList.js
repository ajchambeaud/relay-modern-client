import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import BooksListItem from './BooksListItem';
import environment from '../../../createRelayEnvironment';
import Spinner from 'react-spinkit';
import { Row } from 'react-bootstrap';
import styles from './BooksList.css';

const BooksList = ({ books, match }) => (
  <QueryRenderer
    environment={environment}
    query={
      graphql`
        query BooksListQuery ($categoryId: String, $limit: Int) {
          books (categoryId : $categoryId, first : $limit) {
            edges {
              node {
                ...BooksListItem_book
              }
            }
          }
        }
      `
    }
    variables={{
      categoryId: match && match.params.id,
      limit: 10
    }}
    render={({ error, props }) => {
      if (error) return <Row>{error.message}</Row>;

      if (props)
        return (
          <Row>
            {props.books.edges.map((edge, key) => <BooksListItem key={key} book={edge.node} />)}
          </Row>
        );

      return (
        <Row>
          <div className={styles.loadingContainer}>
            <Spinner spinnerName="rotating-plane" />
          </div>
        </Row>
      );
    }}
  />
);

export default BooksList;
