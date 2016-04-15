const ReactDOM = require('react-dom');
const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const createBrowserHistory = require('react-router').createMemoryHistory;
const NavLink = require('./NavLink');
const Login = require('./login');
const Home = require('./home');

const history = createBrowserHistory();

const App = React.createClass({
  render: function() {
    return(
      <div>
        <ul className="nav nav-pills">
          <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
    </Route>
  </Router>
), document.getElementById('root'))