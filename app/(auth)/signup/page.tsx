import SignUpComponent from "./signUpComponent";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";

export const metadata = {
  title: 'Sign Up - Galaxy School Life',
  description: 'Sign Up to your Galaxy School Life account.',
}

export default async function SignUpPage() {
  const session = await getServerSession(authOptions); 
  
  if (session) {
    redirect("/"); 
  } 
  return (
    <>
    <SignUpComponent /> 
    </>
  )
}
