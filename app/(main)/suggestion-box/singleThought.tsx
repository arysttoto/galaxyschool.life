'use client' 
import { Session } from "next-auth";
import Image from "next/image";

import { useState } from 'react'; 

function SingleThought({ thought }: { thought: any }) {
  const [liked, setLiked] = useState(thought.likedBySpecificUser); // Initialize liked state
  const [likes_count, setLikes_count] = useState(thought.likes.length); 

  const [isLiking, setIsLiking] = useState(false);

  const toggleLike = async () => {
    if (isLiking) {
      return; // Prevent multiple clicks while a request is in progress
    }
  
    try {
      setIsLiking(true); // Disable the button
    
      setLiked(!liked);
      setLikes_count(liked ? likes_count - 1 : likes_count + 1);
    
      // Send a request to your server to like/unlike the thought based on the `liked` state
      const response = await fetch(`/api/like/thought/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thoughtId: thought.id,
        }),
      });
    
      if (response.ok) {
        // Update the liked state after a successful like/unlike operation
        const body = await response.json();
      } else {
        console.error('Failed to like/unlike thought');
        setLiked(!liked); // Revert the liked state if the request fails
      }
    } catch (error) {
      console.error('An error occurred while liking/unliking thought', error);
      setLiked(!liked); // Revert the liked state on error
    } finally {
      setIsLiking(false); // Re-enable the button
    }
  };


  return (
    <>
      <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <span className="font-light text-gray-600">{String(thought.updatedAt)}</span>
        </div>
        <div className="mt-2">
          <p className="mt-2 text-gray-600 text-lg font-bold">{thought.text}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={toggleLike}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart text-red-600"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> 
            <p className="text-gray-600">{likes_count}</p>
          </button> 
          <div>
            <a className="flex items-center" href="#">
              <Image
                className="mx-4 object-cover rounded-full hidden sm:block"
                height={25}
                width={25}
                src={thought.user.image || '/images/unknown.png'}
                alt="avatar"
              />
              <h1 className="text-gray-700 font-bold">{thought.user.name}</h1>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleThought;
