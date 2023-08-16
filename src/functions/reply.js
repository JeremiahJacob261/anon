import { supabase } from "@/api/supabase";

async function Reply(code,response,quest) {
   const {error} = await supabase
.from('comment')
.insert({
    'comment':response,
    'code':code,
    'quest':quest
})
console.log(error)
alert('uploaded successsfully')
}
export default Reply;