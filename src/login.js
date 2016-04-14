var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var Login = React.createClass({
  getInitialState: function() {
    return {
      valueLogin: '',
      valuePass: '',
      isValidationComponets: {},
      isValidation: false
    }
  },
  handleChangeLogin: function() {
    // This could also be done using ReactLink:
    // http://facebook.github.io/react/docs/two-way-binding-helpers.html
    this.setState({
      valueLogin: this.refs.login.getValue()
    });
  },
  handleChangePassword: function() {
    // This could also be done using ReactLink:
    // http://facebook.github.io/react/docs/two-way-binding-helpers.html
    this.setState({
      valuePass: this.refs.password.getValue()
    });
  },
  validationState: function (name, value, min, max) {
    min = min || 0;
    max = max || 10;
    const middle = (max + min) / 2;
    let length = value.length;
    if (length > middle) {
      this.state.isValidationComponets[name] = true;
      return 'success';
    }
    else if (length > min && length <= middle) {
      this.state.isValidationComponets[name] = true;
      return 'warning';
    }
    else if (length <= min && length > 0) {
      this.state.isValidationComponets[name] = false;
      return 'error';
    }
  },
  logIn: function() {
    const self = this;
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: self.state.valueLogin,
        password: self.state.valuePass
      })
    })
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.status == 200) {

        }
      })
      .catch((error) => {console.error("error")});
  },
  render: function() {
    
    this.state.isValidation = this.state.isValidationComponets.login && this.state.isValidationComponets.password;

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
          bsStyle={this.validationState('login', this.state.valueLogin, 2)}
          groupClassName="group-class"
          labelClassName="label-class"
          onChange={this.handleChangeLogin} />
        <Input
          type="password"
          value={this.state.valuePass}
          name="password"
          placeholder="Enter password"
          bsSize="medium"
          label="Password"
          hasFeedback
          ref="password"
          bsStyle={this.validationState('password', this.state.valuePass, 6, 60)}
          onChange={this.handleChangePassword}
        />
        <Button
          bsStyle="primary"
          disabled={!this.state.isValidation}
          onClick={this.state.isValidation ? this.logIn : null}>
          Log in
        </Button>
      </div>
    );
  }
});

module.exports = Login;