'use client';

import { useEffect, useState } from "react";
import React, { use } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  HomeIcon,
  ArrowsRightLeftIcon,
  ClipboardDocumentListIcon,
  ArrowPathRoundedSquareIcon,
  ArrowDownRightIcon,
  ArrowUpLeftIcon,
  UsersIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import Image from "next/image";
import useSWR, {mutate} from "swr";
import axios from "axios";
 
export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const router = useRouter();
  const cookies = parseCookies();
  const role = cookies.role;
  // console.log("role", role)

  const pathname = usePathname();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = () => {
    // Destroy the 'token' cookie
    destroyCookie(null, 'token', { path: '/' });
    destroyCookie(null, 'username', { path: '/' });
    destroyCookie(null, 'role', { path: '/' });
    destroyCookie(null, 'id', { path: '/' });

    // Redirect to the login page 
    router.push('/');
  };
  
  const isActiveLink = (path) => {
    return pathname === path;
  }

  const isHistory = (path) => {
    return pathname === path || pathname === '/history/entered' || pathname === '/history/left';
  }
  
  const styleActiveLink = () => {
    return 'bg-gray-200 font-semibold text-black';
  }

  const styleActiveLink2 = () => {
    return 'bg-gray-200 font-semibold text-black p-0';
  }
  
  // const { data: totalOrder, mutate: mutateTotalOrder } = useSWR(
  //   `${process.env.API}/orders/total`,
  //   async (url) => {
  //     const response = await axios.get(url);
  //     return response.data[0];
  //   }
  // );
  const { data: totalOrder, mutate: mutateTotalOrder } = useSWR(
    `${process.env.API2}/getNotDelivered`,
    async (url) => {
      const response = await axios.get(url);
      return response.data[0];
    }
  );
  
  const { data: totalTransfer, mutate: mutateTotalTransfer } = useSWR(
    `${process.env.API}/transfers/total`,
    async (url) => {
      const response = await axios.get(url);
      return response.data[0];
    }
  );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     mutate(`${process.env.API}/orders/total`);
  //     mutate(`${process.env.API}/transfers/total`);
  //   }, 1000); // Refresh data every 5 seconds

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="h-[calc(100vh)] w-full max-w-[18rem] p-4 lg:hidden fixed z-30 overflow-auto bg-white">
    {/* // <div className="h-[calc(100vh)] w-full max-w-[18rem] p-4 lg:hidden overflow-auto bg-white"> */}
    {/* shadow-xl shadow--900/5 */}
      {/* {console.log(children)} */}
      <div className="mb-2 p-4 mx-auto">
        <Image
          src="/Logo-Offo.png"
          alt="Logo"
          width={1500}
          height={500}
          className="object-contain w-auto h-auto"
          priority={true}
        />
      </div>
      <hr className="my-2 border" />
      <List>
        {/* Dashboard */}
        <Link href="/dashboard">
          <ListItem className={isActiveLink('/dashboard') ? styleActiveLink() : ''}>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5 " />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>

        {/* Order */}
        <Link href="/order">
          <ListItem className={isActiveLink('/order') ? styleActiveLink() : ''}>
            <ListItemPrefix>
              <ShoppingCartIcon className="h-5 w-5" />
            </ListItemPrefix>
            Pesanan
            <ListItemSuffix>
              {totalOrder?.total_orders >= 1 && (
                <Chip value={totalOrder?.total_orders} size="sm" variant="ghost" color="blue" className="rounded-full" />
              )}
            </ListItemSuffix>
          </ListItem>
        </Link>

        {/* Inventory */}
        <Link href="/inventory">
          <ListItem className={isActiveLink('/inventory') || isActiveLink('/inventory/addInfo') || isActiveLink('/inventory/addProduct') ? styleActiveLink() : ''}>
            <ListItemPrefix>
              <ClipboardDocumentListIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inventori
          </ListItem>
        </Link>

        {/* Stock Transfer */}
        <Link href="/stockTransfer">
          <ListItem className={isActiveLink('/stockTransfer') || isActiveLink('/stockTransfer/formTransfer') || isActiveLink('/stockTransfer/store') ? styleActiveLink() : ''}>
            <ListItemPrefix>
              <ArrowsRightLeftIcon className="h-5 w-5" />
            </ListItemPrefix>
            Transfer Stok
            <ListItemSuffix>
              {totalTransfer?.total_transfer >= 1 && (
                <Chip value={totalTransfer?.total_transfer} size="sm" variant="ghost" color="green" className="rounded-full" />
              )}
            </ListItemSuffix>
          </ListItem>
        </Link>

        {/* history */}
        {/* <Link href="/history">
          <ListItem className="">
            <ListItemPrefix>
              <ArrowPathRoundedSquareIcon className="h-5 w-5" />
            </ListItemPrefix>
            Riwayat
          </ListItem>
        </Link> */}
         <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className={isHistory('/history') ? styleActiveLink2() : 'p-0'} selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3 ">
              <ListItemPrefix>
                <ArrowPathRoundedSquareIcon className="h-5 w-5 " />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal">
                Riwayat
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 ">
              <Link href="/history/entered">
                <ListItem  className={isActiveLink('/history/entered') ? styleActiveLink() : ''}>
                  <ListItemPrefix>
                    <ArrowDownRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Riwayat Masuk
                </ListItem>
              </Link>
              <Link href="/history/left">
                <ListItem  className={isActiveLink('/history/left') ? styleActiveLink() : ''}>
                  <ListItemPrefix>
                    <ArrowUpLeftIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Riwayat Keluar
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
          
        {/* Profile */}
        <Link href="/profile">
          <ListItem  className={isActiveLink('/profile') ? styleActiveLink() : ''}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profil
          </ListItem>
        </Link>

        {/* Manajemen Akun */}
        {role == 'kepala gudang' &&  
        <Link href="/accountManagement">
          <ListItem  className={isActiveLink('/accountManagement') ? styleActiveLink() : ''}>
            <ListItemPrefix>
              <UsersIcon className="h-5 w-5" />
            </ListItemPrefix>
            Manajemen Akun
          </ListItem>
        </Link>
        }
       

        {/* Log Out */}
        <ListItem onClick={handleLogout} className="bg-red-500 hover:bg-red-800 text-white hover:text-white">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </div>
  );
}