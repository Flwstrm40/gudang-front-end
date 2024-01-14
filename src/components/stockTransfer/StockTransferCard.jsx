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
import { TooltipIcon } from "@/components/tooltip/Tooltip";
import useSWR from "swr";
import Select from "react-select";
  
export default function StockTransferCard() {
    const router = useRouter();
    const [idProduk, setIdProduk] = useState(""); // Add state for idProduk
    const [idToko, setIdToko] = useState("");

    const { data: products } = useSWR("http://localhost:5050/products", (url) =>
    axios.get(url).then((res) => res.data.products)
    );

    const { data: stores } = useSWR("http://localhost:5050/stores", (url) =>
    axios.get(url).then((res) => res.data.stores)
    );

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const gudangAsal = "Gudang Semarang"; // Change this according to your data
      const form = e.target;
    
      const formData = new FormData(form);
      const stok = formData.get("kuantitas");
      const keterangan = formData.get("keterangan");

       
       console.log("data", { gudangAsal, idToko, idProduk, stok, keterangan });
       
       if (!idToko || !idProduk || !stok ) {
         toast.error("Harap isi kolom yang diperlukan.");
         return;
       }

       if (stok <= 0) {
        toast.error("Stok tidak boleh Nol/Negatif.");
        return;
      }

      try {
        const response = await axios.put(`http://localhost:5050/products/transferStock/${idProduk}`, {
          stok: stok,
        });
    
        toast.success(response.data.message || "Berhasil melakukan transfer stok produk");
      } catch (error) {
        toast.error(error.response.data.error || "Gagal melakukan transfer stok produk");
      }
    };
    

    const productOptions = products
    ? products.map((product) => ({
        value: product.id_produk.toString(),
        label: `${product.kode_produk} - ${product.nama_produk}`,
      }))
    : [];

    const storeOptions = stores
      ? stores.map((store) => ({
          value: store.id_toko.toString(),
          label: store.nama_toko,
        }))
      : [];
      
    

      return (
        <div className="text-sm text-black w-full">
          <Toaster position="top-right" closeButton={true} richColors={true} />
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
                  size="md"
                  placeholder="XX-XXX"
                  className=" !border-t-blue-gray-200 focus:!border-gray-700 w-full"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value="Gudang Semarang"
                  disabled
                  name="gudangAsal"
                />
                <div className="-mb-3">Toko Tujuan (*)</div>
                <Select
                  options={storeOptions}
                  className="w-full"
                  value={storeOptions.find((option) => option.value === idToko)}
                  onChange={(selectedOption) => setIdToko(selectedOption.value)}
                  isSearchable
                  placeholder="Pilih Toko Tujuan"
                />
              </div>
                        
              <div className="flex flex-col gap-6 w-full">
                <div className="-mb-3">Barang (*)</div>
                <Select
                  options={productOptions}
                  className="w-full"
                  value={productOptions.find((option) => option.value === idProduk)}
                  onChange={(selectedOption) => setIdProduk(selectedOption.value)}
                  isSearchable
                  placeholder="Pilih Barang"
                />
      
                <div className="-mb-3">
                  Kuantitas/Qty (*)
                </div>
                <Input
                  type="number"
                  size="md"
                  placeholder="xx"
                  className=" !border-blue-gray-200 focus:!border-blue-700"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  min={0}
                  name="kuantitas"
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
              name="keterangan"
            />
            <div className="mt-7 text-xs text-red-800">
              (*) Wajib diisi
            </div>
            <div className="mt-2 text-xs text-red-800">
              (*) Sistem tidak dapat mengembalikan stok yang sudah ditransfer
            </div>
            <Button className="mt-3" fullWidth color="blue" type="submit">
              Transfer
            </Button>
          </form>
        </div>
      );
}