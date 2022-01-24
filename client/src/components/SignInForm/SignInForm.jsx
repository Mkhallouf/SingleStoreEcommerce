import React from 'react';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';
import firebase from '../../services/firebase';

import './SignInForm.css';

class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleInput = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = this.state;
            await firebase.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error);
        }
        this.setState({ email: '', password: '' });
    };

    render() {
        return (
            <div className="signin-form">
                <h2 className="title">I already have an account</h2>
                <span className="subtitle">
                    Sign in with your email and password
                </span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        handleChange={this.handleInput}
                        label="Email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        required
                    />

                    <FormInput
                        handleChange={this.handleInput}
                        label="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        required
                    />

                    <div className="form-buttons">
                        <CustomButton type="submit"> Sign in </CustomButton>
                        <CustomButton
                            type="submit"
                            onClick={firebase.signInWithGoogle}
                            isGoogleSignIn
                        >
                            Sign in with google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignInForm;
