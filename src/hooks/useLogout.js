import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";
import { ProjectAuth, ProjectFirebase, ProjectFirestore } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";



const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    // Sign the user out
    try {
      console.log("me clicked");

      console.log("__", user.uid);
 
      await updateDoc(doc(ProjectFirestore, " Users", user.uid), {
        online: false
      });

      await signOut(ProjectAuth);
 
      // Dispatch logout action
      dispatch({ type: "LOGOUT" });

      // Update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};

export default useLogout;
