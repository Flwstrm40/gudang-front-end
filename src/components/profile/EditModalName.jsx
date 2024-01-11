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
 
export default function EditModalName({name, userId}) {
    const [open, setOpen] = React.useState(false);
    const [displayName, setDisplayName] = React.useState('');
 
    useEffect(() => {
        setDisplayName(name);
    }, [name]);
    const handleOpen = () => setOpen(!open);
    

    const handleSave = async () => {
        try {
            // console.log("userId", userId)
            const response = await axios.put(`http://localhost:5050/user/${userId}`, {
                displayName: displayName,
            });
            // console.log("displayName", displayName)
            // console.log(response.data);
            if (response.data) {
                toast.success('Display Name berhasil diubah');
                handleOpen();
                // router.replace('/profile');
            } else {
                toast.error('Display Name gagal diubah');
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
            toast.error('Display Name gagal diubah');
        }
    }


    const handleBack = () => {
        setDisplayName(name);
        handleOpen();
    }
    
    return (
        <>
        <Toaster position="top-right" closeButton={true} richColors={true}/>
        <Button onClick={handleOpen} size="sm" color="blue-gray" variant="gradient">
            <PencilSquareIcon className="h-4 w-4" />
            {/* Edit Display Name */}
        </Button>
        <Dialog open={open} size="lg" handler={handleOpen}>
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
                Simpan
            </Button>
            </DialogFooter>
        </Dialog>
        </>
    );
}