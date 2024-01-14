'use client';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Textarea,
    Select,
    Option,
  } from "@material-tailwind/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"; 
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { TooltipIcon } from "@/components/tooltip/Tooltip";
import useSWR from "swr";
  
export default function StockTransferCard() {
    const router = useRouter();

    const { data: products } = useSWR("http://localhost:5050/products", (url) =>
    axios.get(url).then((res) => res.data.products)
  );

    // const [product, setProduct] = useState({
    //     kode_produk: "",
    //     nama_produk: "",
    //     stok: 0,
    //     harga: 0,
    //     deskripsi: "",
    //   });
   
    const handleSubmit = async (e) => {
        e.preventDefault();


      };
    
      // const handleChange = (e, field) => {
      //   const { value } = e.target;
    
      //   setProduct((prevProduct) => ({
      //     ...prevProduct,
      //     [field]: value,
      //   }));
      // };
    

    return (
       <div className="text-sm text-black w-full">
        <Toaster position="top-right" closeButton={true} richColors={true}/>
        <div className="flex justify-between items-center mb-14">
          <div className="flex justify-start gap-6">
            <div className="flex flex-col">
                <div className="font-semibold text-xl ">
                Transfer Stok Produk
                </div>
                <div color="gray" className="mt-1 font-normal">
                Transfer stok produk ke toko lain
                </div>
            </div>
          </div>
          <TooltipIcon message="Stok dari gudang yang ditransfer akan dianggap berkurang di stok gudang" />
        </div>
        <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
          <div className="mb-1 flex md:flex-col gap-6">
            <div className="flex-col w-full flex gap-6">
                <div className="-mb-3">
                    Gudang Asal
                </div>
                <Input
                    size="lg"
                    placeholder="XX-XXX"
                    className=" !border-t-blue-gray-200 focus:!border-gray-700 w-full"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    value="Gudang"
                    disabled 
                    // onChange={(e) => handleChange(e, "kode_produk")}
                />
                <div className="-mb-3">
                    Toko Tujuan (*)
                </div>
                <Select
                    size="lg"
                    className=" !border-t-blue-gray-200 focus:!border-gray-700"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    // value={nama_produk}
                    // onChange={(e) => handleChange(e, "nama_produk")}
                >
                    <Option value="1">Toko 1</Option>
                    <Option value="2">Toko 2</Option>
                    <Option value="3">Toko 3</Option>
                </Select>
            </div>
            
            <div className="flex flex-col gap-6 w-full">
            <div className="-mb-3">
                    Barang (*)
                </div>
                <Select
                    size="lg"
                    className=" !border-t-blue-gray-200 focus:!border-gray-700"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    // value={nama_produk}
                    // onChange={(e) => handleChange(e, "nama_produk")}
                >
                {products
                ? products
                .slice()
                .sort((a, b) => a.nama_produk.localeCompare(b.nama_produk))
                .map((product) => (
                  <Option key={product.id_produk} value={product.id_produk}>
                    {`${product.kode_produk} - ${product.nama_produk}`}
                  </Option>
                ))
                : <Option value="-1">Loading...</Option>}
                </Select>

                <div className="-mb-3">
                    Kuantitas/Qty (*)
                </div>
                <Input
                    type="number"
                    size="lg"
                    placeholder="xx"
                    className=" !border-blue-gray-200 focus:!border-gray-700"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    min={0}
                    // value={harga}
                    // onChange={(e) => handleChange(e, "harga")}
                />
            </div>
          </div>
          <div className="mb-3 mt-6">
                  Keterangan
                </div>
                <Textarea 
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-gray-700"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                    // value={deskripsi}
                    // onChange={(e) => handleChange(e, "deskripsi")}
                />
          <div className="mt-7 text-xs text-red-800">
            (*) Wajib diisi
          </div>
          <div className="mt-2 text-xs text-red-800">
            (*) Sistem tidak dapat mengembalikan stok yang sudah ditransfer
          </div>
          <Button className="mt-3" fullWidth color="blue" type="submit">
            Simpan
          </Button>

        </form>
      </div>
    );
  }