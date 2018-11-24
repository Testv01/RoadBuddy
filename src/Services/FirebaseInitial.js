import firebase from 'firebase';


function asd () {
	return firebase.database().ref("sss").set(firebase.database.ServerValue.TIMESTAMP)
	// return firebase.database.ref("a")
};

// fb.ref("/.info/serverTimeOffset").on('value', function(offset) {
//     var offsetVal = offset.val() || 0;
//     var serverTime = Date.now() + offsetVal;
// });
function onAuthStateChanged () {
	firebase.auth().onAuthStateChanged(user => 
      this.props.navigation.navigate(user ? 'MainScreen' : 'SignUpScreen')
    )
};

function handleSignUp  (a,b)  {
    firebase
      .auth()
      .createUserWithEmailAndPassword(a, b)
      .then(this.next)
  };


  function insertReport(a,b,c,d,e,f,g,h,i,j) {
	firebase.database().ref("Report").push({
		latitude:a,
		longitude:b, 
		topic: c,
		description:d,
		image:e,
		accident:f,
		roadProblem:g,
		drainSystem:h,
        electricity:i,
        lightSystem:j,
		date:firebase.database.ServerValue.TIMESTAMP,
		user:firebase.auth().currentUser.email
	})
};

export default{
	asd,
	insertReport,
	onAuthStateChanged,
	handleSignUp,
};