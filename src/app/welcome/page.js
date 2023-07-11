"use client"
import { onAuthStateChanged } from "firebase/auth";
import { useState,useEffect } from "react";
import {app} from '../../api/firebase'
import { getAuth,signOut } from "firebase/auth";
import { Divider, Stack, Typography, Button,Box } from "@mui/material";
import { supabase } from "../../api/supabase";
import { useRouter } from "next/navigation";
export default function Welcome() {
    const auth = getAuth(app);
    const router = useRouter();
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
            router.push('/');
          }
        });
      },[]);
      const signOuts =()=>{
        signOut(auth).then(()=>{
          
          router.push('/');
        })
      }
    return(
        <Box style={{padding:'8px',height:'100vh'}}>
<Typography variant="subtitle1">Welcome, {useri.displayName}</Typography>
<Stack direction="column">
  <Button variant="contained">Create a Topic</Button>
      <Typography variant="button">Recent</Typography>
      <Divider/>
<Button onClick={signOuts}>Log out</Button>
</Stack>

        </Box>
    )
}