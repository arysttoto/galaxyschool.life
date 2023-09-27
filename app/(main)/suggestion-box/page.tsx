import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";
import FormThought from './formThought';
import PostsComponent from './postsComponent';
import { Session } from 'next-auth';

async function SuggestionBox() {  
    const session = await getServerSession(authOptions); 
    if (!session) {
        redirect("/signup"); 
    } 
    console.log(session); 
    return (
        <>
        <div className='m-8 my-24 lg:m-32'>
            <FormThought session={session}/> 
            <PostsComponent session={session}/> 
        </div>
        </>
    ); 
}
export default SuggestionBox; 