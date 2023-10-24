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
    const content = bodyJson;
    const thoughtId = content.thoughtId; 
    // Check if the user has already liked/unliked the thought
    const existingLike = await prisma.like.findFirst({
        where: {
          userId: user.id, // You should have a way to access the user's ID in the session
          thoughtId: parseInt(thoughtId),
        },
      });
    if (!existingLike) {
        await prisma.like.create({
            data: {
              userId: user.id, 
              thoughtId: parseInt(thoughtId) 
            } 
            }); 
    }
    else {
        await prisma.like.delete({
            where: {
              id: existingLike.id,
            },
          });  
    }

    return NextResponse.json({
        message: "Success" 
      }, {
        status: 200,
      })
} 