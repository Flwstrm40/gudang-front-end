'use client';
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { useEffect } from 'react';
import { Spinner } from "@material-tailwind/react";
import { set } from "date-fns";
import { usePathname } from "next/navigation";

 
export default function EditModalAkun({uname, userId, mutate, onClose}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(pathname === '/profile' ? false : true);
  const [username, setUsername] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [step1, setStep1] = React.useState(true);
  const [step2, setStep2] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setUsername(uname);
  }, [uname]);
 
  const handleOpen = () => {
    setOpen(!open);
    {onClose ? onClose() : null}
  }

  const handleBack = () => {
    setUsername(uname);
    setPassword('');
    setNewPassword('');
    handleOpen();
    setStep1(true);
    setStep2(false);
  }

  // cek username apakah sudah digunakan oleh pengguna lain
  const checkUsernameAvailability = async () => {
    try {
      const response = await axios.post(`${process.env.API}/auth/cekUsername`, {
        username: username,
        userId: userId,
      });

      if (!response.data.isUsernameAvailable) {
        toast.error('Username sudah digunakan oleh pengguna lain');
      }
      console.log("response", response.data.isUsernameAvailable)
      return response.data.isUsernameAvailable;
    } catch (error) {
      console.error('Error checking username availability:', error.message);
      toast.error('Error checking username availability');
    }
  };
 
  // cek username dan password apakah sudah sesuai
  const handleContinue = async () => {

    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.API}/auth/cekAkun`, {
        username: username,
        password: password,
      });
      if (response.data) {
        setStep1(false);
        setStep2(true);
        setIsLoading(false);
      } else {
        toast.error('Password lama salah');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      toast.error('Password lama salah');
      setIsLoading(false);
    }
  }

  const handleSave = async () => {

    setIsLoading(true);
    try {
      if (!newPassword || !username) {
        toast.error('Username atau password baru tidak boleh kosong');
        return;
      }

      // Check if the username is the same as the current username
      const isSameUsername = username === uname;
      // Check username availability before saving

      if (!isSameUsername) {
        const isUsernameAvailable = await checkUsernameAvailability();
        if (!isUsernameAvailable) {
          return;
        }
      }

      // password baru harus lebih dari 6 karakter
      if (newPassword.length < 5) {
        toast.error('Password baru harus terdiri dari 5/lebih karakter');
        return;
      }
  
      const response = await axios.put(`${process.env.API}/user/${userId}`, {
        username: username,
        password: newPassword,
      });
  
      if (response.data) {
        toast.success('Username dan Password berhasil diubah');
        mutate();
        handleOpen();
        setStep1(true);
        setStep2(false);
        setPassword('');
        setNewPassword('');
        setIsLoading(false);
      } else {
        toast.error('Username/Password gagal diubah');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      toast.error('Username sudah digunakan oleh user lain');
      setIsLoading(false);
    }
  };
  

  return (
    <div className="overflow-y-auto">
      { pathname === '/profile' &&
        <Button onClick={handleOpen} size="md" color="blue">
          {/* <PencilSquareIcon className="h-5 w-5" /> */}
          Edit Akun
        </Button>
     }
    <Dialog open={open} size="lg" handler={handleOpen} className="overflow-auto max-h-[90%]">
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <div className="mb-1" variant="h4">
              Ganti Username/Password
            </div>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 cursor-pointer "
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {step1 &&
        <div>
          <DialogBody>
            <div className="mb-7 -mt-7 " color="gray" variant="lead">
              Tulis password lama anda untuk mengganti username/password.
            </div>
            <div className="grid gap-6">
              <div className="-mb-1" color="blue-gray" variant="h6">
                Username
              </div>
              <Input label="Username" value={username} disabled/>
              <div className="-mb-1" color="blue-gray" variant="h6">
                Password
              </div>
              <Input type="password" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="gray" onClick={handleBack}>
              Batalkan
            </Button>
            <Button variant="filled" color="blue" onClick={handleContinue}>
              {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Lanjutkan"}
            </Button>
          </DialogFooter>
        </div>}

        {/* If old password is true */}
        {step2 &&
        <div>
          <DialogBody>
            <div className="mb-7 -mt-7 " color="gray" variant="lead">
              Tulis username dan password baru anda.
            </div>
            <div className="grid gap-6">
              
              <div className="-mb-1" color="blue-gray" variant="h6">
                Username
              </div>
              <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <div className="-mb-1" color="blue-gray" variant="h6">
                Password
              </div>
              <Input type="password" label="Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="gray" onClick={handleBack}>
              Batalkan
            </Button>
            <Button variant="filled" color="blue" onClick={handleSave}>
              {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Simpan"}
            </Button>
          </DialogFooter>
        </div>}
      </Dialog>
    </div>
  );
}