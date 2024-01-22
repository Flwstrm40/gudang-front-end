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
import { Spinner } from "@material-tailwind/react";
  
export default function FormTransferCard() {
    const router = useRouter();
    const [idProduk, setIdProduk] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [idToko, setIdToko] = useState("");

    const { data: products } = useSWR(`${process.env.API}/products`, (url) =>
    axios.get(url).then((res) => res.data.products)
    );

    const { data: stores } = useSWR(`${process.env.API}/stores`, (url) =>
    axios.get(url).then((res) => res.data.stores)
    );

  // Use useSWR to fetch the stock data
  const { data: getStok } = useSWR(
    idProduk ? `${process.env.API}/products/getStock/${idProduk}` : null,
    (url) => axios.get(url).then((res) => res.data.stock)
  );


    
    const handleBack = () => {
        router.push("/stockTransfer");
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const gudangAsal = "Gudang Semarang";
      const form = e.target;
  
      const formData = new FormData(form);
      const kuantitas = formData.get("kuantitas");
      const keterangan = formData.get("keterangan");
  
      if (!idToko || !idProduk || !kuantitas) {
        toast.error("Harap isi kolom yang diperlukan.");
        return;
      }
  
      if (kuantitas <= 0) {
        toast.error("Stok tidak boleh Nol/Negatif.");
        return;
      }
      console.log(getStok);

      if (kuantitas > getStok) {
        toast.error("Qty tidak boleh lebih besar dari stok yang ada.");
        return;
      }
      
      setIsLoading(true);
      try {
        // Send a POST request to the new endpoint
        const response = await axios.post(`${process.env.API}/transfers`, {
          id_produk: parseInt(idProduk),
          id_toko: parseInt(idToko),
          kuantitas: parseInt(kuantitas),
          asal: gudangAsal,
          keterangan: keterangan,
          status: 0, // Set the status to 0
        });
  
        toast.success(
          response.data.message || "Berhasil melakukan transfer stok produk"
        );
        router.push("/stockTransfer");
        setIsLoading(false);
      } catch (error) {
        toast.error(
          error.response.data.error || "Gagal melakukan transfer stok produk"
        );
        setIsLoading(false);
      }
    };
    

    const productOptions = products
    ? products.map((product) => ({
        value: product.id_produk.toString(),
        label: `${product.kode_produk} - ${product.nama_produk} (Sisa stok: ${product.stok})`,
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
                <Button variant="text" className="rounded-full" onClick={handleBack}>
                    <ArrowUturnLeftIcon className="h-5 w-5" />
                </Button>
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
              {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Transfer"}
            </Button>
          </form>
        </div>
      );
}