// components/auth/RequireAuth.js
'use client';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { useEffect } from 'react';

export function withAuth(Component){
  return (props) => {
    // Get the router instance
    const router = useRouter();
    const pathname = usePathname();

    // Check for the 'token' cookie
    const cookies = parseCookies();
    const token = cookies.token;
    const role = cookies.role;
    const isAuth = !!token;
    // console.log("isAuth", isAuth)

    // console.log("role", role)
    // console.log("pathname", pathname)
    // console.log("currentPath", currentPath)

  
    // If there's no token, redirect to the login page
    useEffect(() => {
      // if token is exist and want to access login page, redirect to dashboard
      if (isAuth && pathname === '/') {
        router.push('/dashboard');
      }
      // Check for conditions
      if (!isAuth && pathname !== '/') {
        // Redirect to the homepage
        router.push('/');
        // return null;
      }

      // If there is a token, render the original component with its props
      if (role !== 'kepala gudang' && pathname === '/accountManagement') {
        // If the user is an admin and trying to access /accountManagement, redirect to another page
        // only reload if the user is an admin and trying to access /accountManagement
        router.push('/dashboard');
      }

      if (role !== 'kepala gudang' && pathname === '/inventory/addProduct') {
        // If the user is an admin and trying to access /accountManagement, redirect to another page
        // only reload if the user is an admin and trying to access /accountManagement
        router.push('/dashboard');
      }
      
    }, [isAuth, pathname]);

    // If there is a token, render the original component with its props
    return <Component {...props} />;
  };
}

