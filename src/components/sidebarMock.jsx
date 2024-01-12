'use client';

import React from "react";
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
 
export function SidebarMock({user}) {
  const [open, setOpen] = React.useState(0);
  const router = useRouter();
  const cookies = parseCookies();
  const role = cookies.role;
  console.log("role", role)

  const pathname = usePathname();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

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

  return (
    <div className="h-0 w-full max-w-[18rem] shadow-xl shadow--900/5 md:hidden bg-white">
      {/* {console.log(children)} */}
      <div className="mb-2 p-4 mx-auto">
    
      </div>
      <List>
    
      </List>
    </div>
  );
}