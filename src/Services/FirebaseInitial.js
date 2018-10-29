import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAQqXC7P_OwwkkSfJscHLUIfro84Ipc0SI",
    authDomain: "test-2e10e.firebaseapp.com",
	databaseURL: "https://test-2e10e.firebaseio.com",
	projectId: "test-2e10e",
	storageBucket: "test-2e10e.appspot.com",
	messagingSenderId: "872972741228"
};
firebase.initializeApp(config);

function asd () {
	return firebase.database().ref("sss").set(firebase.database.ServerValue.TIMESTAMP)
}

export default{
	asd
}