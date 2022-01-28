import { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { checkImage, imageUpload } from '../../utils/uploadImage';
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);
interface IProps {
  setBody: (value: string) => void;
  body: string;
}
const Editor: React.FC<IProps> = ({ body, setBody }) => {
  const [photo, setPhoto] = useState(null);
  const imageHandler = (a) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];

      // file type is only image.
      const check = checkImage(file);
      if (check) {
        return toast.error(check);
      } else {
        // if (/^image\//.test(file.type)) {
        saveToServer(file);
      }
      // } else {
      // toast.error('You could only upload images.');
      // }
    };
  };
  async function upload(file) {
    const photo = await imageUpload(file);
    return photo.url;
  }
  async function saveToServer(file) {
    toast.promise(
      upload(file).then((photo) => insertToEditor(photo)),
      {
        loading: 'Loading...',
        success: 'Image uploaded successfully',
        error: 'Something went wrong!',
      }
    );
    // const photo = await imageUpload(file);
    // if (photo) {
    //   // this is callback data: url
    //   const url = photo;
    //   insertToEditor(url);
    // }
  }
  // xhr.send(fd);

  function insertToEditor(url) {
    editorRef.current.getEditor().insertEmbed(null, 'image', url);
  }

  const editorRef = useRef(null);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction
          [{ align: [] }],

          ['clean', 'link', 'image', 'video'],
        ],

        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <div>
      <Toaster />
      <ReactQuill
        modules={modules}
        onChange={(e) => setBody(e)}
        forwardedRef={editorRef}
      />
    </div>
  );
};

export default Editor;
