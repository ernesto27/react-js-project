import React, { Component } from 'react';
import Message from '../models/Message';
import firebase from '../FirebaseInit';


class UsersList extends Component
{

	constructor(props){
		super(props);
		this.state = {
			users: []
		}
	}

	componentDidMount() {
		// Get users data
		var usersRef = firebase.database().ref('users');
		var users = [];
		usersRef.on('value', function(snapshot){
			snapshot.forEach(function(childSnapshot) {
				users.push({
					id: childSnapshot.key,
					username: childSnapshot.val().username
				});
			});
			this.setState({ users: users });

		}.bind(this));


		// Register user 
		// firebase.auth().createUserWithEmailAndPassword("mail2@gmail.com", '123456').catch(function(error) {
		//   // Handle Errors here.
		//   var errorCode = error.code;
		//   var errorMessage = error.message;
		//   // ...
		// });

		// Login user
		firebase.auth().signInWithEmailAndPassword("mail@gmail.com", '123456')
		.then(function(){
			var user = firebase.auth().currentUser;
		  	console.log(user.uid)
		})

		.catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...


		});



	}

	openChat(userID){
		// alert(userID)
		Message.emit('changeChat', userID);
		return false;
	}

	render(){
		return(
			<div className="sidebar-left">
          		<ul>
            		{this.state.users.map(function(user){
			          	return <li key={user.id}><a onClick={this.openChat.bind(this, user.id)}>{ user.username }</a></li>
			      	}.bind(this)) }
          		</ul>
        	</div>
		);
	}
}


export default UsersList;

