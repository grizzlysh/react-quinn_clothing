import React, { Component } from 'react'
import CustomButton from '../custom-button/custom-button.component'
import FormInput from '../form-input/form-input.component'
import { connect } from 'react-redux'

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
// import { signInWithEmailAndPassword } from 'firebase/auth';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

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

        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email, password);
        
        // try {
        //     await signInWithEmailAndPassword(auth, email, password);
        //     this.setState({ email: '', password: '' })
        // } catch (error) {
        //     console.error(error);
        // }

    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        const { googleSignInStart } = this.props

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
                            onClick={ googleSignInStart }
                            isGoogleSignIn
                        >Sign In With Google</CustomButton>
                    </ButtonContainer>
                </form>
            </SignInContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn)
