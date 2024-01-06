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
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  HomeIcon,
  ArrowsRightLeftIcon,
  ClipboardDocumentListIcon,
  ArrowPathRoundedSquareIcon,
  ArrowDownRightIcon,
  ArrowUpLeftIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
 
export function Sidebar({user}) {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <div className="h-[calc(100vh)] w-full max-w-[18rem] p-4 shadow-xl shadow--900/5 ">
      {/* {console.log(children)} */}
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Gudang
        </Typography>
      </div>
      <hr className="my-2 border--100" />
      <List className="">
        {/* <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 " selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 ">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 " />
              </ListItemPrefix>
              <Typography color="" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 ">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion> */}
       

        {/* Dashboard */}
        <Link href="/dashboard">
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5 " />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>

        {/* Inventory */}
        <Link href="/inventory">
          <ListItem>
            <ListItemPrefix>
              <ClipboardDocumentListIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inventori
          </ListItem>
        </Link>

        {/* Stock Transfer */}
        <Link href="/stockTransfer">
          <ListItem>
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
              <Typography color="" className="mr-auto font-normal">
                Riwayat
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 ">
              <Link href="/history/entered">
                <ListItem>
                  <ListItemPrefix>
                    <ArrowDownRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Riwayat Masuk
                </ListItem>
              </Link>
              <Link href="/history/left">
                <ListItem>
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
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profil
          </ListItem>
        </Link>

        {/* Log Out */}
        <Link href="/">
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </Link>
      </List>
    </div>
  );
}