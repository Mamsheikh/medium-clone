import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// const ReactQuill = dynamic(
//   async () => {
//     const { default: RQ } = await import('react-quill');
//     return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
//   },
//   {
//     ssr: false,
//   }
// );

interface IProps {
  body: string;
  setBody: (value: string) => void;
}

const LiteQuill: React.FC<IProps> = ({ body, setBody }) => {
  const modules = { toolbar: { container } };

  return (
    <div>
      <ReactQuill
        //theme='snow'
        modules={modules}
        placeholder='Write somethings...'
        onChange={(e) => setBody(e)}
        value={body}
      />
    </div>
  );
};

let container = [
  [{ font: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block', 'link'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
];

export default LiteQuill;
