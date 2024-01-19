'use client';
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import EditModalAkun from "./EditModalAkun";
import EditModalName from "./EditModalName";
import useSWR, {mutate} from "swr";

const ProfileCard = () => {
  const cookies = parseCookies();
  const token = cookies.token;
  const id = cookies.id;

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
   const { data: userData, error, mutate } = useSWR(`http://localhost:5050/user/${id}`, fetcher);

  if (error) {
    return <div>Error fetching user data</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

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
        <div>
          <Image
            src="/RanC.png"
            // src="/ProfPicNone.png"
            alt="Foto Profil"
            width={100}
            height={100}
            priority={true}
            className="w-auto h-auto rounded-full"
          />
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
      <div className="flex justify-end mt-10">
        <EditModalAkun uname={userData.username} userId={id} mutate={mutate}/>
        {/* <Button>
          Ganti Username/Password
        </Button> */}
      </div>
    </div>
  );
  }
  
export default ProfileCard;