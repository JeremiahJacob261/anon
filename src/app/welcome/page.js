"use client"
import { onAuthStateChanged } from "firebase/auth";
import { useState,useEffect } from "react";
import {app} from '../../api/firebase'
import { getAuth } from "firebase/auth";
export default function Welcome() {
    const auth = getAuth(app);
    const [useri,setUser] = useState('')
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            // ...
            setUser(user)
          } else {
            // User is signed out
            // ...
            console.log('sign out');
            route.push('/');
          }
        });
      },[]);
    return(
        <div>
<p>{useri.email}</p>
        </div>
    )
}