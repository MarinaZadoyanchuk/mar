const React = require('react');
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;
let BrowserHistory = require('react-router').browserHistory;

const Login = React.createClass({
  getInitialState: function() {
    return {
      valueLogin: '',
      valuePass: ''
    }
  },
  logIn: function() {
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: this.refs.login.getValue(),
        password: this.refs.password.getValue()
      })
    })
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.status == 200) {
          window.sessionStorage.setItem('token', jsonData.token);
          BrowserHistory.push('/user/' + jsonData.userId);
        } else {
          console.log(jsonData);
        }
      })
      .catch((error) => {console.error(error)});
  },
  render: function() {

    return (
      <div className="center-block login">
        <h1>Login page</h1>
        <Input
          type="text"
          value={this.state.valueLogin}
          placeholder="Enter login"
          label="Login"
          bsSize="medium"
          hasFeedback
          ref="login"
          groupClassName="group-class"
          labelClassName="label-class" />
        <Input
          type="password"
          value={this.state.valuePass}
          name="password"
          placeholder="Enter password"
          bsSize="medium"
          label="Password"
          hasFeedback
          ref="password"
        />
        <Button
          bsStyle="primary"
          onClick={this.logIn}>
          Log in
        </Button>
      </div>
    );
  }
});

module.exports = Login;