import React from 'react';
import SignInForm from '../../components/SignInForm/SignInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import './SignInSignUpPage.css'

const SignInSignUpPage = () => {
    return (
        <div className="signin-signup-page">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default SignInSignUpPage;
