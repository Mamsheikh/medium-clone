import Head from 'next/head';
import Banner from '../components/Banner';
import Quill from '../components/editor/ReactQuil';

export default function Home() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* TODO: Add banner component */}
      <Banner />
      {/* <Quill /> */}
    </div>
  );
}
