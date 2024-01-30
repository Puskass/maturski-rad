import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";


const userAuthContext = createContext()

export function UserAuthContextProvider({children}) {
    const [user, setUser] = useState("")

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleAuthProvider)
    }
    function logOut() {
        return signOut(auth)
    }
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)

        return () => {
            unsubscribe()
        }
      }) 
    }, [])
    
    return (
        <userAuthContext.Provider value={{user, signUp, signIn, logOut, googleSignIn}}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}