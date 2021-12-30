import React, { Component } from 'react'
import CustomButton from '../custom-button/custom-button.component'
import FormInput from '../form-input/form-input.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { signInWithEmailAndPassword } from 'firebase/auth';

// import './sign-in.styles.scss'
import { ButtonContainer, SignInContainer, SignInTitle } from './sign-in.styles';

class SignIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            this.setState({ email: '', password: '' })
        } catch (error) {
            console.error(error);
        }

    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        return (
            <SignInContainer>
                <SignInTitle>I already have an account</SignInTitle>
                <span>Sign in with your email and password.</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="email"
                        name="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="Emais"
                        required
                    />
                    {/* <label htmlFor="email">Email</label> */}
                    <FormInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />
                    {/* <label htmlFor="password">Password</label> */}
                    <ButtonContainer>
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton 
                            type="button"
                            onClick={ signInWithGoogle }
                            isGoogleSignIn
                        >Sign In With Google</CustomButton>
                    </ButtonContainer>
                </form>
            </SignInContainer>
        )
    }
}

export default SignIn
