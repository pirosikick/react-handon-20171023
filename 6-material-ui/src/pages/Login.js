import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';

class Login extends Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    error: false,
  };

  componentDidMount() {
    const user = firebase.auth().currentUser;

    if (user) {
      this.props.history.replace('/');
    }
  }

  handleClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log('failed to log in', err);
        this.setState({ error: true });
      });
  };

  render() {
    const { error } = this.state;

    return (
      <div>
        {error ? <p>ログインエラー</p> : ''}
        <RaisedButton
          label="ログイン"
          fullWidth={true}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default Login;
