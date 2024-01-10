'use client';
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { 
    PencilSquareIcon,
    PlusIcon
} from "@heroicons/react/24/solid";
import axios from "axios";
import { Toaster, toast } from 'sonner'
 
export default function ModalTambahStok({name, userId}) {
    const [open, setOpen] = React.useState(false);
    const [stock, setStock] = useState(0);
    
    const handleOpen = () => setOpen(!open);

    const handleStockChange = (e) => {
      const newStock = parseInt(e.target.value, 10);

      setStock(e.target.value);

      // Check if the input is a valid positive integer
      if (!isNaN(newStock) && newStock >= 0 && Number.isInteger(newStock)) {
        setStock(newStock);
      }
    };

    const handleSubmit = async () => {
      if (stock === 0) {
        toast.error('Stok tidak boleh kosong');
        return;
      } else if (stock < 0) {
        toast.error('Stok tidak boleh negatif');
        return;
      } 
      toast.success('Stok berhasil ditambahkan');
      console.log("stok: ", stock);
      handleOpen();
      setStock(0);
    }


    return (
        <>
        <Toaster position="top-right" closeButton={true} richColors={true}/>
        <Button onClick={handleOpen} size="sm" color="blue-gray" className="hover:bg-blue-500">
            <PlusIcon className="h-4 w-4" />
        </Button>
    <Dialog open={open} size="lg" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <div className="mb-1" variant="h4">
              Tambah Stok Poduk {name}
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
            Tuliskan jumlah stok yang ingin ditambahkan.
          </div>
          <div className="grid gap-6">
            <Input label="Username" disabled value={name}/>
            <div className="-mb-1 text-blue-gray-800">
              Tambah Stok
            </div>
            <Input type="number" label="Stok" value={stock} onChange={handleStockChange} min={0}/>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            Batalkan
          </Button>
          <Button variant="gradient" color="blue" onClick={handleSubmit}>
            Tambah
          </Button>
        </DialogFooter>
      </Dialog>
        </>
    );
}