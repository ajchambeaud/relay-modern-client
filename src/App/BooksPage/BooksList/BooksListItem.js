import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Col } from 'react-bootstrap';
import styles from './BooksListItem.css';

const BooksListItem = ({ book }) => (
  <Col md={4}>
    <section className={styles.aisle}>
      <div className={styles.bookCard}>
        <img className={styles.cover} src={book.image} alt="Portada del libro" />
        <div className={styles.info}>
          <h2 className={styles.title}>
            {book.title}
          </h2>
          <h3 className={styles.author}>{book.author}</h3>
        </div>
      </div>
    </section>
  </Col>
);

export default createFragmentContainer(
  BooksListItem,
  graphql`
    fragment BooksListItem_book on Book {
      id
      title
      author
      image
    }
  `
);
