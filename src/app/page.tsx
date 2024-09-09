'use client';

import { Post } from '@prisma/client';
import { useEffect, useState } from 'react';

async function fetchBlogs() {
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
      const response = await fetch('/api/blogs');
      const results = await response.json();
      setPosts(results.data);
    };
    getPosts();
  }, []);

  console.log(posts);
  return <div>Home Page</div>;
}
