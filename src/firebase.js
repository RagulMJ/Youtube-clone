import firebase from 'firebase/app'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCSoOAPp4kBs-RBJwVc6hQey9SxCeF1R_U",
    authDomain: "yt-clone-rj.firebaseapp.com",
    projectId: "yt-clone-rj",
    storageBucket: "yt-clone-rj.appspot.com",
    messagingSenderId: "861606596214",
    appId: "1:861606596214:web:ec9a5fc3581315fe1d9957"
  };

  // const firebaseConfig = {
  //   apiKey: "AIzaSyCDtmTUh6oHbYD_567bTlQhi0YqSFwbtf0",
  //   authDomain: "yt-clone-rajes.firebaseapp.com",
  //   projectId: "yt-clone-rajes",
  //   storageBucket: "yt-clone-rajes.appspot.com",
  //   messagingSenderId: "59193996273",
  //   appId: "1:59193996273:web:1f0e55624216391e088a50"
  // };

firebase.initializeApp(firebaseConfig)

export default firebase.auth()