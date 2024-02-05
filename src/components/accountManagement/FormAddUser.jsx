'use client';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Textarea,
  } from "@material-tailwind/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"; 
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { TooltipIcon } from "@/components/tooltip/Tooltip";
import { Spinner } from "@material-tailwind/react";
  
export default function FormAddUser() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [uname, setUname] = useState("");
    
    const handleBack = () => {
        router.push("/accountManagement");
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const role = "admin";
      const form = e.target;
  
      const formData = new FormData(form);
      const username = formData.get("username");
  
      if (!username) {
        toast.error("Harap isi kolom yang diperlukan.");
        return;
      }
      
      setIsLoading(true);
      try {

      // Check username availability before saving
        const isUsernameAvailable = await checkUsernameAvailability();
        if (!isUsernameAvailable) {
            setIsLoading(false);
          return;
        }

        // Send a POST request to the new endpoint
        const response = await axios.post(`${process.env.API}/user`, {
            username: username,
            role: role,
            password: "admin",
            displayName: "admin",
        });
  
        toast.success(
          response.data.message || "Berhasil membuat akun baru"
        );
        router.push("/accountManagement");
        setIsLoading(false);
      } catch (error) {
        toast.error(
            error.response.data.error || "Gagal membuat akun baru"
        );
        setIsLoading(false);
      }
    };
      
    // cek username apakah sudah digunakan oleh pengguna lain
  const checkUsernameAvailability = async () => {
    // console.log("username", uname)

    try {
      const response = await axios.post(`${process.env.API}/auth/cekUsernameAdd`, {
        username: uname
      });

      if (!response.data.isUsernameAvailable) {
        toast.error('Username sudah digunakan oleh pengguna lain');
      }
    //   console.log("response", response.data.isUsernameAvailable)
      return response.data.isUsernameAvailable;
    } catch (error) {
      console.error('Error checking username availability:', error.message);
      toast.error('Error checking username availability');
    }
  };
    

      return (
        <div className="text-sm text-black w-full">
          <Toaster position="top-right" closeButton={true} richColors={true} />
          <div className="flex justify-between items-center mb-14">
            <div className="flex justify-start gap-6">
                <Button variant="text" className="rounded-full" onClick={handleBack}>
                    <ArrowUturnLeftIcon className="h-5 w-5" />
                </Button>
              <div className="flex flex-col">
                <div className="font-semibold text-xl ">
                  Tambah User
                </div>
                <div color="gray" className="mt-1 font-normal">
                  Tambah pengguna baru untuk mengakses sistem
                </div>
              </div>
            </div>
          </div>
          <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
            <div className="mb-1 flex md:flex-col gap-6">
              <div className="flex-col w-full flex gap-6">
                <div className="-mb-3">
                  Username (*)
                </div>
                <Input
                  type="text"
                  size="md"
                  placeholder="Username"
                  className=" !border-t-blue-gray-200 focus:!border-gray-700 w-full"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                  name="username"
                />
              </div>
                        
              <div className="flex flex-col gap-6 w-full">
                <div className="-mb-3">
                  Role
                </div>
                <Input
                  type="text"
                  size="md"
                  placeholder="xx"
                  className=" !border-blue-gray-200 focus:!border-blue-700"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  disabled
                  value={"admin"}
                  name="role"
                />
              </div>
            </div>
        
            <div className="mt-7 text-xs text-red-800">
              (*) Wajib diisi
            </div>
            <div className="mt-2 text-xs text-red-800">
              (*) Password default adalah "admin"
            </div>
            <Button className="mt-3" fullWidth color="blue" type="submit">
              {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Buat Akun"}
            </Button>
          </form>
        </div>
      );
}