import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { 
    CheckIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { parseCookies } from "nookies";
import { Spinner } from "@material-tailwind/react"; 

export default function ModalKonfirmasiTransfer({mutate, id_transfer, nama_produk, id_produk, harga, stok_keluar}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const cookies = parseCookies();
  const role = cookies.role;

  const handleOpen = () => setOpen(!open);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const transferRes = await axios.put(`${process.env.API}/transfers/${id_transfer}`, {
        status: 1,
      });
  
      if (transferRes.status === 200) {
        // Post data to outHistories
        const outHistoriesRes = await axios.post(`${process.env.API}/outHistories`, {
          id_produk: id_produk,
          harga_jual: harga,
          tanggal: new Date().toISOString().split('T')[0], // Today's date
          jam: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'}), // Current time
          stok_keluar: stok_keluar,
          tipe: 0,
          pj: role,
          id_transfer: id_transfer,
        });
  
        if (outHistoriesRes.status === 200) {
          toast.success("Transfer berhasil dikonfirmasi.");
          mutate();
          handleOpen();
          setIsLoading(false);
        } else {
          toast.error("Gagal menambahkan data ke riwayat keluar.");
          setIsLoading(false);
        }
      } else {
        toast.error("Gagal mengkonfirmasi transfer.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan.");
      console.log(error);
      setIsLoading(false);
    }
  };
  


  return (
    <>
      <Button onClick={handleOpen} variant="text" color="green" size="sm">
        <CheckIcon className="h-5 w-5" /> 
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
            <div className="flex flex-col">
                <div>
                    Konfirmasi Transfer
                </div>
                <div className="text-sm text-red-600 mt-2 font-normal">
                    Setelah dikonfirmasi, tidak dapat dilakukan pengeditan lagi.
                </div>
            </div>
        </DialogHeader>
        <DialogBody>
            Apakah barang 
             <span className="font-semibold">
                  {` ${nama_produk} `}
             </span>
             sudah sampai di toko tujuan?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="filled" color="green" onClick={handleSubmit}>
            <span> {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Konfirmasi"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}