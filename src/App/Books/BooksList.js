import React from 'react';

const BooksList = ({ books }) => (
  <ol>
    {books.map(book => (
      <li key={book.id}>
        {book.title}
      </li>
    ))}
  </ol>
);

export default BooksList;
