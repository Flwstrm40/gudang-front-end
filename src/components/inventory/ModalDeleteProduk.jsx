import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { 
    CheckIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { set } from "date-fns";
import { Spinner } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";
import useSWR from "swr";
import { Result } from "postcss";

export default function ModalDeleteProduk({ mutate, id_produk, nama_produk, kode_produk, stok }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleOpen = () => setOpen(!open);

  // const { data: orderDetails, error: errorDetails } = useSWR(`${process.env.API}/orders/details`, async (url) => {
  //   const response = await axios.get(url);
  //   return response.data;
  // });

  const { data: orderDetails, error: errorDetails } = useSWR(`${process.env.API2}/getSO`, async (url) => {
    const response = await axios.get(url);
    return response.data;
  });

  const { data: transfer, error:errorTransfers } = useSWR(`${process.env.API}/transfers`, async (url) => {
    const response = await axios.get(url);
    return response.data.transfers;
  });


  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.delete(`${process.env.API}/products/${id_produk}`);

      if (res.status === 200) {
        toast.success("Produk berhasil dihapus.");
        mutate();
        handleOpen();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.error);
      setIsLoading(false);
    }
  };

  
  // Memeriksa apakah kode_produk yang akan dihapus ada di dalam orderDetails
  const isKodeProdukInOrderDetails = orderDetails && orderDetails.some(order => order.kode_produk.includes(kode_produk) && order.status_terima == 0);
  
  // Memeriksa apakah kode_produk yang akan dihapus ada di dalam transfer
  const isKodeProdukInTransfer = transfer && (transfer.some(transfer => transfer.kode_produk.includes(kode_produk) && transfer.status == 0));
  
  if (errorDetails && errorTransfers) return <p>Error</p>;
  if (!orderDetails && !transfer) return <p><Spinner className="h-4 w-4 mt-3" color="red" /></p>;

  return (
    <>
      {isKodeProdukInOrderDetails || isKodeProdukInTransfer ? (
        <Tooltip
          content="Produk masih terkait dengan pesanan"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          className="bg-red-800 text-blue-gray-50"
        >
          <Button variant="text" color="blue-gray" size="sm" className="p-2" disabled>
            <TrashIcon className="h-5 w-5" />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip
          content="Hapus Produk"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          className="bg-red-800 text-blue-gray-50"
        >
          <Button onClick={handleOpen} variant="text" color={stok ==0 ? "red" : "blue-gray"} size="sm" className="p-2" disabled={stok ==0 ? false : true}>
            <TrashIcon className="h-5 w-5" />
          </Button>
        </Tooltip>
      )}
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="overflow-auto max-h-[90%]"
      >
        <DialogHeader>
            <div className="flex flex-col">
                <div>
                    Hapus Produk
                </div>
                <div className="text-sm text-red-600 mt-2 font-normal">
                    Setelah Produk dihapus, tidak dapat dilakukan pengeditan lagi.
                </div>
            </div>
        </DialogHeader>
        <DialogBody>
            Apakah Anda yakin ingin menghapus Produk
            <span className="font-semibold">
                {` ${nama_produk}?`}
            </span>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="black"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Batalkan</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleDelete}>
            <span> {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Hapus"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
