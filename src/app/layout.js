'use client';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Providers } from './providers'
import { Suspense } from 'react';
import Loading from './loading';
import { withAuth } from '@/components/auth/requireAuth';

const poppins = Poppins({
  weight: [ '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})


// const isLoggedIn = true;

// export const metadata = {
//   title: {
//     default: 'Login Page',
//     template: '%s | Offo Living',
//   },
//   description: 'Login Page',
// }

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <div>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default withAuth(RootLayout);
// export default RootLayout;
