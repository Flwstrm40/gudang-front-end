'use client';

import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import useSWR, {mutate} from 'swr';
import Link from 'next/link';
import { Spinner } from '@material-tailwind/react';
import LineChartDashboard from '../chart/LineChartDashboard';

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

  const { data: user, error } = useSWR(id ? `${process.env.API}/user/${id}` : null, fetcher);

  const {data: totalOrder} = useSWR(`${process.env.API}/orders/total`, async (url) => {
    const response = await axios.get(url);
    return response.data[0];
  });

  const {data: totalTransfer} = useSWR(`${process.env.API}/transfers/total`, async (url) => {
    const response = await axios.get(url);
    return response.data[0];
  });

  const {data: totalProduk} = useSWR(`${process.env.API}/products/total`, async (url) => {
    const response = await axios.get(url);
    return response.data[0];
  });

   useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 
 
  // useEffect(() => {
  //   if (user) {
  //     setName(user.displayName);
  //     setUserName(user.username);
  //   }
  // }, [user, router, cookies.token]);
 
 
 
  //  console.log('Username:', name);

  return (
    <div className="text-black">
     <div className="flex items-center text-xl mb-10 justify-between">
        <div>
          {greeting},
          <span className="font-bold ml-2">
            {/* if name null, display username */}
            {user?.displayName ? user?.displayName : user?.username}
          </span>
          <span>
            !
          </span>
        </div>
        <div className="ml-4 text-gray-500 text-lg">
          {currentTime}
        </div>
      </div>
      
      <div className="w-full">
        {/* Chart */}
        <div className='mb-10'>
          <LineChartDashboard />
        </div>

        <div className='flex justify-between text-base xl:flex-col gap-3 mb-10 w-full'>
          {/* Order Box */}
          <div className='mx-auto'>
            <Link href='/order'>
              <div className='flex flex-col items-center p-6 rounded-md border-2 text-blue-800 w-[250px] cursor-pointer bg-blue-100 hover:bg-blue-200 hover:text-blue-900 hover:border-blue-600 border-blue-400 ease-in duration-100'>
                <div className='font-semibold text-4xl  '>
                {totalOrder ? totalOrder.total_orders : <Spinner color="blue"/>}
                </div>
                <div className=' font-semibold'>
                  Pesanan
                </div>
              </div>
            </Link>
          </div>
          {/* Transfer stock box */}
          <div className='mx-auto'>
            <Link href='/stockTransfer'>
              <div className='flex flex-col items-center p-6 rounded-md text-green-800 border-2 w-[250px] cursor-pointer bg-green-100 hover:text-green-900 border-green-400 hover:border-green-600 hover:bg-green-200 ease-in duration-100'>
                <div className='font-semibold text-4xl'>
                {totalTransfer ? totalTransfer.total_transfer : <Spinner color="green"/>}
                </div>
                <div className=' font-semibold'>
                  Transfer Stok
                </div>
              </div>
            </Link>
          </div>
          {/* Product box */}
          <div className='mx-auto'>
            <Link href='/inventory'>
              <div className='flex flex-col items-center p-6 text-purple-800 rounded-md border-2 w-[250px] cursor-pointer bg-purple-100 hover:text-purple-900 border-purple-400 hover:border-purple-600 hover:bg-purple-200 ease-in duration-100'>
                <div className='font-semibold text-4xl'>
                {totalProduk ? totalProduk.total_product : <Spinner color="purple"/>}
                </div>
                <div className=' font-semibold'>
                  Produk
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* <Image
          src="/Front-Offo.jpg"
          alt="Picture of Offo Living Office"
          width={500}
          height={500}
          className="rounded-lg w-auto mx-auto"
          priority={true}
        /> */}



        {/* <div>
          <div className='w-full p-6 rounded-md border-2 bg-blue-gray-50 cursor-pointer hover:bg-blue-100 hover:text-blue-900 hover:border-blue-600 text-base'>
            <div className='text-xl font-semibold text-center'>
            Informasi
            </div>
          </div>
        </div> */}
        
      </div>
    </div> 
  );
}

export default DashboardCard;
