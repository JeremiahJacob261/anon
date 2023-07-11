"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Stack from '@mui/material/Stack'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import {Poppins} from 'next/font/google'
    const pops = Poppins({ subsets: ['latin'],weight:'300' });
export default function Home() {
  return (
    <main className={pops.className} style={{background:'#171A21',display:'flex',justifyContent:'center',padding:'9px',height:'100vh'}}>
      <Stack direction='column' 
      style={{width:'300px'}}
      spacing={4} alignItems="center" >
      <h1 style={{color:'whitesmoke',fontFamily:pops.style.fontFamily}}>ANON</h1>
      <Typography style={{color:'whitesmoke',fontFamily:pops.style.fontFamily}}>Welcome to ANON, the most trusted Anonymous Messaging App</Typography>
      <Link href='/login'
      style={{width:'100%'}}>
      <Button variant='contained' style={{width:'100%',background:'black',padding:'8px'}}>LOGIN</Button></Link>
      <Link href='/register'
      style={{width:'100%'}}>
      <Button variant='standard' style={{width:'100%',background:'white',color:'black',padding:'8px'}}>REGISTER</Button></Link>
      </Stack>
    </main>
  )
}
