'use client';

import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import useSWR from 'swr';

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 3 && currentHour < 10) {
    return 'Selamat Pagi';
  } else if (currentHour >= 10 && currentHour < 15) {
    return 'Selamat Siang';
  } else if (currentHour >= 15 && currentHour < 18) {
    return 'Selamat Sore';
  } else {
    return 'Selamat Malam';
  }
};


const DashboardCard = () => {
  const greeting = getGreeting();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

   // Get the router instance
   const router = useRouter();
   const [name, setName] = useState('');
   const [username, setUserName] = useState('');
 
   // // Mengakses cookies
   const cookies = parseCookies();
   const id = cookies.id;
   // console.log("id", id)

   const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data[0];
  };

  const { data: user, error } = useSWR(id ? `http://localhost:5050/user/${id}` : null, fetcher);

   useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 
 
  useEffect(() => {
    if (!cookies.token) {
      router.push('/');
    } else if (user) {
      setName(user.displayName);
      setUserName(user.username);
    }
  }, [user, router, cookies.token]);
 
 
 
  //  console.log('Username:', name);

  return (
    <div className="text-black">
     <div className="flex items-center text-2xl justify-between">
        <div>
          {greeting},
          <span className="font-bold ml-2">
            {/* if name null, display username */}
            {name ? name : username}
          </span>
          <span>
            !
          </span>
        </div>
        <div className="ml-4 text-gray-500 text-xl">
          {currentTime}
        </div>
      </div>
      <div className="mt-10">
        <Image
          src="/Front-Offo.jpg"
          alt="Picture of Offo Living Office"
          width={1500}
          height={1500}
          className="rounded-lg"
          priority={true}
        />
      </div>
    </div> 
  );
}

export default DashboardCard;
