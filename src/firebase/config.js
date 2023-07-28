// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore"; // Correctly import the Timestamp object
import { getStorage ,ref} from "firebase/storage"; // Removed redundant 'import { ref } from "firebase/storage";'

// Your web app's Firebase configuration
 
const firebaseConfig = {
  apiKey: "AIzaSyB6eekN0sSphhXdjqi4xPo3KWYvHWzDVHM",
  authDomain: "project-management-89428.firebaseapp.com",
  projectId: "project-management-89428",
  storageBucket: "project-management-89428.appspot.com",
  messagingSenderId: "903875243373",
  appId: "1:903875243373:web:e629feb2ee23b5e456be64"
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
