"use client"
import Image from 'next/image'
import {useState} from 'react'
import styles from '../page.module.css'
import Stack from '@mui/material/Stack'
import { Button, TextField, Typography } from '@mui/material'
import {app} from '../../api/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {  onAuthStateChanged } from "firebase/auth";
export default function Login() {
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    
    const [useri,setUser] = useState('')
    const auth = getAuth(app);
  const login=async()=>{

signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    setUser(userCredential.uid);

    alert('your account has been created');
    route.push('/welcome');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error.message)
  });
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        route.push('/welcome');
      } else {
        // User is signed out
        // ...
        console.log('sign out');
      }
    });
  },[])
  }
  return (
    <main style={{background:'#171A21',display:'flex',justifyContent:'center',padding:'9px'}}>
      <Stack direction='column' 
      style={{minWidth:'300px'}}
      spacing={4} alignItems="center" justifyContent="stretch">

      <h1 style={{color:'whitesmoke'}}>Login</h1>
      <Typography style={{color:'whitesmoke'}}>Login to enjoy our services </Typography>
<TextField placeholder='Email' type='email' style={{background:'white',width:'100%'}} value={email}  onChange={(c)=>{
    setEmail(c.target.value)}}/>
<TextField placeholder='Password' type='password' style={{background:'white',width:'100%'}} value={pass}  onChange={(c)=>{
    setPass(c.target.value)}}/>
<Button style={{background:"white"}} onClick={login}>login</Button>
<Link href='/register' >
<Typography variant="subtitle" style={{color:"white"}}>Don't have an account ?Sign Up</Typography></Link>
      </Stack>
    </main>
  )
}
