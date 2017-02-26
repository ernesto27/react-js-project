import React, { Component } from 'react';
import firebase from '../FirebaseInit';

class RegisterUser extends Component{

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	handleForm(e){
		e.preventDefault();
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then(function(data){
					console.log(data)
				})
				.catch(function(error) {
				  var errorCode = error.code;
				  var errorMessage = error.message;
			
				});
		return false;
	}

	handleInputEmail(e){
		this.setState({
			email: e.target.value
		});
	}


	handleInputPassword(e){
		this.setState({
			password: e.target.value
		});	
	}


	render() {
		return(
			<div>
				<form action="">
					<input type="text"
							value={this.state.email} 
							onChange={this.handleInputEmail.bind(this)} 
							placeholder="ingresa tu email" />
					<br />
					<input type="text" name="" 
						   value={this.state.password} 
						   onChange={this.handleInputPassword.bind(this)} 
						   placeholder="ingresa tu password" />
					<br />
					<input type="submit" value="Send" onClick={this.handleForm.bind(this)}/>
				</form>
			</div>
		);
	}
}


export default RegisterUser;