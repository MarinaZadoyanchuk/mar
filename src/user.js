const React = require('react');

const User = React.createClass({
  getInitialState: function () {
    return {
      userLogin: ''
    }
  },
  componentDidMount: function(userId) {
    fetch("http://localhost:3000/user/" + this.props.params.userId, {
      method : 'GET',
      headers: {
        'Authorization': window.sessionStorage.token
      }
    })
      .then((response) => response.json())
      .then((userData) => {
       this.setState({
         userLogin: userData.login
       })
      })
      .catch((error) => {console.log(error)})
  },
  render: function() {
    return (
      <div>
        <h1>{this.state.userLogin}</h1>
      </div>
    )
  }
});

module.exports = User;