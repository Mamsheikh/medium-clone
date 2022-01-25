import Link from 'next/link';
import React from 'react';
import { IBlog } from '../../utils/types';

interface IProps {
  blog: IBlog;
}

const Preview: React.FC<IProps> = ({ blog }) => {
  return (
    <div>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        {blog.thumbnail && (
          <>
            {typeof blog.thumbnail === 'string' ? (
              <Link href={`/blog/${blog.id}`}>
                <img
                  className='w-full  object-cover'
                  src={blog.thumbnail}
                  alt='Mountain'
                />
              </Link>
            ) : (
              <img
                className='w-full'
                src={URL.createObjectURL(blog.thumbnail)}
                alt=''
              />
            )}
          </>
        )}

        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{blog.title}</div>
          <p className='text-gray-700 text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, Nonea! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        {/* <p className='px-4'>{new Date(blog.createdAt).toLocaleString()}</p> */}
        <div className='px-6 pt-4 pb-2'>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
            #{blog.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preview;
