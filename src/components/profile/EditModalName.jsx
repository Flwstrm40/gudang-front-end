'use client';
import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { Spinner } from "@material-tailwind/react";
import { set } from "date-fns";
import { usePathname } from "next/navigation";
import { Tooltip } from "@material-tailwind/react";
 
export default function EditModalName({name, userId, mutate, onClose}) {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(pathname === '/profile' ? false : true);
    const [displayName, setDisplayName] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
 
    useEffect(() => {
        setDisplayName(name);
    }, [name]);
    const handleOpen = () => {
        setOpen(!open)
        {onClose ? onClose() : null}
    };
    

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // console.log("userId", userId)
            const response = await axios.put(`${process.env.API}/user/${userId}`, {
                displayName: displayName,
            });
            // console.log("displayName", displayName)
            // console.log(response.data);
            if (response.data) {
                toast.success('Display Name berhasil diubah');
                mutate();
                handleOpen();
                // router.replace('/profile');
                setIsLoading(false);
            } else {
                toast.error('Display Name gagal diubah');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
            toast.error('Display Name gagal diubah');
            setIsLoading(false);
        }
    }


    const handleBack = () => {
        setDisplayName(name);
        handleOpen();
    }
    
    return (
        <>
        { pathname === '/profile' &&
            <Tooltip
                content="Edit Display Name"
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
                }}
                className="bg-blue-gray-800 text-blue-gray-50"
            >
                <Button onClick={handleOpen} size="sm" color="blue-gray" variant="text">
                    <PencilSquareIcon className="h-4 w-4" />
                    {/* Edit Display Name */}
                </Button>
            </Tooltip>
        }
        <Dialog open={open} size="lg" handler={handleOpen} className="overflow-auto max-h-[90%]">
            <div className="flex items-center justify-between lg:w-3">
            <DialogHeader className="flex flex-col items-start">
                {" "}
                <div className="mb-1" variant="h4">
                Edit Display Name
                </div>
            </DialogHeader>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5 cursor-pointer"
                onClick={handleOpen}
            >
                <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
                />
            </svg>
            </div>
            <DialogBody>
            <div className="mb-10 -mt-7 " color="gray" variant="lead">
                Tulis nama baru dan klik tombol "Simpan".
            </div>
            <div className="grid gap-6">
                <div className="-mb-1" color="blue-gray" variant="h6">
                Display Name
                </div>
                <Input label="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
            </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
            <Button variant="text" color="gray" onClick={handleBack}>
                Batalkan
            </Button>
            <Button variant="gradient" color="blue" onClick={handleSave}>
                {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Simpan"}
            </Button>
            </DialogFooter>
        </Dialog>
        </>
    );
}