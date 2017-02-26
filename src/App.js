import React, { Component } from 'react';
import UsersList from './components/UsersList';
import MessagesList from './components/MessagesList';
import RegisterUser from './components/RegisterUser';
import logo from './logo.svg';


class App extends Component {
  render() {
    return (
      <div className="container">
        <br /><br />
        <h1 className="title">Messages</h1>
      

        <div className="columns">

          <div className="column is-one-quarter App-userList">
            <UsersList />
          </div>

          <div className="column App-messagesList">
            <MessagesList />
          </div>
        </div>

        <div>
          <h1 className="title">Register</h1>
          <RegisterUser />
        </div>

      </div>
    );
  }
}

export default App;
