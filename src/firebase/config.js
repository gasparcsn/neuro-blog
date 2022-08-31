import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCS92lGVoDJjPQ22s-tv0ucT_gWz3sgPAQ",
    authDomain: "blog-f290c.firebaseapp.com",
    projectId: "blog-f290c",
    storageBucket: "blog-f290c.appspot.com",
    messagingSenderId: "461500025022",
    appId: "1:461500025022:web:8c317f637b7a820856b6ef"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)

  // init firestore services
  const projectFirestore = firebase.firestore()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { projectFirestore, timestamp }