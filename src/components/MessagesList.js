import React, { Component } from 'react';
import Message from '../models/Message';
import firebase from '../FirebaseInit';


var firebaseRef = firebase.database().ref('messages');
class MessagesList extends Component
{

	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			currentOwnerID: 1,
			newMessage: '',
			isLoading: true
		}


		Message.addListener('changeChat', function(userID){
			this.setState({ currentOwnerID: userID });
		}.bind(this));	

	}


	componentDidMount() {
		firebaseRef.on('value', function(snapshot){
			var messages = [];
			snapshot.forEach(function(childSnapshot) {
				//console.log(childSnapshot.key)
				messages.push({
					id: childSnapshot.key,
					message: childSnapshot.val().message,
					senderID: childSnapshot.val().senderID
				});
			});

			//console.log(messages)
			this.state.isLoading = false;
			this.setState({ messages: messages });

		}.bind(this));
	}


	addMessage(e){
		var obj = firebaseRef.push({
			message: this.state.newMessage,
			senderID: 1, // user logeado
			receiverID: 2 // usuario que recibe mensaje
		});

		this.setState({ newMessage: '' });
		Message.emit('addMessage');

	

	}

	handleInput(e){
		this.setState({ newMessage: e.target.value });
	}

	handleKeyPress(e){
		if(e.key == 'Enter'){
			this.addMessage();
		}
	}


	render(){

		var loading = null;
		if(this.state.isLoading){
			loading = <p>Loading ... </p>;
		}

		return(
	        <div>
	          
	          {loading}
	          <br />
	          {this.state.messages.map(function(message){
	          	if(message.senderID == this.state.currentOwnerID){
	          		return <p key={message.id}>{ message.message}</p>
	          	}
	          	//return <p key={message.id}>{ message.message}</p>
	          }.bind(this))}

	         <br />
	         <div className="control is-grouped">
			  <p className="control is-expanded">
			    <input className="input" type="text"
			    	   onChange={this.handleInput.bind(this)} 
			    	   value={this.state.newMessage}
			    	   placeholder="Send message" 
			    	   onKeyPress={this.handleKeyPress.bind(this)}
			    	   />
			  </p>
			  <p className="control">
			    <a className="button is-info" onClick={this.addMessage.bind(this)}>
			      Enviar
			    </a>
			  </p>
			</div>

	        </div>
		);
	}
}


export default MessagesList;
