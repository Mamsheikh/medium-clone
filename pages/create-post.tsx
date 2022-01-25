import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreateForm from '../components/cards/CreateForm';
import Preview from '../components/cards/Preview';
import { IBlog } from '../utils/types';

const CreatePost = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  //
  const initData = {
    user: '',
    title: '',
    content: '',
    description: '',
    thumbnail: '',
    category: '',
    createdAt: new Date().toISOString(),
  };
  const [blog, setBlog] = useState<IBlog>(initData);

  if (status === 'unauthenticated') {
    router.push('/');
  }
  return (
    <div className='container mx-auto py-12'>
      <div className='grid grid-cols-2'>
        <div>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        <div>
          <Preview blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
