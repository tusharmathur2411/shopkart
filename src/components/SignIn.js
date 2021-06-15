import React, { Component } from 'react'
import {auth} from '../firebase'
import '../styles/SignIn.css'

export default class SignIn extends Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const email = e.target.elements.email.value
        const password = e.target.elements.password.value
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                this.props.startLogIn(auth.user);
                this.props.loadCartForUser(auth.user.uid)
                this.props.history.push(this.props.history.location.pathname.replace('/signin', '') || '/')
            })
            .catch(error => alert(error.message))
    }

    render() {
        
        return (
            <div className="user-form">
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button>Sign In</button>
                </form>
            </div>
        )
    }
}
