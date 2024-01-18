import LoginForm from '@/components/loginForm/LoginForm'

export const metadata = {
  title: 'Login Page',
  description: 'Log page',
}


const Home = () => {
  return ( 
      <div className='flex items-center justify-center min-h-screen mx-auto bg-gray-200'>
        <LoginForm />
      </div>
  );
}

export default Home;