'use client';
import Image from 'next/image';
 
export default function Loading() {
  return (
    <div className=" flex my-auto mx-auto items-center justify-center h-[90%]">
      <div className='flex flex-col items-center justify-center'>
        <Image src="/Loading-Run.gif" alt="loading" width={300} height={300} priority={true} className="my-auto overflow-hidden"/>
        <div className='mt-1 font-semibold text-orange-700 text-xl'>
          Sedang Memuat...
        </div>
      </div>
  </div>
  );
}
