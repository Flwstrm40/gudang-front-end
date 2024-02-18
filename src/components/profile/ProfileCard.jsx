'use client';
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState, useRef } from 'react';
import { Button } from "@material-tailwind/react";
import EditModalAkun from "./EditModalAkun";
import EditModalName from "./EditModalName";
import useSWR, {mutate} from "swr";
import { Avatar } from "@material-tailwind/react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Toaster, toast } from "sonner";
import Loading from "../loading/Loading";
import ModalDeleteProfPic from "./ModalDeleteProfPic";

const ProfileCard = () => {
  const cookies = parseCookies();
  const fileInputRef = useRef(null);
  const token = cookies.token;
  const id = cookies.id;
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);

  // Define the fetcher function to fetch user data
  const fetcher = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data[0];
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw error;
    }
  };

   // Use SWR to fetch user data
   const { data: userData, error, mutate } = useSWR(`${process.env.API}/user/${id}`, fetcher);

  if (error) {
    return <div>Error fetching user data</div>;
  }

  if (!userData) {
    return <Loading />;
  }

  const handleOpen = () => {
    setOpen(!open);
  }

  // function to make edit icon visible on hover 

  // {console.log(userData.profilePhoto)}

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);

    if(!file) return;

    // Validate file type
    if (!file.type.includes('image')) {
      toast.error('File yang diunggah harus berupa gambar');
      return;
    }
    // Validate file size
    if (file.size > 1024 * 1024 * 1) {
      toast.error('Ukuran file tidak boleh lebih dari 1 MB');
      return;
    }
    if (file) {
      setSelectedFile(file);
      if(!open){
        handleOpen();
      }
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    handleOpen();
  }
  
  // console.log(selectedFile);
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Tidak ada file yang dipilih');
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', selectedFile);

    // console.log(formData);

    try {
      await axios.post(`${process.env.API}/user/${id}/upload-profile-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Jika berhasil, kita perlu memuat ulang data pengguna
      mutate();
      handleOpen();
      toast.success('Berhasil mengunggah foto profil');
    } catch (error) {
      console.error('Error updating profile photo:', error.message);
      handleOpen();
      toast.error('Gagal mengunggah foto profil');
    }
  };

  return (
    <div className="text-black">
      <div className="flex justify-between">
        <div className="text-xl font-bold">
          Profil
        </div>
        <div className="text-lg text-blue-gray-500">
          {userData.role === 'admin' ? 'Admin' : 'Kepala Gudang'}
        </div>
      </div>

      {/* Data Diri */}
      <div className="mt-10 flex gap-10 md:flex-col md:items-center">
        {/* <div className="overflow-hidden flex items-center rounded-[50%] h-50 w-50">
          <Image
            // src="/RanC.png"
            src={userData.profilePhoto ? `${process.env.API}/${userData.profilePhoto}` : "/RanC.png"}
            // src="/ProfPicNone.png"
            alt="Foto Profil"
            width={100}
            height={100}
            priority={true}
            className="hover:opacity-75 transition-opacity duration-200 h-auto w-auto object-cover"
          />
        </div> */}
        {/* Avatar Profil */}
        <div className="flex flex-col items-center">
          <div className="relative overflow-hidden flex items-center rounded-[50%] h-50 w-50 hover:opacity-70">
            <Avatar 
              src={userData.profilePhoto ? `${process.env.API}/${userData.profilePhoto}` : "/ProfPicNone.png"} 
              size="xxl"  
              alt="Foto Profil"
              withBorder={true}
              className="hover:opacity-75 transition-opacity duration-200 p-0.5 cursor-pointer"
            />
            {/* Menampilkan ikon hanya saat avatar dihover */}
            {Avatar && (
            <label 
              htmlFor="fileInput" 
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer ease-in duration-100"
            >
              <PencilSquareIcon className="h-8 w-8 text-white bg-blue-gray-500 rounded-md p-2" />
            </label>
            )}
           </div>
            {/* Input file yang disembunyikan */}
            <input 
                  key={Math.random()}
                  id="fileInput" 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
            <div>
              {selectedFile && open && (
                <>
                  <div className="flex gap-1 items-center mt-5 justify-center">
                    <div className="text-blue-gray-800 text-xs ">{selectedFile.name.substr(0, 11)}...</div>
                    <div>
                      <XMarkIcon onClick={handleCancel} className="h-5 w-5 text-red-600 cursor-pointer hover:bg-red-50 hover:rounded-md ease-in duration-100" />
                    </div>
                  </div>
                  <div className="text-xs text-blue-gray-600 text-center">
                    {Math.round(selectedFile.size / 1024)} KB
                  </div>
                </>
              )}
            </div>
            <div>
              {open && (
                <Button onClick={handleUpload} className="mt-2" variant="text" color="blue" size="md">
                  Unggah
                </Button>
              )}
            </div>

        </div>

        {/* DisplayName and Username */}
        <div className="flex flex-col ">
          <div className="flex items-center">
            <div className="text-base font-semibold">
              Display Name
            </div>
            <div className="ml-5">
              <EditModalName name={userData.displayName} userId={id} mutate={mutate}/>
            </div>
          </div>
          <div className="text-base mb-5 text-blue-gray-500">
            {userData.displayName? userData.displayName : '-'}
          </div>
          <div className="text-base font-semibold">
            Username
          </div>
          <div className="text-base text-blue-gray-500">
            {userData.username}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-10 gap-2 sm:flex-col sm:items-end">
        <div className={userData.profilePhoto ? "" : "hidden"}>
          <ModalDeleteProfPic mutate={mutate} id_user={id}/>
        </div>
        <div>
          <EditModalAkun uname={userData.username} userId={id} mutate={mutate}/>
        </div>
        {/* <Button>
          Ganti Username/Password
        </Button> */}
      </div>
    </div>
  );
  }
  
export default ProfileCard;