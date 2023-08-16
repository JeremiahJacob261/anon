"use client"
import { onAuthStateChanged } from "firebase/auth";
import { useState,useEffect } from "react";
import {app} from '../../api/firebase'
import { getAuth,signOut } from "firebase/auth";
import { Divider, Stack, Typography, Button,Box, Container,TextField } from "@mui/material";
import { supabase } from "../../api/supabase";
import { useRouter } from "next/navigation";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
export default function Welcome() {
    const auth = getAuth(app);
    const router = useRouter();
    const [useri,setUseri] = useState('');
    const [title,setTitle] = useState('');
    const [lists,setLists] = useState([]);
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            // ...
            setUseri(user)

        getL(user.email);
          } else {
            // User is signed out
            // ...
            console.log('sign out');
            router.push('/');
          }
        });
        const getL = async(emails)=>{
          try {
            
          const {data,error} = await supabase
          .from('topics')
          .select()
          .eq('email',emails)
          setLists(data);
          console.log(data)
          console.log(emails)
          } catch (error) {
            console.log(error)
          }
        }
      },[]);
      const signOuts =()=>{
        signOut(auth).then(()=>{
          
          router.push('/');
        })
      }
//generate random string
const generateString = (length)=> {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
//end of random string
//create random de topic
const topic = async()=>{
  if(title.length < 1){
    alert('Please Input a topic')
  }else{
    const {data,error} = await supabase
  .from('topics')
  .insert({
    'title':title,
    'email':useri.email,
    'code':generateString(5),
  })
  console.log(error)
alert('topic uploaded')
  setTitle('');
  }
}
//end topic creation


    return(
        <Box style={{padding:'8px',height:'100vh'}}>
          
<Typography variant="subtitle1">Welcome, {useri.displayName}</Typography>

<Button variant="dark" sx={{background:'red',color:'yellow'}} onClick={signOuts}>Log out</Button>

<Stack direction="column" spacing={4} alignItems="center">
    <TextField variant='filled' 
    type='text'
    placeholder="Write a Topic"
    style={{height:'40px',width:'300px'}}
    value={title} onChange={(e)=>setTitle(e.target.value)}/>
  <Button variant="contained" onClick={topic}>Create a Topic</Button>
      <Typography variant="button">Recent</Typography>
      <Divider/>
<Stack direction='column' style={
  {
    height:'200px'
  }
}>
 {
    lists.map((l)=>{
      console.log(l.title)
      return(
        <Stack direction="row" key={l.code}>
        <div 
        style={{padding:'8px',margin:'4px',border:"1px solid #50514F",background:'#E6E6E6'}}
        >
         {l.title}
        </div>
          <ContentPasteIcon sx={{color:'black'}}  onClick={()=>{
          navigator.clipboard.writeText(`http://localhost:3000/messages/${l.code}`)
        }}/>
        </Stack>
      )
    })
 }
</Stack></Stack>
        </Box>
    )
}