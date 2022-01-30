import toast from 'react-hot-toast';
import { IBlog } from './types';

interface FieldError {
  path?: string;
  error?: string;
}
//Validate Blog
export const validateCreateBlog = ({
  title,
  content,
  description,
  thumbnail,
  category,
}: IBlog) => {
  const err: string[] = [];

  if (title.trim().length < 10) {
    err.push('Title must have atleast 10 characters.');
    // toast.error('Title must have atleast 10  charcters.')
  } else if (title.trim().length > 50) {
    err.push('Title must not be more than 50 characters.');
  }
  //     err.push('Title must not be more than 50 characters.');
  //   }

  if (content.trim().length < 2000) {
    err.push('Content must have atleast 2000  charcters.');
  }

  if (description.trim().length < 50) {
    err.push('Description must have atleast 10  charcters.');
  } else if (description.trim().length > 200) {
    err.push('Description must not be more than 200 characters.');
  }
  if (!thumbnail) {
    err.push('Thumbnail cannot be left blank.');
  }
  if (!category) {
    err.push('Category cannot be left blank.');
  }
  return {
    errMsg: err,
    errLenth: err.length,
  };
};
