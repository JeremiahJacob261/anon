"use client"
import Image from 'next/image'
import {useState,useEffect} from 'react'
import styles from '../page.module.css'
import Stack from '@mui/material/Stack'
import { Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { resend } from '@/api/resend'
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
    useEffect(()=>{
      try{
const user = supabase.auth.user()
      if (user) {
        route.push('/welcome')
      }


      }catch(e){
console.log(e)
      }
      
      },[])

      const signEmail = async () => { 
        
resend.emails.send({
  from: 'onboarding@resend.dev',
  to: email,
  subject: 'Hello from Anon',
  html: '<p>Congrats on Signing Up<strong>ON THE BEST ANON APP</strong>!</p>'
});
      }
  const login=async()=>{
  if (pass != cpass) {
    alert('ensure both passwords are the same')
  } else {
    try{

    
      const { data, error } = await supabase.auth.signUp(
        {
          email: email,
          password: pass,
          options: {
            data: {
              first_name: name,
            },
            emailRedirectTo: 'http://localhost:3000/welcome'
          }
        }
      )
console.log(data);
if (error) {
  alert(error.message)
}
signEmail();
    }catch(e){
      console.log(e)
    }
const saveUser = async () => {
  const user = supabase.auth.user()
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      { uid: user.id, email: user.email,name:name },
    ])
  if (error) {
    alert(error.message)
  }
}
saveUser();
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
