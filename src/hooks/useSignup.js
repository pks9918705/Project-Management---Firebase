import { useState, useEffect } from "react";
import { ProjectAuth, ProjectStorage, ref ,ProjectFirestore } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

// Custom hook for handling user signup
const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  // Function to handle user signup
  const signup = async (email, password, username, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // Signup user using Firebase Authentication
      const res = await createUserWithEmailAndPassword(ProjectAuth, email, password, username);

      if (!res.user) {
        throw new Error("Could not complete signup");
      }

      console.log("Hurray!!, User registered successfully");

      // Upload user thumbnail to Firebase Storage
      // Get a reference to the storage location where the user's thumbnail image will be stored.
      // The 'ref' function from Firebase Storage is used to create a reference to the desired location.
      // We are creating a reference to a file path with the format: "thumbnails/{user_uid}/{thumbnail_name}"
      const storageRef = ref(ProjectStorage, `thumbnails/${res.user.uid}/${thumbnail.name}`);

      // Upload the thumbnail image to Firebase Storage using the 'uploadBytes' function.
      // The 'uploadBytes' function takes the storage reference and the thumbnail image as parameters.
      // It returns a snapshot object that represents the upload task's state.
      const snapshot = await uploadBytes(storageRef, thumbnail);

      // After the thumbnail image is successfully uploaded, we need to get the download URL of the uploaded image.
      // We use the 'getDownloadURL' function from Firebase Storage to obtain the download URL.
      // The 'getDownloadURL' function takes the reference to the uploaded file (retrieved from the snapshot) as a parameter.
      // It returns a Promise that resolves to the URL of the uploaded image, which will be used as the user's 'photoURL'.
      const photoURL = await getDownloadURL(snapshot.ref);


      // Check if the file upload is successful
      if (snapshot) {
        console.log("Done uploading", photoURL);

      }

      // Update the user's display name in Firebase Authentication
      await updateProfile(ProjectAuth.currentUser, {
        displayName: username,
        photoURL: photoURL
      });

      // console.log(res.user.displayName);
      // console.log(res.user.photoURL);

      //create a user document

      await setDoc(doc(ProjectFirestore, " Users", `${res.user.uid}`), {
        online:true,
        username,
        photoURL:res.user.photoURL

      });


      // Dispatch a LOGIN action to notify the global state that the user is logged in
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      // Handle any errors during signup process
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  // Clean up function to be executed when the component is unmounted
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  // Empty dependency array means the effect will run only once during the component's mount.

  return { error, isPending, signup };
};

export default useSignup;
