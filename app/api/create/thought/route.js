// imports for fetching user data 
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from 'next/server'; 
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req) {  
    // security checks 
    const session = await getServerSession(authOptions);     
    if (!session) { 
      return NextResponse.json({
        error: 'Authentication Failed'
      }, {
        status: 401,
        statusText: 'Authentication Failed'
      }) 
    } 
    const user = await prisma.user.findUnique({
        where: {email: session.user.email},
    }); 
    if (!user) {
        return NextResponse.json({
          error: 'Authentication failed.'
        }, {
          status: 401,
          statusText: 'Authentication failed.'
        }) 
      } 
    const bodyJson = await req.json(); 
    const content = bodyJson.content;
    await prisma.thought.create({
    data: {
      text: content,
      userId: user.id 
    } 
  }) 
    return NextResponse.json({
        message: "Success!"
      }, {
        status: 200,
      })
} 