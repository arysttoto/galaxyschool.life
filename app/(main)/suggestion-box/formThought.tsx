'use client'
import React, { FormEvent, useState } from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';

function FormThought({ session }: { session: Session | any }) {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false); // Add a loading state

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state to true while the request is being made
      // Send request to server api for generated word documents
      const response = await fetch('/api/create/thought/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      });
      if (!response.ok) {
        const response_text = await response.json();
        setMessage(response_text.message);
      } else {
        setMessage("Success! New thought was uploaded, reload the page to see it.");
      }
    } catch (error: any) {
      setMessage("Please try later.");
    } finally {
      setLoading(false); // Set loading state back to false when the request is done
    }
  };

  return (
    <>
      <div className="w-11/12 md:w-9/12 sm:w-9/12 bg-white shadow-xl rounded-2xl transform -translate-y-5 p-5">
        <section className="w-full flex px-3 py-2">
          {isLoading ? (
            <p className='text-yellow-600 text-lg'>Loading... </p>
          ) : (
            <p className='text-yellow-600 text-lg'>{message} </p>
          )}
          <div className="mr-1">
            <Image
              className="rounded-full"
              width={30}
              height={30} 
              src={session.user?.image}  
              alt="Profile Picture"
            />
          </div>
          <div className="flex-1">
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <textarea
                className="w-full p-2 bg-transparent outline-none placeholder-gray-400 text-gray-600 resize-none rounded-xl border border-gray-200"
                rows={4}
                placeholder="Why there are no clubs?!"
                value={content}
                onChange={handleContentChange} 
              ></textarea>
              <div className="flex items-center justify-between pt-2"> 
                <div>
                  <button
                    className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                    type="submit"
                    disabled={isLoading} // Disable the button when loading
                  >
                    {isLoading ? 'Creating...' : 'Create Thought!'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default FormThought;
