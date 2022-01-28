import React, {
  useEffect,
  useRef,
  useCallback,
  Component,
  useMemo,
  useState,
} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { checkImage, imageUpload } from '../../utils/uploadImage';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);

interface IProps {
  setBody: (value: string) => void;
  body: string;
}
interface Props {
  public_id: string;
  url: string;
}
const Quill: React.FC<IProps> = ({ setBody, body }) => {
  const [photo, setPhoto] = useState<Props>();
  const notify = () => toast('Here is your toast.');
  const editorRef = useRef();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
      },
    }),
    []
  );

  const handleChangeImage = useCallback(() => {
    console.log('change image');
  }, []);
  useEffect(() => {
    const quill = editorRef.current.getEditor();
    if (!quill) return;

    let toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', handleChangeImage);
  }, [handleChangeImage]);

  const handleChangeInput = (e: any) => {
    console.log(e);
  };

  return (
    <div>
      <Toaster />
      <ReactQuill
        theme='snow'
        modules={modules}
        placeholder='Write somethings...'
        onChange={handleChangeInput}
        value={body}
        ref={editorRef}
        // forwardedRef={editorRef}
      />
    </div>
  );
};

let container = [
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
];

export default Quill;
