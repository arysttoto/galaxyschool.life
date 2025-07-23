import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from 'next/server'; 
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface ThoughtRequestBody {
  content?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Authentication failed.' },
        { status: 401 }
      );
    }

    // User Lookup
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 401 }
      );
    }

    // Validate input
    const body: ThoughtRequestBody = await req.json();
    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing `content`.' },
        { status: 400 }
      );
    }

    // Save to DB
    await prisma.thought.create({
      data: {
        text: body.content,
        userId: user.id,
      },
    });

    return NextResponse.json({ message: 'Success!' }, { status: 200 });

  } catch (error) {
    console.error('POST /api/your-route error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
