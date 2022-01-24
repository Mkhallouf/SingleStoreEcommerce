import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../assets/logo.svg';
import firebase from '../../services/firebase';

import './Header.css';

const Header = ({ currentUser }) => {
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <img className="logo" alt="logo" src={logo} />
            </Link>
            <div className="header-items">
                <Link className="header-item" to="/shop">
                    SHOP
                </Link>
                <Link className="header-item" to="/contact">
                    CONTACT
                </Link>

                {currentUser ? (
                    <div
                        className="header-item"
                        onClick={() => firebase.auth.signOut()}
                    >
                        SIGN OUT
                    </div>
                ) : (
                    <Link className="header-item" to="/signin">
                        SIGN IN
                    </Link>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
