// components/auth/RequireAuth.js
'use client';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

export function withAuth(Component){
  return (props) => {
    // Get the router instance
    const router = useRouter();
    const pathname = usePathname();

    // Check for the 'token' cookie
    const cookies = parseCookies();
    const token = cookies.token;
    const role = cookies.role;
    const currentPath = pathname;

    // console.log("role", role)
    // console.log("pathname", pathname)
    // console.log("currentPath", currentPath)

    // If there's no token, redirect to the login page
    if (!token) {
      router.push('/');
      return null; // Or show a loading spinner, error message, etc.
    }

    // If there is a token, render the original component with its props
    if (role !== 'kepala gudang' && pathname === '/accountManagement') {
      // If the user is an admin and trying to access /accountManagement, redirect to another page
      // only reload if the user is an admin and trying to access /accountManagement
      router.push('/dashboard');
      return null;
    }

    // if token is exist and want to access login page, redirect to dashboard
    if (token && pathname === '/') {
      router.push('/dashboard');
      return null;
    }

    // If there is a token, render the original component with its props
    return <Component {...props} />;
  };
}

