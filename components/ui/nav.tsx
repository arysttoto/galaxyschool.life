import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from './header'; 

async function Nav() {
    const session = await getServerSession(authOptions); 
    return (
        <>
        <Header session={session} /> 
        </>
    );
}
export default Nav;