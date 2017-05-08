import React, { Component } from 'react';
import { createPaginationContainer, QueryRenderer, graphql } from 'react-relay';
import environment from '../../../createRelayEnvironment';
import { Row, Col } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import ReactScrollPagination from 'react-scroll-pagination';
import BooksListItem from './BooksListItem';
import styles from './BooksList.css';

class BooksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.relay.isLoading(),
      error: null
    };
  }

  render() {
    const { relay, catalog } = this.props;
    const { loading, error } = this.state;

    if (catalog)
      return (
        <Row>
          {catalog.books.edges.map((edge, key) => <BooksListItem key={key} book={edge.node} />)}
          {relay.hasMore() &&
            !loading &&
            <ReactScrollPagination
              fetchFunc={() => this.loadMore()}
              excludeElement=".navbar"
              excludeHeight={50}
              triggerAt={300}
            />}
          {loading &&
            <Col md={12}>
              <div className={styles.loadingContainer}>
                <Spinner spinnerName="rotating-plane" />
              </div>
            </Col>}
          {error && <div>error</div>}
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
  {
    catalog: (
      graphql`
        fragment BooksList_catalog on Catalog {
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
      `
    )
  },
  {
    query: (
      graphql`
        query BooksListQuery($categoryId: String, $count: Int!, $cursor: String) {
          catalog {
            ...BooksList_catalog
          }
        }
      `
    ),
    direction: 'forward',

    getConnectionFromProps(props) {
      return props.catalog && props.catalog.books;
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
          catalog {
            ...BooksList_catalog
          }
        }
      `
    }
    variables={{
      categoryId: match && match.params.id,
      count: 12
    }}
    render={({ error, props }) => {
      if (error) return <Row>{error.message}</Row>;

      if (props) return <BooksListContainer {...props} />;

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

export default BooksListRenderer;
