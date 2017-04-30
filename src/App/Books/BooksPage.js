import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../../createRelayEnvironment';
import BooksList from './BooksList';
import Spinner from 'react-spinkit';

const query = graphql`
  query BooksPageQuery {
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

class BooksPage extends Component {
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

            return <Spinner spinnerName="three-bounce" />;
          }}
        />

      </div>
    );
  }
}

export default BooksPage;
