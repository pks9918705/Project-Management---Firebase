//! Firestore Hook - Custom hook to interact with Firestore collection.

import { useEffect, useState, useReducer } from "react";
import {   ProjectFirestore ,timeStamp} from "../config/firebaseConf";
import { addDoc,collection,deleteDoc,doc } from "firebase/firestore";

// Define the initial state for the hook's reducer
let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
};

// Reducer function for handling state updates based on actions (currently empty)
const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {   isPending: true,success:false,error:null,document:null }
        case "ADDED_DOCUMENT":
            return { isPending: false, document: action.payload, success: true, error: null }
        case "DELETED_DOCUMENT":
            return { isPending: false, document: action.payload, success:true,error:null}
        case "ERROR":
            return {isPending: false, error: action.payload, document:null,success:false}
        default:
            return state;
    }
};

// Custom hook to interact with Firestore collection
export const useFirestore = (collectionName) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    // Reference to Firestore collection
    // const ref = ProjectFirestore.collection(collection);
     

    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {

        if (!isCancelled) {
            dispatch(action);
        }
    }

    // Function to add a document to the collection
    const addDocument = async (doc) => {
        // Add Firestore logic here for adding a document
        dispatch({ type: 'IS_PENDING' })

        try {
            const createdAt=timeStamp.fromDate(new Date())
            
            const addedDocument=await addDoc(collection(ProjectFirestore, collectionName),{...doc,createdAt:createdAt})
             
            dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })
            console.log("add ho gaaya")

        }
        catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
        }

    };

    // Function to delete a document from the collection
    const deleteDocument = async(id) => {
        // Add Firestore logic here for deleting a document
        dispatch({type:"IS_PENDING"})

        try{
            // ref  of deletd document
            const deleteDocument=  await deleteDoc(doc(ProjectFirestore, collectionName, id));
            dispatchIfNotCancelled({type:"DELETED_DOCUMENT",payload:deleteDocument});
        }
        catch(err){
            console.log("error deleting document ->",err)
            dispatchIfNotCancelled({type:"ERROR",payload:"could not delete document"});
        }

    };

    // Cleanup function to handle asynchronous tasks
    useEffect(() => {
        return () => setIsCancelled(true); // Set isCancelled to true to cancel ongoing tasks
    }, []);

    // Return functions for adding and deleting documents, accessible to components using this hook
    return { addDocument, deleteDocument,response };
};
