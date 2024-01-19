'use client';

import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
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
import {
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import Image from "next/image";
 
export default function SidebarBurger() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const router = useRouter();
  const cookies = parseCookies();
  const role = cookies.role;
  // console.log("role", role)

  const pathname = usePathname();


  const handleLogout = () => {
    // Destroy the 'token' cookie
    destroyCookie(null, 'token', { path: '/dashboard' });
    destroyCookie(null, 'username', { path: '/dashboard' });
    destroyCookie(null, 'role', { path: '/dashboard' });
    destroyCookie(null, 'id', { path: '/dashboard' });
    
    // Redirect to the login page or any other desired page
    router.push('/');
  };
  
  const isActiveLink = (path) => {
    return pathname === path;
  }
  
  const styleActiveLink = () => {
    return 'bg-gray-200 font-semibold text-black';
  }
  
  // console.log("pathname", pathname);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
 
  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer} className="hidden lg:inline z-50">
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
      <div className="h-[calc(100vh)] w-full max-w-[18rem] p-4 fixed z-30 overflow-auto bg-white">
    {/* // <div className="h-[calc(100vh)] w-full max-w-[18rem] p-4 lg:hidden overflow-auto bg-white"> */}
    {/* shadow-xl shadow--900/5 */}
      {/* {console.log(children)} */}
      <div className="mb-2 p-4 mx-auto flex justify-between">
        <Image
          src="/Logo-Offo.png"
          alt="Logo"
          width={150}
          height={50}
          className="object-contain w-auto h-auto"
          priority={true}
        />
         <IconButton variant="text" color="blue-gray" onClick={closeDrawer} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
      </div>
      <hr className="my-2 border--100" />
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
          <ListItem className={isActiveLink('/stockTransfer') || isActiveLink('/stockTransfer/formTransfer') ? styleActiveLink() : ''}>
            <ListItemPrefix>
              <ArrowsRightLeftIcon className="h-5 w-5" />
            </ListItemPrefix>
            Transfer Stok
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
          <ListItem className="p-0" selected={open === 2}>
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
      </Drawer>
    </>
  );
}