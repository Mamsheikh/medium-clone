import { gql, useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateForm from '../components/cards/CreateForm';
import Preview from '../components/cards/Preview';
import Editor from '../components/editor/Quill';
import Quill from '../components/editor/ReactQuil';
import { IBlog } from '../utils/types';
import { imageUpload } from '../utils/uploadImage';
import { validateCreateBlog } from '../utils/validation';

const CreateBlogMutation = gql`
  mutation CreatePost(
    $title: String!
    $thumbnail: String!
    $content: String!
    $category: String!
  ) {
    createPost(
      title: $title
      thumbnail: $thumbnail
      content: $content
      category: $category
    ) {
      id
      title
      content
      thumbnail
    }
  }
`;

const CreatePost = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [CreatePost, { data, error }] = useMutation(CreateBlogMutation, {
    onCompleted: (data) => {
      router.push('/');
    },
  });
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
  const [body, setBody] = useState('');

  const divRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  if (status === 'unauthenticated') {
    router.push('/');
  }
  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const text = div?.innerText as string;
    setText(text);
  }, [body]);

  const handleSubmit = async () => {
    const check = validateCreateBlog({ ...blog, content: body });
    console.log(check);
    if (check.errLenth !== 0) return;

    // if (blog.title.trim().length < 10) {
    //   toast.error('Title must have atleast 10 characters.');
    // }
    // if (blog.title.trim().length > 50) {
    //   toast.error('Title must not be more than 50 characters.');
    // }
    // if (blog.description.trim().length < 50) {
    //   toast.error('Description must not be more than 50 characters.');
    // }
    // if (!blog.thumbnail) {
    //   toast.error('Thumbnail cannot be left blank😥');
    // }
    // if (!blog.category) {
    //   toast.error('Cateogry cannot be left blank😥');
    // }
    // if (blog.description.trim().length > 200) {
    //   toast.error('Description must not be more than 200 characters.😥');
    // }
    // if (blog.content.trim().length < 2000) {
    //   toast.error('Content must be atleast 2000 characters.');
    // }
    // let newData = { ...blog, content: body };
    toast.promise(
      CreatePost({
        variables: {
          title: blog.title,
          thumbnail: blog.thumbnail,
          category: blog.category,
          content: body,
        },
      }),
      {
        loading: 'Creating ...',
        success: 'Blog created successfully🎉',
        error: `Something went wrong!😥`,
      }
    );
    console.log(data);
  };
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
      <Editor body={body} setBody={setBody} />
      <small>{text.length}</small>
      <div
        style={{ display: 'none' }}
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
      <button
        onClick={handleSubmit}
        // disabled={
        //   !blog.title || !blog.category || !blog.content || !blog.thumbnail
        // }
        className={`${
          !blog.title || !blog.category || !blog.content || !blog.thumbnail
            ? 'bg-green-400'
            : ''
        } p-2 bg-green-600 rounded-md text-white block  mt-5 mx-auto`}
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
