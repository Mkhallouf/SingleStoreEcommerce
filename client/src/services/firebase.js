import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
    getDoc,
    setDoc,
    doc,
    getFirestore,
    onSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCXKn1qAggrisK43NA34QVY8KaAKL9E9fk',
    authDomain: 'ecomstore-20625.firebaseapp.com',
    databaseURL: 'https://ecomstore-20625.firebaseio.com',
    projectId: 'ecomstore-20625',
    storageBucket: 'ecomstore-20625.appspot.com',
    messagingSenderId: '402380333773',
    appId: '1:402380333773:web:230d48a9f8e260ebe83f84',
    measurementId: 'G-SN27NZ8E13',
};

class Firebase {
    constructor() {
        initializeApp(firebaseConfig);

        this.auth = getAuth();
        this.firestore = getFirestore();

        this.provider = new GoogleAuthProvider();

        this.provider.addScope(
            'https://www.googleapis.com/auth/contacts.readonly'
        );
        this.provider.setCustomParameters({
            prompt: 'select_account',
        });
    }

    signInWithGoogle = () => {
        signInWithPopup(this.auth, this.provider);
    };

    signInWithEmailAndPassword = async (email, password) => {
        await signInWithEmailAndPassword(this.auth, email, password);
    };

    createUserWithEmailAndPassword = async (email, password) => {
        const { user } = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password
        );

        return user;
    };

    createUserProfileDocument = async (userAuth, additionalData = {}) => {
        if (!userAuth) return;
        console.log(userAuth);
        const userRef = doc(this.firestore, `users/${userAuth.uid}`);
        const snapShot = await getDoc(userRef);

        if (!snapShot.exists()) {
            const { displayName, email } = userAuth;
            const createAt = new Date();

            try {
                await setDoc(userRef, {
                    displayName,
                    email,
                    createAt,
                    ...additionalData,
                });
            } catch (error) {
                console.log('Error creating user, Message: ', error.message);
            }
        }

        return userRef;
    };

    onSnapshot(docRef, resultCallback, erroCallback = console.log) {
        return onSnapshot(docRef, {
            next: resultCallback,
            error: erroCallback,
        });
    }
}

export default new Firebase();
