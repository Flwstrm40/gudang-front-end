'use client';

// const dotenv = require('dotenv');
// dotenv.config({ path: './.env' });


import { useState, useEffect } from 'react';
import axios from 'axios';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { usePathname } from 'next/navigation';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
import { useRouter } from 'next/navigation'
import { TooltipIcon } from "../tooltip/Tooltip";
import Image from 'next/image';
import { Toaster, toast } from 'sonner'
import { Spinner } from '@material-tailwind/react';
import { set } from 'date-fns';
   
  export default function LoginForm() {
        const router = useRouter()
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        const pathname = usePathname();
        // console.log("pathname", pathname)
        
        // Mengakses cookies
        const cookies = parseCookies();
        const token = cookies.token;
        // console.log("token", token)
        
        useEffect(() => {
          // // Destroy the cookies
          // destroyCookie(null, 'token', { path: '/' });
          // destroyCookie(null, 'username', { path: '/' });
          // destroyCookie(null, 'role', { path: '/' });
          // destroyCookie(null, 'id', { path: '/' });

          // Add event listener ketika user menekan tombol Enter
          const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
              // If Enter key is pressed, call the handleLogin function
              handleLogin(e);
            }
          };
          document.addEventListener('keydown', handleKeyPress);
          return () => {
            document.removeEventListener('keydown', handleKeyPress);
          };
        }, [router, username, password]);

        const handleLogin = async (e) => {
          e.preventDefault();
          // console.log('Login button clicked');
          // console.log('Username:', username);
          // console.log('Password:', password);
          // console.log(process.env.PORT)
          setIsLoading(true);
          try {
            const response = await axios.post( `${process.env.API}/auth/login` , {
              username,
              password,
            });
      
            if (response.status === 200) {
              // Autentikasi berhasil, navigasi ke halaman dashboard 
              handleSuccessfulLogin(response.data);
              router.push('/dashboard');
            } else {
              // Autentikasi gagal
              setIsLoading(false);
              console.error('Authentication failed');
              console.error('Error:', response.data.message);
              toast.error('Username/Password salah');
            }
          } catch (error) {
            setIsLoading(false);
            console.error('Error during authentication:', error.message);
            toast.error('Username/Password salah');
          }
        };
    
        const handleSuccessfulLogin = (data) => {
          // console.log('Authentication successful');
          // console.log('Token:', data.token);
          // console.log('Username:', data.username);
          // console.log('Role:', data.role);
          // console.log('Id:', data.userId);
      
          // Set cookie di sisi server dan klien dengan path ke '/dashboard'
          setCookie(null, 'token', data.token, {
            maxAge: 3600, // Expire in 1 hour
            path: '/', // Set path ke '/'
          });
      
          setCookie(null, 'username', data.username, {
            maxAge: 3600,
            path: '/',
          });
      
          setCookie(null, 'role', data.role, {
            maxAge: 3600,
            path: '/',
          });

          setCookie(null, 'id', data.userId, {
            maxAge: 3600,
            path: '/',
          });
        };

    return (
      <>
        <Toaster position="top-right" closeButton={true} richColors={true}/>
        <Card className="w-96">
          {/* <CardHeader
            variant="gradient"
            color="white"
            className="mb-4 grid h-28 place-items-center border-2 border-gray-200"
          >
            <div>
              Sistem Gudang
            </div>
           
          </CardHeader> */}
          <CardBody className="flex flex-col gap-4">
            <Image
                src="/Logo-Offo.png"
                alt="Logo Offo"
                width={1000}
                height={1000}
                priority={true}
                className="w-auto h-auto mb-16"
              />
            <Input label="Username" size="lg" color="blue" onChange={(e) => setUsername(e.target.value)} value={username}/>
            <Input type="password" label="Password" size="lg" color="blue" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <div className="flex justify-center text-sm">
              <div className="mr-2">
                Lupa Username/Password? 
              </div>
              <TooltipIcon message="Jika Username/Password lupa, silakan lapor ke Kepala Gudang" />
            </div>
          </CardBody>
          <CardFooter className="pt-0 mt-16">
            <Button variant="filled" color="blue" fullWidth onClick={handleLogin} disabled={isLoading ? true : false}>
              {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : 'Login'}
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  }
  {/* <div className="-ml-2.5">
    <Checkbox label="Remember Me" />
  </div> */}