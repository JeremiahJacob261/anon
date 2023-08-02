"use client"
import { supabase } from "@/api/supabase";
import { useState } from "react";
export default function Messages({params}) {
  const [post,setPost] = useState({})
 const getPost=async()=> {
    const { data, error } = await supabase
        .from('topics')
        .select()
        .eq('code','101')
  setPost(data[0]);
  }
  getPost()
    return(
        <div>
          {post.title}
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
  