import { Session } from "next-auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import SingleThought from "./singleThought";


async function PostsComponent({ session }: { session: Session | any }) { 
    const user = await prisma.user.findUnique({
      where: {email: session.user.email},
    }); 

    const thoughts = await prisma.thought.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        likes: { // Include the likes relationship
          select: {
            userId: true // Check if the user is logged in
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in descending order 
      },
    });
    const thoughtsWithLikes = thoughts.map((thought) => ({
      ...thought,
      likedBySpecificUser: thought.likes.some((like) => like.userId === user?.id), 
    }));

    return ( 
        <>
        <div>
          <h1 className="text-2xl font-extrabold">All Galaxy Thoughts</h1>
          {thoughtsWithLikes.map((thought) => (
            <SingleThought thought={thought} />
          ))} 
        </div>
    </>
    );
}
export default PostsComponent; 