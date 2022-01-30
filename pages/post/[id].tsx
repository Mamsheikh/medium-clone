import { GetStaticPaths } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import prisma from '../../lib/prisma';
import { Post } from '../../typings';
import PortableText from 'react-portable-text';

interface Props {
  post: Post;
}
function SignlePost({ post }: Props) {
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
    </main>
  );
}

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
    include: { user: true },
  }); // your fetch function here
  const post = JSON.parse(JSON.stringify(data));
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
