'use client';
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
  } from "@material-tailwind/react";
  import {
    PlusIcon,
    HomeIcon,
    CogIcon,
    Square3Stack3DIcon,
    PrinterIcon,
    UserPlusIcon,
  } from "@heroicons/react/24/outline";
  import Link from "next/link";
   
  export default function DialAddUser() {
    return (
      <div className="w-full">
        <div>
          <SpeedDial>
            <SpeedDialHandler>
              <IconButton size="lg" className="rounded-full" color="blue">
                <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
              <Link href="/accountManagement/formAddUser">
                <SpeedDialAction className="h-16 w-16 hover:bg-blue-500 hover:text-white">
                  <UserPlusIcon className="h-5 w-5" />
                  <div color="blue-gray" className="text-xs font-normal">
                    Tambah
                  </div>
                </SpeedDialAction>
              </Link>
            </SpeedDialContent>
          </SpeedDial>
        </div>
      </div>
    );
  }