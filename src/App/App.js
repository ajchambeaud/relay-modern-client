import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import BooksPage from './BooksPage';
import AdminPage from './AdminPage';

const NavigationBar = () => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <LinkContainer to="/">
          <a href="#">Bookly</a>
        </LinkContainer>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      <LinkContainer to="/admin">
        <NavItem>Admin panel</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

const App = () => (
  <Router>
    <div>
      <NavigationBar />

      <Switch>
        <Route exact path="/" component={BooksPage} />
        <Route path="/category/:id" component={BooksPage} />
        <Route path="/admin" component={AdminPage} />
      </Switch>
    </div>
  </Router>
);

export default App;
