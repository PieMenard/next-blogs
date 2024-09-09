'use client';

import { Post } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

async function fetchPosts() {
  // const response = await fetch('/http://localhost3000/api/blog', {
  //   next: {
  //     revalidate: 10,
  //   },
  // });
  // const data = await response.json();
  // return data.posts;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('/api/blog');
      const results = await response.json();
      setPosts(results.data);
    };
    getPosts();
  }, []);

  console.log(posts);
  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold">
          FULL STACK BLOG APP
        </h1>
      </div>
      <div className="flex my-5 ">
        <Link
          href="/blog/add"
          className="md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold"
        >
          Add New Post
        </Link>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {posts?.map((post: Post) => (
          <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center">
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold">{post.title}</h2>
              </div>
              <Link
                href={`/blog/edit/${post.id}`}
                className="px-4 py-2 text-center bg-slate-900 rounded-md font-semibold text-slate-200"
              >
                Edit
              </Link>
            </div>
            <div className="mr-auto my-1">
              <blockquote className="font-bold text-slate-700">
                {new Date(post.date).toDateString()}
              </blockquote>
            </div>
            <div className="mr-auto my-1">
              <h2>{post.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
