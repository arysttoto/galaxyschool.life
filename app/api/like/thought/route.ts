import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const { thoughtId } = await req.json();

    if (!thoughtId || isNaN(parseInt(thoughtId))) {
      return NextResponse.json({ error: 'Invalid thought ID' }, { status: 400 });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: user.id,
        thoughtId: parseInt(thoughtId),
      },
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
    } else {
      await prisma.like.create({
        data: {
          userId: user.id,
          thoughtId: parseInt(thoughtId),
        },
      });
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (error) {
    console.error('POST /api/like error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
