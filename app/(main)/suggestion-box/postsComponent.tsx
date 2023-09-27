import { Session } from "next-auth";
import prisma from "@/lib/prisma";
import Image from "next/image";

async function PostsComponent({ session }: { session: Session | any }) { 
    const thoughts = await prisma.thought.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in descending order 
      },
    });
  
    return (
        <>
        <div>
          <h1 className="text-2xl font-extrabold">All Galaxy Thoughts</h1>
          {thoughts.map((thought) => (
            <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <span className="font-light text-gray-600">{String(thought.updatedAt)}</span>
                </div>
                <div className="mt-2">
                    <p className="mt-2 text-gray-600 text-lg font-bold">{thought.text}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    {/* <a className="text-blue-600 hover:underline" href="#">Like</a> */}
                    <div>
                        <a className="flex items-center" href="#">
                        <Image
                          className="mx-4 object-cover rounded-full hidden sm:block"
                          height={25}
                          width={25}
                          src={thought.user.image || '/images/unknown.png'} // Provide a fallback image source
                          alt="avatar"
                        />
                            <h1 className="text-gray-700 font-bold">{thought.user.name}</h1>
                        </a>
                    </div>
                </div>
            </div>
          ))}
        </div>
    </>
    );
}
export default PostsComponent; 