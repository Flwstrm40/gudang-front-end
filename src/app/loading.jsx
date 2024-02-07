'use client';
import Image from 'next/image';
 
export default function Loading() {
  return (
    <div className=" flex my-auto mx-auto items-center justify-center h-screen">
      <div className='flex flex-col items-center justify-center'>
        <Image src="/Loading.gif" alt="loading" width={300} height={300} priority={true} className="my-auto overflow-hidden"/>
        <div className='mt-5 font-semibold text-blue-700 text-xl'>
          Sedang Memuat...
        </div>
      </div>
  </div>
  );
}
