import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyBX6a5RnDiKFljCwVn9d5qHcR9nunCiG9M',
	authDomain: 'catch-of-the-day-john-murray.firebaseapp.com',
	databaseURL: 'https://catch-of-the-day-john-murray.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;
