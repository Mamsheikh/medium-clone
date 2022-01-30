import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IBlog, InputChange } from '../../utils/types';
import { imageUpload } from '../../utils/uploadImage';

interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const [url, setUrl] = useState();
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };
  async function upload(file) {
    const photo = await imageUpload(file);
    return photo.url;
  }
  const handleImageUpload = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      toast.promise(
        upload(file).then((url) => setBlog({ ...blog, thumbnail: url })),
        {
          loading: 'uploading🤞...',
          success: 'Image uploaded successfully🎉',
          error: 'Something went wrong!😥',
        }
      );
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
          <label htmlFor=''>Description</label>
          <input
            placeholder='Description'
            className='block w-full rounded-sm  focus:outline-none ring-0'
            type='text'
            value={blog.description}
            name='description'
            onChange={handleChangeInput}
          />
          <small className='text-gray-300'>{blog.description.length}/200</small>
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
