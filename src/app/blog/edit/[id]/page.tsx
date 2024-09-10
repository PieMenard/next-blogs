'use client';

import { FormEvent, Fragment, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type updateBlogParams = {
  title: string;
  description: string;
  id: string;
};

const updateBlog = async (data: updateBlogParams) => {
  const res = fetch(`/api/blog/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: data.title,
      description: data.description,
    }),
    //@ts-ignore
    'Content-Type': 'application/json',
  });
  return (await res).json();
};

const getBlogById = async (id: string) => {
  const res = await fetch(`/api/blog/${id}`);
  const data = await res.json();
  return data.data;
};

const EditBlogPage = ({ params }: { params: { id: string } }) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    toast.loading('Fetching post...', { id: '1' });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success('Fetching complete', { id: '1' });
        }
      })
      .catch((err) => toast.error('Error fetching post', { id: '1' }));
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading('Sending Request', { id: '1' });
      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });
      toast.success('Blog Updated Succesfully', { id: '1' });
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Edit your post
          </p>
          <form onSubmit={onSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="w-full rounded-md px-4 py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter description"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBlogPage;
