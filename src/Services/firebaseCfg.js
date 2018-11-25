import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyAQqXC7P_OwwkkSfJscHLUIfro84Ipc0SI",
    authDomain: "test-2e10e.firebaseapp.com",
    databaseURL: "https://test-2e10e.firebaseio.com",
    projectId: "test-2e10e",
    storageBucket: "test-2e10e.appspot.com",
    messagingSenderId: "872972741228"
  };
  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();