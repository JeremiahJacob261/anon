"use client"
import { supabase } from "@/api/supabase";
import { Stack, TextField,Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";
import {Poppins} from 'next/font/google'
    const pops = Poppins({ subsets: ['latin'],weight:'300' });
export default function Comment({params}) {
  const [post,setPost] = useState([]);
  const [topic,setTopic] = useState('')
  console.log(params);
  useEffect(()=>{
const getPost=async(para)=> {
try{
  const { data, error } = await supabase
        .from('comment')
        .select()
        .eq('code',para)
        .order('id', { ascending: false });
  setPost(data);
  console.log(data);
}catch(e){

  console.log(e);
}
  }
  getPost(params.comments);
  const getTost=async(para)=> {
    try{
      const { data, error } = await supabase
            .from('topics')
            .select()
            .eq('code',para)
            .order('id', { ascending: false });
      setTopic(data[0].title);
      console.log(data);
    }catch(e){
    
      console.log(e);
    }
      }
      getTost(params.comments);
  },[])
 
   if (post.length != 0) {
    return(
      <Stack style={{padding:'8px',background:'#171A21',minHeight:'100vh'}} direction='column'>
        <Link href='/welcome'>
        <ArrowBackIosNewIcon sx={{color:'white',width:'30px',height:'30px'}}/>
        </Link>
        <Stack alignItems='center' justifyContent="center" >
          <Typography sx={{fontSize:'20px',color:'white',fontWeight:'700',fontFamily:pops.style.fontFamily}}>{topic}</Typography>
        </Stack>
        <Stack direction='column' spacing={2}>
            {
                post.map((l)=>{
                  let cdate = new Date(l.created_at).getFullYear() + '-' + parseInt(new Date(l.created_at).getMonth() + 1) +'-'+new Date(l.created_at).getDay()+' '+new Date(l.created_at).getHours()+':'+new Date(l.created_at).getMinutes()
    
                    return(
                        <Stack key={l.id} sx={{background:'#232730',padding:'15px',minHeight:'100px'}} direction='column' alignItems='center' justifyContent='space-between'>
                          <Typography sx={{fontSize:'16px',color:'white',fontWeight:'300',fontFamily:pops.style.fontFamily}}>
                          {l.comment}
                          </Typography>
                          <Typography 
      style={{color:'#D0D0D0',fontWeight:'200',fontSize:'14px',fontFamily:pops.style.fontFamily}}
      >
       {cdate}
      </Typography>
                        </Stack>
                    )
                })
            }</Stack>
       
      </Stack>
  )
   } else {
    return(
      <Stack style={{padding:'8px',background:'#171A21',height:'100vh'}} direction='column'>
        <Link href='/welcome'>
        <ArrowBackIosNewIcon sx={{color:'white',width:'30px',height:'30px'}}/>
        </Link>
        <Stack alignItems='center' justifyContent="center" >
          <Typography sx={{fontSize:'20px',color:'white',fontWeight:'700',fontFamily:pops.style.fontFamily}}>{topic}</Typography>
        </Stack>
        <Stack direction='column' spacing={2}>
        <Typography sx={{fontSize:'20px',color:'red',fontWeight:'400',fontFamily:pops.style.fontFamily}}>No COMMENT HAS BEEN MADE</Typography>
          </Stack>
       
      </Stack>
  )
   }
}
  
  // This also gets called at build time
  export async function generateStaticParams() {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    
    
    return ;
  }
  ///originsals
  