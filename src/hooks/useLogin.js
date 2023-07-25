import { useState, useEffect } from "react";
import { ProjectAuth  } from "../config/firebaseConf";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";



const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext()

  const login = async (email, password   ) => {
    setError(null);
    setIsPending(true);

    try {
      // Signup user
      const res = await signInWithEmailAndPassword(ProjectAuth, email, password );

      if (!res.user) {
        throw new Error("Could not complete signup");
      }
      console.log("Hurray!!, User SignIn successfully")
      
      //  when the user is signup successfully so now dispatch an event 
      // dipatch Login action
      dispatch({ type: "LOGIN", payload: res.user })
      // Add display name to user
      //   await res.user.updateProfile({ displayName: displayName });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

    } catch (error) {
      //   console.log(error.message);
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }

    }
  };
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, login };
};

export default useLogin;
