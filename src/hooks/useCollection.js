 

import { useEffect, useRef, useState } from "react";
import { ProjectFirestore } from "../config/firebaseConf";
import { collection, onSnapshot,query, where ,orderBy } from "firebase/firestore";


// Custom hook to interact with a Firestore collection
export const useCollection = (collectionName,_query,_orderBy) => {
  // State to store the retrieved documents from the Firestore collection
  const [documents, setDocuments] = useState(null);
  // State to handle errors if any occur during data retrieval
  const [error, setError] = useState(null);

  // if we don't use a ref--> infinite loop in useEffect
  // _query is an array and is "different" on every function

  const Query=useRef(_query).current
  const OrderBy=useRef(_orderBy).current

  useEffect(() => {
    // Reference to the Firestore collection based on the provided 'collectionName' parameter
    let ref = collection(ProjectFirestore, collectionName);

    if(Query){
      // console.log(query);
      // ref=ref.where(...query)
      ref=query(ref, where(...Query));
    }
    if(OrderBy){
       
      ref=  query(ref, orderBy(...OrderBy));
    }
    


    // Function to handle snapshot updates when data in the collection changes
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        // Loop through each document in the snapshot
        snapshot.docs.forEach((doc) => {
          // Extract the data from the document and add the 'id' property
          results.push({ ...doc.data(), id: doc.id });
        });
        // Update state with the retrieved documents
        setDocuments(results);
        // Clear any previous error in case the data fetch is successful
        setError(null);
      },
      (error) => {
        // Handle error if there's any issue with data retrieval
        console.log("Error:", error);
        setError("Could not fetch the data");
      }
    );

    // Function to unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
    
  }, [collectionName, Query,OrderBy ]); // Re-run the effect whenever the 'collectionName' parameter changes

  // Return the retrieved documents and error state to be used in components
  return { documents, error };
};
