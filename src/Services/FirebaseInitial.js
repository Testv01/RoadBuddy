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
	// return firebase.database.ref("a")
};

// fb.ref("/.info/serverTimeOffset").on('value', function(offset) {
//     var offsetVal = offset.val() || 0;
//     var serverTime = Date.now() + offsetVal;
// });

function insertReport(a,b,c,d,e) {
	firebase.database().ref("Report").push({
		latitude:a,
		longitude:b, 
		topic: c,
		description:d,
		image:e,
		date:firebase.database.ServerValue.TIMESTAMP
	})
}

export default{
	asd,
	insertReport
};