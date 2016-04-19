const React = require('react');
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;

const Registration = React.createClass({
  getInitialState: function() {
    return {
      valueLogin: '',
      valuePass: '',
      urlAvatar: '',
      loadingAvatar: false,
      isValidationComponets: {},
      isValidation: false
    }
  },
  handleChangeLogin: function() {
    this.setState({
      valueLogin: this.refs.login.getValue()
    });
  },
  handleChangePassword: function() {
    this.setState({
      valuePass: this.refs.password.getValue()
    });
  },
  validationState: function (name, value, min, max) {
    min = min || 0;
    max = max || 10;
    const middle = (max + min) / 2;
    let length = value.length;
    let validationComponent = {};
    let result = '';

    if (length > middle) {
      this.state.isValidationComponets[name] = true;
      return 'success';
    }
    else if (length >= min && length <= middle) {
      this.state.isValidationComponets[name] = true;
      return 'warning';
    }
    else if (length < min && length > 0) {
      this.state.isValidationComponets[name] = false;
      return 'error';
    }
  },
  uploadAvatar: function(e) {
    const file = e.target.files[0];

    const data = new FormData();
    data.append('file', e.target.files[0]);
    this.setState({
      loadingAvatar: true
    });
    fetch("http://localhost:3000/user/avatar", {
      method: "POST",
      body: data
    })
      .then((response) => response.json())
      .then((avatar) => {
        this.setState({
          urlAvatar: avatar.url,
          loadingAvatar: false
        });

        const img = document.createElement('img');
        img.src = avatar.url;
        document.getElementById('avatar').appendChild(img);

      })
      .catch((error) => {console.log(error)});

  },
  createUser: function() {
    fetch('http://localhost:3000/user/create', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: this.state.valueLogin,
        password: this.state.valuePass,
        avatar: this.state.urlAvatar
      })
    })
      .then((response) => response.json())
      .then((dataUser) => {
        console.log(dataUser);
      })
      .catch((error) => {console.log(error)});
  },
  render: function() {
    return (
      <div>
        <div id="avatar"></div>
        <Input
          type="file"
          name="avatar"
          accept="image/*"
          help="load your avatar for this site"
          onChange={this.uploadAvatar}
        />
        {this.state.loadingAvatar ? <span>Loading...</span> : null}
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
          onClick={this.createUser}>
          Registration
        </Button>
      </div>
    );
  }
});

module.exports = Registration;