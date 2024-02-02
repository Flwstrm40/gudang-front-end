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
import { parseCookies } from "nookies";
import { Spinner } from "@material-tailwind/react";
import { set } from "date-fns";
import { Tooltip } from "@material-tailwind/react";
 
export default function ModalTambahStok({name, produkId, mutate}) {
    const [open, setOpen] = React.useState(false);
    const [stock, setStock] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const cookies = parseCookies();

    const role = cookies.role;
    
    const handleOpen = () => {
      setOpen(!open)
      setStock(''); 
      setKeterangan('');  
    };

    const handleStockChange = (e) => {
      const newStock = parseInt(e.target.value, 10);

      setStock(e.target.value);

      // Check if the input is a valid positive integer
      if (!isNaN(newStock) && newStock >= 0 && Number.isInteger(newStock)) {
        setStock(newStock);
      }
    };

    const handleSubmit = async () => {
      if (!keterangan){
        toast.error('Harap isi semua kolom yang diperlukan.');
        return;
      }
      else if (stock === 0 || stock === '') {
        toast.error('Stok tidak boleh kosong');
        return;
      } else if (stock < 0) {
        toast.error('Stok tidak boleh negatif');
        return;
      }
      
      setIsLoading(true);
      try {
        // Assuming you have the product ID available in your component, replace ':id' with the actual product ID.
        const response = await axios.put(`${process.env.API}/products/addStock/${produkId}`, { stok: stock });
    
        
        // Post to inHistories endpoint
        const inHistoriesData = {
          id_produk: produkId,
          stok_masuk: stock,
          tanggal: new Date().toISOString().split('T')[0],
          jam: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
          keterangan: keterangan,
          pj: role
        };
        
        await axios.post(`${process.env.API}/inHistories`, inHistoriesData);
        
        // Handle success, e.g., show a success toast or perform additional actions.
        console.log('Response:', response.data);
        toast.success('Stok berhasil ditambahkan');
        mutate();

        handleOpen();
        setKeterangan('');
        setStock('');
        setIsLoading(false);
      } catch (error) {
        // Handle errors, e.g., show an error toast or perform additional error handling.
        toast.error('Gagal menambahkan stok');
        console.error('Error:', error.message);
        setIsLoading(false);
      }
    };
    
    


    return (
        <>
        {/* <Toaster position="top-right" closeButton={true} richColors={true}/> */}
        <Tooltip
          content="Tambah Stok"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          className="bg-blue-800 text-blue-gray-50"
        >
          <Button onClick={handleOpen} size="sm" variant="text" color="blue">
              <PlusIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
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
              Tambah Stok (*)
            </div>
            <Input type="number" label="Stok" value={stock} onChange={handleStockChange} min={0}/>
            <div className="-mb-1 text-blue-gray-800">
              Keterangan (*)
            </div>
            <Textarea value={keterangan} label="keterangan" onChange={(e) => setKeterangan(e.target.value)}/>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            Batalkan
          </Button>
          <Button variant="filled" color="blue" onClick={handleSubmit}>
            {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Tambah"}
          </Button>
        </DialogFooter>
      </Dialog>
        </>
    );
}