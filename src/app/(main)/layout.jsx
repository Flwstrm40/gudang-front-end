'use client';
import { Poppins } from 'next/font/google';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Providers } from '@/app/providers';
import { withAuth } from '@/components/auth/requireAuth';

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

// const isLoggedIn = true;
const word = 'hello world';

const RootLayout = ({ children }) => {
  return (
          <div className='flex'>
            <Sidebar/>
            {/* hallo */}
            <div className='bg-gray-200 w-full'>
              {children}
            </div>
          </div>

  )
}

// export default withAuth(RootLayout);
// export default RootLayout
export default withAuth(RootLayout);
