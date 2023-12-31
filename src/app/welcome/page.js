"use client"
import { useState, useEffect } from "react";
import { Divider, Stack, Typography, Button, Box, Container, TextField, Modal } from "@mui/material";
import { supabase } from "../../api/supabase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Poppins } from 'next/font/google'
const pops = Poppins({ subsets: ['latin'], weight: '300' });

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: '400px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  height: '315px',
  p: 4, padding: '12px', background: '#232730', border: '1px #353943'
};

export default function Welcome() {
  const router = useRouter();
  const [useri, setUseri] = useState('');
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [lists, setLists] = useState([]);
  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    toast('Topic Added Successfully');
  };
  //endmodal 
  //create random de topic
  const topic = async (title) => {
    if (title.length < 1) {
      alert('Please Input a topic')
    } else {
      const { data, error } = await supabase
        .from('topics')
        .insert({
          'title': title,
          'email': useri.email,
          'code': generateString(5),
        })
      console.log(error)
      setTitle('');
      handleClose();
      router.push('/welcome')
    }
  }
  //end topic creation
  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      console.log(error)
      if (user) {
        setUseri(user);
        getL(user.email);
      }
    }
    getUser();

    const getL = async (emails) => {
      try {

        const { data, error } = await supabase
          .from('topics')
          .select()
          .eq('email', emails)
          .order('id', { ascending: false });
        setLists(data);
        console.log(data)
        console.log(emails)
      } catch (error) {
        console.log(error)
      }
    }

  }, [lists]);
  const signOuts = () => {
    supabase.auth.signOut();
    localStorage.removeItem('username');
    router.push('/login')
  }
  //generate random string
  const generateString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  //end of random string


  function Little() {
    if (lists && lists.length > 0 && lists !== null) {
      return (
        <Stack direction="column" spacing={1} >

          {
            lists.map((l) => {
              console.log(l.title)
              let date = new Date(l.created_at).getFullYear();
              let cdate = new Date(l.created_at).getFullYear() + '-' + parseInt(new Date(l.created_at).getMonth() + 1) + '-' + new Date(l.created_at).getDay() + ' ' + new Date(l.created_at).getHours() + ':' + new Date(l.created_at).getMinutes()
              console.log(date)
              let linkers = `/comment/${l.code}`
              return (

                <Stack direction="row" key={l.code} justifyContent='space-between' alignItems='center' sx={{ width: '100%', height: '60px', background: '#232730', padding: '8px', fontFamily: pops.style.fontFamily }}>

                  <Link href={'/comment/' + l.code} style={{ flex: 1 }}>
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                    >

                      <Stack>
                        <Typography
                          style={{ color: 'white', fontWeight: '600', fontSize: '14px', fontFamily: pops.style.fontFamily }}
                        >
                          {l.title}
                        </Typography>
                        <Typography
                          style={{ color: '#D0D0D0', fontWeight: '300', fontSize: '14px', fontFamily: pops.style.fontFamily }}
                        >
                          {cdate}
                        </Typography>
                      </Stack>
                    </motion.div>
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.09 }}
                    onClick={() => {
                      navigator.clipboard.writeText(`https://jerrydev.com.ng/messages/${l.code}`);
                      toast.success('Link Copied !');
                    }}>

                    <ContentPasteIcon sx={{ color: '#D0D0D0', width: '100px' }} />
                  </motion.div>


                </Stack>
              )
            })
          }
        </Stack>
      )
    } else {
      return (
        <Typography sx={{ color: 'white', fontFamily: pops.style.fontFamily }}>No Topics Yet</Typography>
      )
    }
  }
  return (
    <Box style={{ padding: '8px', minHeight: '100vh', background: '#171A21' }} >
      <Alert />
      <Toaster position="bottom-center" />
      <Stack direction='row' sx={{ background: '#232730', width: '100%', height: '65px', padding: '12px', borderRadius: '10px' }} justifyContent='space-between' alignItems='center'>
        <Typography variant="subtitle1" sx={{ fontSize: '20px', fontWeight: '600', color: 'white', fontFamily: pops.style.fontFamily }}>Hello {username ?? ''}</Typography>
        <ExitToAppIcon onClick={signOuts} sx={{ width: '21px', height: '21px', color: 'white' }} />
      </Stack>

      <Stack direction="column" spacing={1} >
        <Typography sx={{ color: 'white' }}>Recent</Typography>
        <Divider sx={{ background: 'white' }} />
        <Little />
      </Stack>
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: '20px', left: '46%', background: '#363636' }} onClick={handleOpen}>
        <AddIcon />
      </Fab>
    </Box>
  )
  function Alert() {
    const [message, setMessage] = useState("");

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} justifyContent='center' alignItems='center' spacing={7}>
          <Typography sx={{ color: 'white', fontFamily: pops.style.fontFamily, fontWeight: '700', fontSize: '14px' }}>CREATE NEW TOPIC</Typography>
          <TextField sx={{ background: '#353943', color: 'white', fontFamily: pops.style.fontFamily, width: '100%', input: { color: 'white' } }} placeholder="Input New Topic" value={message} onChange={(m) => {
            setMessage(m.target.value);
          }} />
          <Button sx={{ background: '#353943', color: 'white', fontFamily: pops.style.fontFamily, width: '100%' }} onClick={() => {
            topic(message);
          }}>CREATE</Button>
        </Stack>
      </Modal>
    )
  }
}
