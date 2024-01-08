// components/auth/RequireAuth.js
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

export function withAuth({Component}) {
  return (props) => {
    // Get the router instance
    const router = useRouter();

    // Check for the 'token' cookie
    const cookies = parseCookies();
    const token = cookies.token;

    // If there's no token, redirect to the login page
    if (!token) {
      router.push('/');
      return null; // Or show a loading spinner, error message, etc.
    }

    // If there is a token, render the original component with its props
    return <Component {...props} />;
  };
}
