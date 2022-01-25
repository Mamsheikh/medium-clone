import React from 'react';
import { IBlog, InputChange } from '../../utils/types';

interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };
  const handleImageUpload = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };
  return (
    <div>
      <form>
        <div className='px-4 py-2'>
          <label htmlFor=''>Title</label>
          <input
            placeholder='Title'
            className='block w-full rounded-sm  focus:outline-none ring-0'
            type='text'
            value={blog.title}
            name='title'
            onChange={handleChangeInput}
          />
          <small className='text-gray-300'>{blog.title.length}/50</small>
        </div>
        <div className='px-4 py-2'>
          <label htmlFor=''>Category</label>
          <input
            placeholder='Category'
            className='block w-full rounded-sm  focus:outline-none ring-0'
            type='text'
            name='category'
            value={blog.category}
            onChange={handleChangeInput}
          />
          <small className='text-gray-300'>{blog.category.length}/50</small>
        </div>
        <div className='px-4 py-2'>
          <input
            type='file'
            onChange={handleImageUpload}
            className='block  text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100'
            accept='image/*'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
