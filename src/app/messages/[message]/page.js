"use client"
import { supabase } from "@/api/supabase";
import { Stack, TextField,Button } from "@mui/material";
import { useEffect, useState } from "react";
import Reply from "@/functions/reply";
export default function Messages({params}) {
  const [post,setPost] = useState({})
  const [comment,setComment] = useState('');
  console.log(params.message)
  useEffect(()=>{
const getPost=async(para)=> {
    const { data, error } = await supabase
        .from('topics')
        .select()
        .eq('code',para);
  setPost(data[0]);
  console.log(data);
  console.log(error);
  }
  getPost(params.message);
  },[])
 
    return(
        <div >
          <Stack direction="column">
         {post.title}
          <TextField placeholder="input your comment here" value={comment} onChange={(e)=>{
            setComment(e.target.value);
          }}/>
          <Button onClick={()=>{
            if (comment.length < 1) {
              alert('please input a least 4 characters!')
            } else {
              Reply(params.message,comment,post.title);
            setComment('');
            }
            
          }}>comment</Button>
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
  