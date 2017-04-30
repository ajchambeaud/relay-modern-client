import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from './createRelayEnvironment';

const query = graphql`
query AppBooksListQuery {
  books {
    id
    title
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
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Books list</h2>

        <QueryRenderer
          environment={environment}
          query={query}
          render={({ error, props }) => {
            if (error) return <div>{error.message}</div>;

            if (props) return <BooksList {...props} />;

            return <div>Loading</div>;
          }}
        />

      </div>
    );
  }
}

const BooksList = ({ books }) => (
  <ol>
    {books.map(book => (
      <li key={book.id}>
        {book.title}
      </li>
    ))}
  </ol>
);

export default App;
