// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore"; // Correctly import the Timestamp object
import { getStorage ,ref} from "firebase/storage"; // Removed redundant 'import { ref } from "firebase/storage";'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCARFE9tNj4PMlIwht7UsNpi4_bXEx3tec",
  authDomain: "thedojo-90263.firebaseapp.com",
  projectId: "thedojo-90263",
  storageBucket: "thedojo-90263.appspot.com",
  messagingSenderId: "987283745088",
  appId: "1:987283745088:web:061fb65ac0bd03fc9d32a5"
};

// Initialize Firebase
const ProjectFirebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const ProjectAuth = getAuth(ProjectFirebase);

// Initialize Firebase Firestore and get a reference to the Timestamp service
const ProjectFirestore = getFirestore(ProjectFirebase);
const ProjectStorage = getStorage(ProjectFirebase); // Removed 'const ref = ...'

const timeStamp = Timestamp; // Use Timestamp from Firestore

export { ProjectAuth, ProjectFirebase, ProjectFirestore, timeStamp, ProjectStorage ,ref};
