"use client"
import Image from 'next/image'
import {useState,useEffect} from 'react'
import styles from '../page.module.css'
import Stack from '@mui/material/Stack'
import { Button, TextField, Typography } from '@mui/material'
import {app} from '../../api/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [useri,setUser] = useState('')
    const route = useRouter();
  const login=async()=>{

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log(user);
        setUser(user.uid);
        alert('your account has been created');
        route.push('/welcome');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  return (
    <main style={{background:'#171A21',display:'flex',justifyContent:'center',padding:'9px'}}>
      <Stack direction='column' 
      style={{minWidth:'300px'}}
      spacing={4} alignItems="center" justifyContent="stretch">

      <h1 style={{color:'whitesmoke'}}>Register</h1>
      <Typography style={{color:'whitesmoke'}}>Login to enjoy our services </Typography>
<TextField placeholder='Email' type='email' style={{background:'white',width:'100%'}} value={email}  onChange={(c)=>{
    setEmail(c.target.value)}}/>
<TextField placeholder='Password' type='password' style={{background:'white',width:'100%'}} value={pass}  onChange={(c)=>{
    setPass(c.target.value)}}/>
<Button style={{background:"white",width:'100%'}} onClick={login}>Sign up</Button>
<Link href='/login' >
<Typography variant="subtitle" style={{color:"white"}}>Already have an account ?Login</Typography></Link>
      </Stack>
    </main>
  )
}
