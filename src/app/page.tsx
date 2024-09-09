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
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold">
          FULL STACK BLOG APP
        </h1>
      </div>
      <div className="w-full">
        <Link href="/blog/add"></Link>
      </div>
    </main>
  );
}
