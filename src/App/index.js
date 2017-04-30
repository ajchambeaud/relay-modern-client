import React from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BooksPage from './Books/BooksPage';
import Admin from './Admin';

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin">About</Link></li>
      </ul>

      <hr />

      <Route exact path="/" component={BooksPage} />
      <Route path="/admin" component={Admin} />
    </div>
  </Router>
);

export default App;
