"use client"
import { supabase } from '@/api/supabase'
import Stack from '@mui/material/Stack'
import { Button, Typography } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { Poppins } from 'next/font/google'
import Backdrop from '@mui/material/Backdrop';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
const pops = Poppins({ subsets: ['latin'], weight: '300' });


function generateRandomString(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
export default function Home() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClose = () => setOpen(false);
  const continuex = () => {
    setOpen(true);
    const uuid = generateRandomString() //this code generates a random string and stores it in the local storage & redirects to the messages page & stors in db
    localStorage.setItem('uuid', uuid);
    const savetodb = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          'uid': uuid,
        })
    }
    savetodb().then(() => {
      toast.success('Welcome to ANON');
      router.push('/welcome');
    }).catch((e) => {
      console.log(e);
      handleClose();
      toast.error('An error occured');
    });
  }
  const starts = () => {
    try {
        if (!localStorage.getItem('uuid')) {
          continuex()
        } else {
          router.push('/welcome')
        }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className={pops.className} style={{ background: '#171A21', display: 'flex', justifyContent: 'center', padding: '9px', height: '100vh' }}>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster />
      <Stack direction='column'
        style={{ width: '300px' }}
        spacing={4} alignItems="center" justifyContent="center" >
        <h1 style={{ color: 'whitesmoke', fontFamily: pops.style.fontFamily }}>ANON</h1>
        <Typography style={{ color: 'whitesmoke', fontFamily: pops.style.fontFamily }}>Welcome to ANON, the most trusted Anonymous Messaging App</Typography>
        {/* <Link href='/login'
          style={{ width: '100%' }}>
          <Button variant='contained' style={{ width: '100%', background: 'black', padding: '8px' }}>LOGIN</Button></Link>
        <Link href='/register'
          style={{ width: '100%' }}>
          <Button variant='standard' style={{ width: '100%', background: 'white', color: 'black', padding: '8px' }}>REGISTER</Button></Link>
      */}


        <Button variant='contained' onClick={starts} style={{ width: '100%', background: 'black', padding: '8px' }}>CONTINUE</Button>


      </Stack>
    </main>
  )
}
