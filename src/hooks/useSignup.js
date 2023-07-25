import { useState, useEffect } from "react";
import { ProjectAuth, ProjectStorage, ref } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { uploadBytes } from "firebase/storage";

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
      const storageRef = ref(ProjectStorage, `thumbnails/${res.user.uid}/${thumbnail.name}`);
      const snapshot = await uploadBytes(storageRef, thumbnail);

      // Check if the file upload is successful
      if (snapshot) {
        console.log("Done uploading");
      }

      // Update the user's display name in Firebase Authentication
      await updateProfile(ProjectAuth.currentUser, {
        displayName: username,
      });

      console.log(res.user.displayName);

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
