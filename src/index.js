const Login = require('./login.js');
const ReactDOM = require('react-dom');
const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;

const App = React.createClass({
  render: function() {
    return(
      <div>
        <h1>Front page</h1>
        <li><Link to="/login">Login</Link></li>
      </div>
    );
  }
});

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
    </Route>
  </Router>
), document.getElementById('root'))