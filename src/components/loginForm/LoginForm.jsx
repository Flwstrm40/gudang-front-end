'use client';

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
   
  export default function LoginForm() {
        // Menggunakan useNavigate untuk mendapatkan objek navigate dari router
        const router = useRouter()

    const handleLogin = () => {
      // Logika autentikasi dan setelah berhasil, navigasi ke "/dashboard"
      // Misalnya, Anda dapat memeriksa kredensial pengguna di sini

      // Contoh autentikasi sederhana
      const isAuthenticated = true;

      if (isAuthenticated) {
        // Navigasi ke "/dashboard" setelah login berhasil
        router.push('/dashboard')
        //
      }
    };

    return (
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sistem Gudang
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Username" size="lg" />
          <Input type="password" label="Password" size="lg" />
          <div className="flex justify-center text-sm">
            <div className="mr-2">
              Lupa Username/Password? 
            </div>
            <TooltipIcon message="Jika Username/Password lupa, silakan lapor ke Manajer" />
          </div>
          {/* <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div> */}
        </CardBody>
        <CardFooter className="pt-0 mt-16">
          <Button variant="gradient" color="blue" fullWidth onClick={handleLogin}>
            Login
          </Button>
          {/* <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="green"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography> */}
        </CardFooter>
      </Card>
    );
  }