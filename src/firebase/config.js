import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCARFE9tNj4PMlIwht7UsNpi4_bXEx3tec",
    authDomain: "thedojo-90263.firebaseapp.com",
    projectId: "thedojo-90263",
    storageBucket: "thedojo-90263.appspot.com",
    messagingSenderId: "987283745088",
    appId: "1:987283745088:web:061fb65ac0bd03fc9d32a5"
};

//initialize 
firebase.initializeApp(firebaseConfig)

//init  services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }

