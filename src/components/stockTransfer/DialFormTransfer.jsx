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
    ArrowsRightLeftIcon,
  } from "@heroicons/react/24/outline";
  import Link from "next/link";
   
  export default function DialFormTransfer() {
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
              <Link href="/stockTransfer/formTransfer">
                <SpeedDialAction className="h-16 w-16 hover:bg-blue-500 hover:text-white">
                  <ArrowsRightLeftIcon className="h-5 w-5" />
                  <div color="blue-gray" className="text-xs font-normal">
                    Transfer
                  </div>
                </SpeedDialAction>
              </Link>
            </SpeedDialContent>
          </SpeedDial>
        </div>
      </div>
    );
  }