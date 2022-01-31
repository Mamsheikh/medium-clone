import prisma from '../lib/prisma';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner';
import Quill from '../components/editor/ReactQuil';
import Link from 'next/link';
import { Post } from '../typings';
interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* TODO: Add banner component */}
      <Banner />
      {/* <Quill /> */}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <div className='border rounded-lg overflow-hidden group cursor-pointer'>
              <img
                src={post.thumbnail}
                alt='Thumbnail'
                className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
              />
              <div className='flex justify-between bg-white p-4'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>
                    Description goes here by {post.user.name}
                  </p>
                </div>
                <img
                  src={post.user.image}
                  alt='user avatar'
                  className='h-12 w-12 rounded-full'
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await prisma.post.findMany({
    include: { user: true, comments: true },
  });
  const posts = JSON.parse(JSON.stringify(data));

  return {
    props: {
      posts,
    },
  };
};
