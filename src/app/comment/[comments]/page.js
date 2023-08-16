"use client"
import { supabase } from "@/api/supabase";
import { Stack, TextField,Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
export default function Comment({params}) {
  const [post,setPost] = useState([]);
  const [topic,setTopic] = useState('')
  console.log(params);
  useEffect(()=>{
const getPost=async(para)=> {
    const { data, error } = await supabase
        .from('comment')
        .select()
        .eq('code',para)
        .order('id', { ascending: false });
  setPost(data);
  setTopic(data[0].quest);
  console.log(data);
  console.log(error);
  }
  getPost(params.comments);
  },[])
 
    return(
        <div >
          <Stack direction="column" justifyContent="center" sx={{padding:'8px'}}>
            <Typography sx={{fontSize:'17px'}}>{topic}</Typography>
              {
                  post.map((p)=>{
                      return(
                          <div>
                            {p.comment}
                          </div>
                      )
                  })
              }
         
          </Stack>
        </div>
    )
}
  
  // This also gets called at build time
  export async function generateStaticParams() {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    
    
    return ;
  }
  ///originsals
  