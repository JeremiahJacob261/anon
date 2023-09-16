"use client"
import Image from 'next/image'
import {useState,useEffect} from 'react'
import styles from '../page.module.css'
import Stack from '@mui/material/Stack'
import { Button, TextField, Typography } from '@mui/material'
import {app} from '../../api/firebase'
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,updateProfile } from "firebase/auth";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from "@/api/supabase";
import {Poppins} from 'next/font/google'
    const pops = Poppins({ subsets: ['latin'],weight:'300' })
export default function Register() {
    const [email,setEmail] = useState("");
    const [cpass,setCPass] = useState("");
    const [pass,setPass] = useState("");
    const [useri,setUser] = useState('')
    const [name,setName] = useState('')
    const route = useRouter();
    const auth = getAuth(app);
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
  const login=async()=>{
  if (pass != cpass) {
    alert('ensure both passwords are the same')
  } else {
    
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log(user.uid);
        setUser(user.uid);
        updateProfile(auth.currentUser, {
            displayName: name,
          }).then(async()=>{
            const {data,error} = await supabase
            .from('autha')
            .insert({
                'name':name,
                'email':email,
                'uid':useri
            })
            console.log(error);
          })

        alert('your account has been created');
        route.push('/welcome');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
        if(errorCode === 'auth/wrong-password'){
          alert('Wrong Password, Please check your password and try again')
        }
        if(errorCode === 'auth/network-request-failed'){
          alert('Please ceck your internet connection and try again')
        }
        if(errorCode === 'auth/user-not-found'){
          alert('Email does not exist, please sign up or register')
        }
      });
      
  }
  }
  return (
    <main style={{background:'#171A21',height:'100vh',display:'flex',justifyContent:'center',padding:'9px'}}>
      <Stack direction='column' 
      style={{minWidth:'300px'}}
      spacing={4} alignItems="center" justifyContent="center">

      <h1 style={{color:'whitesmoke',fontFamily:pops.style.fontFamily}}>Register</h1>
      <Typography style={{color:'whitesmoke',fontFamily:pops.style.fontFamily}}>Sign up to test our message app service </Typography>
<TextField placeholder='Name' type='text' style={{background:'white',width:'100%',fontFamily:pops.style.fontFamily}} value={name}  onChange={(c)=>{
    setName(c.target.value)}}/>
    <TextField placeholder='Email' type='email' style={{background:'white',width:'100%'}} value={email}  onChange={(c)=>{
    setEmail(c.target.value)}}/>
<TextField placeholder='Password' type='password' style={{background:'white',width:'100%'}} value={pass}  onChange={(c)=>{
    setPass(c.target.value)}}/>
    <TextField placeholder='Confirm Password' type='password' style={{background:'white',width:'100%'}} value={cpass}  onChange={(c)=>{
    setCPass(c.target.value)}}/>
<Button style={{background:"#FCCA46",color:'#EDF2EF',width:'100%',padding:'8px',height:'50px'}} onClick={login}>Sign up</Button>
<Link href='/login' >
<Typography variant="subtitle" style={{color:"white",fontFamily:pops.style.fontFamily}}>Already have an account ?Login</Typography></Link>
      </Stack>
    </main>
  )
}
