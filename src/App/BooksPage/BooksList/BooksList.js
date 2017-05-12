import React, { Component } from 'react';
import { createPaginationContainer, QueryRenderer, graphql } from 'react-relay';
import environment from 'App/createRelayEnvironment';
import { Row } from 'react-bootstrap';
import LoadingSpinner from 'Common/LoadingSpinner';
import ErrorAlert from 'Common/ErrorAlert';
import ReactScrollPagination from 'react-scroll-pagination';
import BooksListItem from './BooksListItem';

class BooksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.relay.isLoading(),
      error: null
    };
  }

  render() {
    const { relay, result } = this.props;
    const { loading, error } = this.state;

    if (result)
      return (
        <Row>
          {result.books.edges.map((edge, key) => <BooksListItem key={key} book={edge.node} />)}
          {relay.hasMore() &&
            !loading &&
            <ReactScrollPagination
              fetchFunc={() => this.loadMore()}
              excludeElement=".navbar"
              excludeHeight={50}
              triggerAt={300}
            />}
          {loading && <LoadingSpinner />}
          {error && <ErrorAlert error={error} />}
        </Row>
      );
  }

  loadMore() {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) return;

    this.setState({ loading: true });

    this.props.relay.loadMore(12, error => {
      if (error) {
        return this.setState({ loading: false, error });
      }

      this.setState({ loading: false });
    });
  }
}

// Not sure why I can not pass a variable here
const BooksListContainer = createPaginationContainer(
  BooksList,
  graphql`
    fragment BooksListContainer_result on Query {
      books(
        first: $count, 
        categoryId: $categoryId, 
        after: $cursor
      ) @connection(key: "BooksList_books"){
        edges {
          node {
            ...BooksListItem_book
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `,
  {
    query: (
      graphql`
        query BooksListQuery($categoryId: String, $count: Int!, $cursor: String) {
          ...BooksListContainer_result
        }
      `
    ),
    direction: 'forward',

    getConnectionFromProps(props) {
      return props.result && props.result.books;
    },

    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      };
    },

    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        categoryId: fragmentVariables.categoryId
      };
    }
  }
);

const BooksListRenderer = ({ books, match }) => (
  <QueryRenderer
    environment={environment}
    query={
      graphql`
        query BooksListQuery($categoryId: String, $count: Int!, $cursor: String) {
          ...BooksListContainer_result
        }
      `
    }
    variables={{
      categoryId: match && match.params.id,
      count: 12
    }}
    render={({ error, props }) => {
      if (error) return <Row><ErrorAlert error={error} /></Row>;

      if (props) return <BooksListContainer result={props} />;

      return <Row><LoadingSpinner /></Row>;
    }}
  />
);

export default BooksListRenderer;
