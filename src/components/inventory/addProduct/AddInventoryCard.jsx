'use client';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Textarea,
  } from "@material-tailwind/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"; 
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import Loading from "@/app/(main)/inventory/loading";
  
export default function AddInventoryCard() {
    const router = useRouter();

    const [product, setProduct] = useState({
        kode_produk: "",
        nama_produk: "",
        stok: 0,
        harga: 0,
        deskripsi: "",
      });

    const handleBack = () => {
        router.push("/inventory");
    }

    // console.log("product", product);

    // cek kode produk apakah sudah digunakan oleh produk lain
    const checkKodeProdukAvailability = async () => {
      try {
          const response = await axios.post(`http://localhost:5050/products/cekKodeProduk`, {
            kode_produk: product.kode_produk,
          });
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.kode_produk || !product.nama_produk) {
            toast.error("Harap isi semua kolom yang diperlukan.");
            return;
        }

        // Cek kode produk apakah sudah digunakan oleh produk lain
        const isKodeProdukAvailable = await checkKodeProdukAvailability();
        console.log("isKodeProdukAvailable", isKodeProdukAvailable);
        if (!isKodeProdukAvailable) {
            return;
        }
    
        try {
          const response = await axios.post("http://localhost:5050/products", product);
    
          if (response.status === 200) {
            // Handle success, maybe redirect to inventory page
            toast.success("Produk berhasil ditambahkan");
            // Tunggu 3 detik sebelum navigasi
            setTimeout(() => {
                router.push("/inventory");
            }, 1000);
          } else {
            // Handle error
            toast.error("Gagal menambahkan produk");
            console.error("Failed to add product");
          }
        } catch (error) {           
            toast.error("Gagal menambahkan produk");
            console.error("Error:", error);
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
       <div className="text-sm text-black w-full">
        <Toaster position="top-right" closeButton={true} richColors={true}/>
        <div className="flex justify-start gap-6 mb-14">
            <Button variant="text" className="rounded-full" onClick={handleBack}>
                <ArrowUturnLeftIcon className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
                <div className="font-semibold text-xl ">
                Tambah Produk
                </div>
                <div color="gray" className="mt-1 font-normal">
                Tambah produk baru ke dalam gudang
                </div>
            </div>
        </div>
        <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
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
                {/* <div className="-mb-3">
                    Stok
                </div>
                <Input
                    type="number"
                    size="lg"
                    placeholder="xx"
                    className=" !border-t-blue-gray-200 focus:!border-gray-700"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    min={0}
                    value={product.stok}
                    onChange={(e) => handleChange(e, "stok")}
                /> */}
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
          <Button className="mt-3" fullWidth color="blue" type="submit">
            Tambah
          </Button>

        </form>
      </div>
    );
  }