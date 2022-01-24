import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import firebase from './services/firebase';

import HomePage from './pages/Home/HomePage';
import ShopPage from './pages/Shop/ShopPage';
import SignInSignUpPage from './pages/SignInSignUpPage/SignInSignUpPage';
import Header from './components/Header/Header';
import { setCurrentUser } from './redux/user/userActions';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    unsubscribeFromAuth = null;
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;
        this.unsubscribeFromAuth = firebase.auth.onAuthStateChanged(
            async (userAuth) => {
                if (userAuth) {
                    const userRef = await firebase.createUserProfileDocument(
                        userAuth
                    );

                    this.unsubscribeFromSnapshot = firebase.onSnapshot(
                        userRef,
                        (snapShot) => {
                            setCurrentUser({
                                id: snapShot.id,
                                ...snapShot.data(),
                            });
                        }
                    );
                }

                setCurrentUser(userAuth);
            }
        );
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
        this.unsubscribeFromSnapshot();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route
                        exact
                        path="/signin"
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to="/" from="*" />
                            ) : (
                                <SignInSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (user) => ({
    currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
