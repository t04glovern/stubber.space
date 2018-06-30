import firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAytQQiEtwLpekSoxQTKNnEAMXHEQJ5pUk",
  authDomain: "stubber-space.firebaseapp.com",
  databaseURL: "https://stubber-space.firebaseio.com",
  projectId: "stubber-space",
  storageBucket: "stubber-space.appspot.com",
  messagingSenderId: "734465950191"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings);

export default firebase;
