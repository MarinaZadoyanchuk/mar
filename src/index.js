const ReactDOM = require('react-dom');
const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const BrowserHistory = require('react-router').browserHistory;
const NavLink = require('./NavLink');
const Home = require('./home');
const Login = require('./login');
const Registration = require('./registration');
const User = require('./user');

const App = React.createClass({
  render: function() {
    return(
      <div>
        <ul className="nav nav-pills">
          <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
          {!window.sessionStorage.getItem("token") ?
            <li><NavLink to="/login">Log in</NavLink></li> :
            <li><NavLink to="/" onClick={ function() { window.sessionStorage.clear();} }>Log out</NavLink></li>
          }
          <li><NavLink to="/registration">Registration</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});
ReactDOM.render((
  <Router history={BrowserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="registration" component={Registration} />
      <Route path="login" component={Login} />
      <Route path="user/:userId" component={User} />
    </Route>
  </Router>
), document.getElementById('root'))