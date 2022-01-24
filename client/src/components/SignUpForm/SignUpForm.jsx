import React from 'react';
import firebase from '../../services/firebase';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';

import './SignUpForm.css';

class SignUpForm extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            displayName: '',
        };
    }

    handleInput = (e) => {
        const { value, name } = e.target;

        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            const user = await firebase.createUserWithEmailAndPassword(email, password);
            await firebase.createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <div className="signup-form">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        handleChange={this.handleInput}
                        label="Display Name"
                        type="text"
                        name="displayName"
                        value={this.state.displayName}
                        required
                    />
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
                    <FormInput
                        handleChange={this.handleInput}
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        required
                    />

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUpForm;
