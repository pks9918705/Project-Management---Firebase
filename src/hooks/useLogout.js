import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";
import { ProjectAuth } from "../firebase/config"


// const auth = getAuth();

const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch, user } = useAuthContext()


    const logout = async () => {
        setError(null)
        setIsPending(true)
        //sign the user out
        try {
            console.log("me clicked")

            console.log("__",user.uid)
            // const typeOfUserUid = typeof user.uid;
            // console.log(typeOfUserUid);
            // const washingtonRef = doc(ProjectFirestore, "users", user.uid);

             // console.log("****",washingtonRef)
            // await updateDoc(washingtonRef, {
            //     online: false
            // });

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