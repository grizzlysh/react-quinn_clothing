import React, { useState } from 'react'
import { connect } from 'react-redux'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { ButtonContainer, SignInContainer, SignInTitle } from './sign-in.styles';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const[ userCredetials, setUserCredetials ] = useState({ email: '', password: '' });
    
    const { email, password } = userCredetials
    
    const handleSubmit = async event => {
        event.preventDefault();

        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;

        setUserCredetials({ ...userCredetials, [name]: value })
    }

    return (
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password.</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    type="email"
                    name="email"
                    value={ email }
                    handleChange={ handleChange }
                    label="Emais"
                    required
                />
                {/* <label htmlFor="email">Email</label> */}
                <FormInput
                    type="password"
                    name="password"
                    value={ password }
                    handleChange={ handleChange }
                    label="Password"
                    required
                />
                {/* <label htmlFor="password">Password</label> */}
                <ButtonContainer>
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton 
                        type="button"
                        onClick={ googleSignInStart }
                        isGoogleSignIn
                    >Sign In With Google</CustomButton>
                </ButtonContainer>
            </form>
        </SignInContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn)
