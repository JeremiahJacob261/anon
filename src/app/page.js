"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Stack from '@mui/material/Stack'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
export default function Home() {
  return (
    <main style={{background:'#171A21',display:'flex',justifyContent:'center',padding:'9px'}}>
      <Stack direction='column' 
      style={{width:'300px'}}
      spacing={4} alignItems="center" justifyContent="stretch">

      <h1 style={{color:'whitesmoke'}}>ANON</h1>
      <Typography style={{color:'whitesmoke'}}>Welcome to ANON, the most trusted Anonymous Messaging App</Typography>
      <Link href='/login'
      style={{width:'100%'}}>
      <Button variant='contained' style={{width:'100%',background:'black'}}>LOGIN</Button></Link>
      <Button variant='standard' style={{width:'100%',background:'white'}}>REGISTER</Button>
      </Stack>
    </main>
  )
}
