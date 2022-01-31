import { GetStaticPaths } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import prisma from '../../lib/prisma';
import { Comment, Post } from '../../typings';
import PortableText from 'react-portable-text';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LiteQuill from '../../components/editor/LiteQuill';
import { useRef, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import toast from 'react-hot-toast';

interface Props {
  post: Post;
  comments: Comment[];
}

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment(
    $postId: String!
    $userId: String!
    $content: String!
  ) {
    createComment(postId: $postId, userId: $userId, content: $content) {
      id
      content
      postId
      userId
    }
  }
`;
const SignlePost = ({ post, comments }: Props) => {
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
  const [body, setBody] = useState('');
  const divRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const handleSubmit = () => {
    const div = divRef.current;
    const text = div?.innerText as string;
    if (!text.trim()) return;
    toast.promise(
      createComment({
        variables: {
          userId: post.userId,
          postId: post.id,
          content: text,
        },
      }),
      {
        loading: 'Creating comment...',
        error: 'No comment',
        success: 'Comment created successfull',
      }
    );
    console.log({ content: text });
  };
  return (
    <main>
      <Head>
        <title>{post.title}</title>
      </Head>
      <img className='w-full h-40 object-cover' src={post.thumbnail} alt='' />
      <article className='max-w-4xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>
          Again Blog description goes here, it does'nt support my db currently
        </h2>
        <div className='flex items-center space-x-2'>
          <img
            className='h-10 w-10 rounded-full'
            src={post.user.image}
            alt=''
          />
          <p className='font-extralight text-sm'>
            Blog post by{' '}
            <span className='text-green-600 font-semibold'>
              {post.user.name}
            </span>{' '}
            - Published at {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className='mt-10'>
          {/* <ReactQuill value={post.content} readOnly={true} theme={'bubble'} /> */}
          <div
            className='style'
            style={{ textDecoration: 'none' }}
            // ref={divRef}
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </div>
      </article>
      <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
      <div className='flex flex-col p-5 max-w-2xl mx-auto mb-10'>
        <h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
        <h3 className='text-3xl font-bold'>Leave a comment below!</h3>
        <hr className='py-3 mt-2' />
        {!session ? (
          <h3>
            <Link href={`/login`}>
              <a className='text-blue-500'>Login</a>
            </Link>{' '}
            to leave a comment
          </h3>
        ) : (
          <>
            <LiteQuill body={body} setBody={setBody} />
            <button
              onClick={handleSubmit}
              type='submit'
              className=' mt-5 shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer'
            >
              Comment
            </button>
            <div
              ref={divRef}
              dangerouslySetInnerHTML={{
                __html: body,
              }}
            />
          </>
        )}
      </div>
      <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-yellow-500 space-y-2'>
        <h3 className='text-4xl'>Comments</h3>
        <hr className='pb-2' />
        {comments.map((comment) => (
          <div key={comment.id} className='flex'>
            <img
              className='h-10 w-10 rounded-full mr-4'
              src={comment.user.image}
              alt=''
            />
            <span className='text-yellow-500'>{comment.user.name}: </span>
            <div
              dangerouslySetInnerHTML={{
                __html: comment.content,
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default SignlePost;

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  const paths = posts.map((post: Post) => ({
    params: {
      id: post.id,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await prisma.post.findUnique({
    where: { id: params.id as string },
    include: { user: true, comments: true },
  }); // your fetch function here
  const comments = await prisma.comment.findMany({
    where: { postId: data.id },
    include: { user: true },
  });
  const post = JSON.parse(JSON.stringify(data));
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
      comments,
    },
    revalidate: 60,
  };
};
