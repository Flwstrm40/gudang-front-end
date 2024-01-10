'use client';
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import EditModalAkun from "./EditModalAkun";
import EditModalName from "./EditModalName";

const ProfileCard = () => {
  const cookies = parseCookies();
  const token = cookies.token;
  const id = cookies.id;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/user/${id}`);

      setUserData(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token, userData]);

  // console.log("userData", userData)

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  return (
    <div className="text-black">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          Profil
        </div>
        <div className="text-xl text-blue-gray-500">
          {userData.role === 'admin' ? 'Admin' : 'Kepala Gudang'}
        </div>
      </div>

      {/* Data Diri */}
      <div className="mt-10 flex gap-10 md:flex-col md:items-center">
        <div>
          <Image
            src="/RanC.png"
            alt="Foto Profil"
            width={100}
            height={100}
            priority={true}
            className="w-auto h-auto rounded-full"
          />
        </div>
        {/* DisplayName and Username */}
        <div className="flex flex-col ">
          <div className="flex">
            <div className="text-lg font-semibold">
              Display Name
            </div>
            <div className="ml-5">
              <EditModalName name={userData.displayName} userId={id}/>
            </div>
          </div>
          <div className="text-lg mb-5 text-blue-gray-500">
            {userData.displayName? userData.displayName : '-'}
          </div>
          <div className="text-lg font-semibold">
            Username
          </div>
          <div className="text-lg text-blue-gray-500">
            {userData.username}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <EditModalAkun uname={userData.username} userId={id}/>
        {/* <Button>
          Ganti Username/Password
        </Button> */}
      </div>
    </div>
  );
  }
  
export default ProfileCard;