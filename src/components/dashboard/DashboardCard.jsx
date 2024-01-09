'use client';
import { Card } from "@material-tailwind/react";
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

   // Get the router instance
   const router = useRouter();
   const [username, setUsername] = useState('');
   const [user, setUser] = useState([]);
 
   // // Mengakses cookies
   const cookies = parseCookies();
   const id = cookies.id;
   // console.log("id", id)
 
   useEffect(() => {
     const fetchData = async () => {
       try {
         if (!cookies.token) {
           router.push('/');
         } else {
           const response = await axios.get(`http://localhost:5050/user/${id}`);
           setUser(response.data[0]);
           // console.log("user", response.data[0])
           
           setUsername(response.data[0].username);
         }
       } catch (error) {
         console.error('Error fetching user data:', error.message);
       }
     };
 
     fetchData(); 
   }, [cookies.token, id, router]);
 
 
 
   console.log('Username:', username);

  return ( 
    <div>
        {greeting}, {username}! 
    </div>
  );
}

export default DashboardCard;
