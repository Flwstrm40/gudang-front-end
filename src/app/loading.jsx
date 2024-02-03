'use client';
import Image from 'next/image';
 
export default function Loading() {
  return (
    <div className=" flex my-auto items-center justify-center">
      <Image src="/Loading.gif" alt="loading" width={300} height={300} className="my-auto overflow-hidden"/>
  </div>
  );
}
