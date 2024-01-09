// 'use client';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Providers } from './providers'
import { Suspense } from 'react';
import Skeleton from './loading';
import { withAuth } from '@/components/auth/requireAuth';

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

// const isLoggedIn = true;

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <div>
            <Suspense fallback={<Skeleton />}>
              {children}
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  )
}

// export default withAuth(RootLayout);
export default RootLayout;
