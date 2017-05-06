import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { QueryRenderer, graphql } from 'react-relay';
import { LinkContainer } from 'react-router-bootstrap';

import environment from '../../../createRelayEnvironment';
import Spinner from 'react-spinkit';

const CategoryMenu = ({ books, match }) => (
  <QueryRenderer
    environment={environment}
    query={
      graphql`
        query CategoryMenuQuery {
          categories {
            id
            label
          }
        }
      `
    }
    render={({ error, props }) => {
      if (error) return <div>{error.message}</div>;

      if (props)
        return (
          <ListGroup>
            {props.categories.map(category => (
              <LinkContainer to={`/category/${category.id}`} isActive={() => match && match.params.id === category.id}>
                <ListGroupItem key={category.id} href="#">{category.label}</ListGroupItem>
              </LinkContainer>
            ))}
          </ListGroup>
        );

      return <ListGroup />;
    }}
  />
);

export default CategoryMenu;
