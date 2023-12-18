"use client"
import Image from 'next/image'
import {useState,useEffect} from 'react'
import styles from '../page.module.css'
import Stack from '@mui/material/Stack'
import { Button, TextField, Typography } from '@mui/material'
import { supabase } from '@/api/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {Poppins} from 'next/font/google'
    const pops = Poppins({ subsets: ['latin'],weight:'300' })
export default function Login() {
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const route = useRouter();
    const [useri,setUser] = useState('')
  const login=async()=>{
try{
 const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    })
    console.log(error);
    localStorage.setItem('username',data.user.user_metadata.displayName)
    route.push('/welcome')
}catch(e){  
console.log(e)
}
   
  }

  useEffect(()=>{
   
  },[])
  return (
    <main style={{background:'#171A21',display:'flex',justifyContent:'center',padding:'9px',height:'100vh'}}>
      <Stack direction='column' 
      style={{minWidth:'300px'}}
      spacing={4} alignItems="center" justifyContent="center">

      <h1 style={{color:'whitesmoke',fontFamily:pops.style.fontFamily}}>Login</h1>
      <Typography style={{color:'whitesmoke',fontFamily:pops.style.fontFamily}}>Login to enjoy our services </Typography>
<TextField placeholder='Email' type='email' style={{background:'white',width:'100%'}} value={email}  onChange={(c)=>{
    setEmail(c.target.value)}}/>
<TextField placeholder='Password' type='password' style={{background:'white',width:'100%'}} value={pass}  onChange={(c)=>{
    setPass(c.target.value)}}/>
<Button style={{width:'100%',background:"#FCCA46",color:'#EDF2EF',padding:'12px'}}
   onKeyDown={(event)=>{
    if(
      event.key === "Enter" ||
      event.key === "Space"
      ){
        login()
      }
  }}
onClick={login}>login</Button>
<Link href='/register' >
<Typography variant="subtitle" style={{color:"white",fontFamily:pops.style.fontFamily}}>Dont have an account ?Sign Up</Typography></Link>
      </Stack>
    </main>
  )
}
