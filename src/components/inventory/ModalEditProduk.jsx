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
import { Toaster, toast } from 'sonner';
import { Spinner } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";
 
export default function ModalEditStok({kode_produk, nama_produk, harga, deskripsi, id_produk, mutate}) {
    const [open, setOpen] = React.useState(false);
    const [stock, setStock] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
      kode_produk: kode_produk,
      nama_produk: nama_produk,
      harga: harga,
      deskripsi: deskripsi,
    });
    const [id, setId] = useState(id_produk);
    
    const handleOpen = () => {
      setOpen(!open)
      setProduct({
        kode_produk: kode_produk,
        nama_produk: nama_produk,
        harga: harga,
        deskripsi: deskripsi,
      });
    };


    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!product.kode_produk || !product.nama_produk) {
          toast.error("Harap isi semua kolom yang diperlukan.");
          return;
      }

      if(product.harga < 0){
        toast.error("Harga tidak boleh negatif");
        return;
      }

      // check if current kode_produk is the same as the one in the database
      const isSameKodeProduk = product.kode_produk === kode_produk;

      if (!isSameKodeProduk) {
        const isKodeProdukAvailable = await checkKodeProdukAvailability();
        // console.log("isKodeProdukAvailable", isKodeProdukAvailable);
        if (!isKodeProdukAvailable) {
            return;
        }
      }
  
      setIsLoading(true);
      try {
        const response = await axios.put(`${process.env.API}/products/${id}`, product);
  
        if (response.status === 200) {
          toast.success("Produk berhasil diedit");
          mutate();
          handleOpen();
          setIsLoading(false);
        } else {
          // Handle error
          toast.error("Gagal mengedit produk");
          console.error("Failed to add product");
          setIsLoading(false);
        }
      } catch (error) {           
          toast.error("Gagal mengedit produk");
          console.error("Error:", error);
          setIsLoading(false);
      }
    };

     // cek kode produk apakah sudah digunakan oleh produk lain
     const checkKodeProdukAvailability = async () => {
      try {
          const response = await axios.post(`${process.env.API}/products/cekKodeProduk`, {
            kode_produk: product.kode_produk,
          });
    

          // console.log("isSameKodeProduk", isSameKodeProduk);
          if (!response.data.isKodeProdukAvailable) {
            toast.error('Kode produk sudah digunakan oleh produk lain');
          }
          console.log("response", response.data.isKodeProdukAvailable)
          return response.data.isKodeProdukAvailable;
        } catch (error) {
          console.error('Error checking kode produk availability:', error.message);
          toast.error('Error checking kode produk availability');
        }
      };
    
    const handleChange = (e, field) => {
      const { value } = e.target;
  
      setProduct((prevProduct) => ({
        ...prevProduct,
        [field]: value,
      }));
    };


    return (
        <>
        {/* <Toaster position="top-right" closeButton={true} richColors={true}/> */}
        <Tooltip
          content="Edit Produk"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          className="bg-green-800 text-blue-gray-50"
        >
          <Button onClick={handleOpen} size="sm" color="green" variant="text" className="p-2">
              <PencilSquareIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
    <Dialog open={open} size="lg" handler={handleOpen} className="overflow-auto max-h-[90%] max-w-52">
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <div className="mb-1" variant="h4">
              Edit Produk {nama_produk}
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
            Ganti kolom yang ingin diubah
          </div>
          <form className="mt-8 mb-2 w-full">
          <div className="mb-1 flex md:flex-col gap-6">
            <div className="flex-col w-full flex gap-6">
                <div className="-mb-3">
                    Kode Produk (*)
                </div>
                <Input
                    size="lg"
                    placeholder="XX-XXX"
                    className=" !border-t-blue-gray-200 focus:!border-gray-700 w-full"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    value={product.kode_produk}
                    onChange={(e) => handleChange(e, "kode_produk")}
                    disabled
                />
                <div className="-mb-3">
                    Nama Produk (*)
                </div>
                <Input
                    size="lg"
                    placeholder="Produk ABC"
                    className=" !border-t-blue-gray-200 focus:!border-gray-700"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    value={product.nama_produk}
                    onChange={(e) => handleChange(e, "nama_produk")}
                />
            </div>
            
            <div className="flex flex-col gap-6 w-full">

                <div className="-mb-3">
                    Harga Produk (*)
                </div>
                <Input
                    type="number"
                    size="lg"
                    placeholder="xxxxxxx"
                    className=" !border-t-blue-gray-200 focus:!border-gray-700"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    min={0}
                    value={product.harga}
                    onChange={(e) => handleChange(e, "harga")}
                />
                <div className="-mb-3">
                    Deskripsi Produk
                </div>
                <Textarea 
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-gray-700"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                    value={product.deskripsi}
                    onChange={(e) => handleChange(e, "deskripsi")}
                />
            </div>
          </div>
          <div className="mt-7 text-xs text-red-800">
            (*) Wajib diisi
          </div>

        </form>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            Batalkan
          </Button>
          {/* <Button variant="filled" color="blue" onClick={handleSubmit}> */}
          <Button variant="filled" color="blue" onClick={handleSubmit}>
            {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Simpan"}
          </Button>
        </DialogFooter>
      </Dialog>
        </>
    );
}