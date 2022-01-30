import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Header() {
  const { data: session, status } = useSession();
  return (
    <header className='flex items-center justify-between p-5 max-w-7xl mx-auto'>
      <div className='flex items-center space-x-5'>
        <Link href='/'>
          <img
            className='w-32  cursor-pointer object-contain xs:w-44'
            src='https://links.papareact.com/yvf'
            alt=''
          />
        </Link>
        <div className='hidden md:inline-flex items-center space-x-5'>
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className='text-white bg-green-600 px-4 py-1 rounded-full'>
            Follow
          </h3>
        </div>
      </div>
      <div className='flex items-center space-x-5 text-green-600'>
        {!session ? (
          <>
            <a onClick={() => signIn()} className='cursor-pointer'>
              Sign In
            </a>
            <h3 className='border px-4 py-2 rounded-full border-green-600 xs:px-2 xs:py-1'>
              Get Started
            </h3>
          </>
        ) : (
          <>
            <a onClick={() => signOut()} className='cursor-pointer'>
              Sign Out
            </a>
            {session && (
              <img
                src={session?.user?.image as string}
                className='h-10 w-10 rounded-full cursor-pointer'
              />
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
