import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";
import { ProjectAuth  } from "../config/firebaseConf";
// const auth = getAuth();

const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)
        //sign the user out
        try {
            await signOut(ProjectAuth)

            //dispatch logout action

            //    first logout ho jayga uske badh context m update hoga dispatch dispatch se 
            dispatch({ type: "LOGOUT" })

            //update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message)
                setIsPending(false)
            }


        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return { logout, error, isPending }
}

export default useLogout;