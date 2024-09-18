"use client"
import { supabase } from "@/api/supabase";
import { Stack, TextField,Typography,Button,Modal } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import Reply from "@/functions/reply";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter,usePathname, useSearchParams } from "next/navigation";
import {Poppins} from 'next/font/google'
    const pops = Poppins({ subsets: ['latin'],weight:'300' });
export default function Messages({params}) {
  const router = useRouter();

  const [drop, setDrop] = useState(false);
  const handleClosex = () => {
    setDrop(false);
  };
  const handleOpenx = () => {
    setDrop(true);
  };

    //modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => router.push('/');
    //endmodal 
  const [post,setPost] = useState({})
  const [comment,setComment] = useState('');
  console.log(params.message)
  const getPost=async(para)=> {
    const { data, error } = await supabase
        .from('topics')
        .select()
        .eq('code',para);
  setPost(data[0]);
  }
  useEffect(()=>{

  getPost(params.message);
  },[])
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth:'400px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    height:'315px',
    p: 4,padding:'12px',background:'#232730',border:'1px #353943'
  };
    return(
        <div style={{background:'#232730',height:'100vh',padding:'8px'}}>
          <Alert/>
          <Stack direction="column" justifyContent='space-between' alignItems='center' sx={{height:'90%'}}>
            <Typography sx={{fontSize:'17px',color:'white',fontWeight:'600',fontFamily:pops.style.fontFamily}}>Question: {post.title ?? "title"}</Typography>
         
         <Stack direction='row' alignItems='center' spacing={3} sx={{width:'100%'}}>
          <TextField 
          sx={{background:'#353943',color:'white',fontFamily:pops.style.fontFamily,width:'100%',input: { color: 'white' },borderRadius:'5px'}}
          placeholder="input your comment here" value={comment} onChange={(e)=>{
            setComment(e.target.value);
          }}/>
        <ArrowForwardIosIcon sx={{color:'white'}} onClick={()=>{
          if (comment.length < 1) {
            alert('please input a least 4 characters!')
          } else {
            handleOpenx();
            Reply(params.message,comment,post.title).then((res)=>{
              handleClosex();
            })
          setComment('');
          handleOpen()
          }
        }}/>
         </Stack>
          </Stack>
        </div>
    )
    function Alert() {
      const [message,setMessage] = useState("");
    
      return(
        <Modal 
        open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
        >
          <Stack sx={style} justifyContent='center' alignItems='center' spacing={7}>
            <Typography sx={{color:'green',fontFamily:pops.style.fontFamily,fontWeight:'700',fontSize:'14px'}}>Success</Typography>
            <Typography sx={{color:'white',fontFamily:pops.style.fontFamily,fontWeight:'400',fontSize:'14px'}}>Your message was successfully sent</Typography>
<Button sx={{background:'#353943',color:'white',fontFamily:pops.style.fontFamily,width:'100%'}} onClick={handleClose}>OK</Button>
          </Stack>
        </Modal>
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
  