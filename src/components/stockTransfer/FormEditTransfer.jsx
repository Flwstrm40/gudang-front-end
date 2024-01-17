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
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { TooltipIcon } from "@/components/tooltip/Tooltip";
import useSWR,{mutate} from "swr";
import Select from "react-select";
  
export default function FormEditCard({id_transfer, id_produk, id_toko, edit_kuantitas, edit_keterangan, mutate, handleOpen}) {

    const router = useRouter();
    const [idProduk, setIdProduk] = useState(id_produk.toString());
    const [idToko, setIdToko] = useState(id_toko.toString());
    const [editKuantitas, setEditKuantitas] = useState(edit_kuantitas);
    const [qtyAwal, setQtyAwal] = useState(edit_kuantitas);
    const [editKeterangan, setEditKeterangan] = useState(edit_keterangan);

    const { data: products } = useSWR("http://localhost:5050/products", (url) =>
    axios.get(url).then((res) => res.data.products)
    );

    const { data: stores } = useSWR("http://localhost:5050/stores", (url) =>
    axios.get(url).then((res) => res.data.stores)
    );

  // Use useSWR to fetch the stock data
  const { data: getStok } = useSWR(
    idProduk ? `http://localhost:5050/products/getStock/${idProduk}` : null,
    (url) => axios.get(url).then((res) => res.data.stock)
  );

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

    if (kuantitas > getStok + qtyAwal) {
      toast.error("Qty tidak boleh lebih besar dari stok yang ada.");
      return;
    }

    try {
      // Update stock first
      await axios.put(`http://localhost:5050/products/${idProduk}`, {
        stok: getStok + qtyAwal,
      });

      // Send a POST request to the new endpoint
      await axios.put(`http://localhost:5050/transfers/${id_transfer}`, {
        id_produk: parseInt(idProduk),
        id_toko: parseInt(idToko),
        kuantitas: parseInt(kuantitas),
        asal: gudangAsal,
        keterangan: keterangan,
        status: 0, 
      });

      // send a put to transferStock api
      await axios.put(`http://localhost:5050/products/transferStock/${idProduk}`, {
        stok : kuantitas,
      });

      toast.success(
        "Berhasil melakukan edit transfer produk"
      );
      mutate();
      handleOpen();
    } catch (error) {
      toast.error(
        error.response.data.error || "Gagal melakukan edit transfer produk"
      );
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
              <div className="flex flex-col">
                <div className="font-semibold text-xl ">
                  Edit Transfer
                </div>
                <div className="mt-1 font-normal text-blue-gray-600">
                  Edit Transfer stok produk ke toko lain
                </div>
              </div>
            </div>
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
                <div className="-mb-3">Toko Tujuan</div>
                <Select
                    options={storeOptions}
                    className="w-full"
                    value={storeOptions.find((option) => option.value === idToko)}
                    onChange={(selectedOption) => setIdToko(selectedOption.value)}
                    isSearchable
                    isDisabled
                    placeholder="Pilih Toko Tujuan"
                />
              </div>
                        
              <div className="flex flex-col gap-6 w-full">
                <div className="-mb-3">Barang</div>
                <Select
                  options={productOptions}
                  className="w-full cursor-not-allowed"
                  value={productOptions.find((option) => option.value === idProduk)}
                  onChange={(selectedOption) => setIdProduk(selectedOption.value)}
                  isSearchable
                  isDisabled
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
                  value={editKuantitas}
                  onChange={(e) => setEditKuantitas(e.target.value)}
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
              value={editKeterangan}
              onChange={(e) => setEditKeterangan(e.target.value)}
              name="keterangan"
            />
            <div className="mt-7 text-xs text-red-800">
              (*) Wajib diisi
            </div>
            <div className="mt-2 text-xs text-red-800">
              (*) Sistem tidak dapat mengembalikan stok yang sudah ditransfer
            </div>
            <div className="flex gap-1 justify-end">

                <Button variant="text" color="gray" onClick={handleOpen}>
                    Batalkan
                </Button>
                <Button variant="gradient" color="blue" type="submit">
                    Simpan
                </Button>
            </div>
          </form>
        </div>
      );
}