'use client';
import { Poppins } from 'next/font/google';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Providers } from '@/app/providers';
import { withAuth } from '@/components/auth/requireAuth';
import { Card } from '@material-tailwind/react';

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
            <Card className="w-[95%] h-auto m-auto mt-5">
              <div className="mt-10 ml-7 mr-7 mb-10 text-xl">
                {children}
              </div>    
            </Card>
            </div>
          </div>

  )
}

// export default withAuth(RootLayout);
// export default RootLayout
export default withAuth(RootLayout);
