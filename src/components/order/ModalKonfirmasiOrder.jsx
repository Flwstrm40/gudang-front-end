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
 
export default function ModalKonfirmasiOrder({mutate, id_customer, nama_produk, id_produk, harga, nama_cust}) {
  const [open, setOpen] = React.useState(false);
  const cookies = parseCookies();
  const role = cookies.role;

  const handleOpen = () => setOpen(!open);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerRes = await axios.put(`${process.env.API}/customers/${id_customer}`, {
        status_terima: '1',
      });
  
      if (customerRes.status === 200) {
        // Post data to outHistories
        const outHistoriesRes = await axios.post(`${process.env.API}/outHistories`, {
          id_produk: id_produk,
          harga_jual: harga,
          tanggal: new Date().toISOString().split('T')[0], // Today's date
          jam: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'}), // Current time
          tipe: 1,
          pj: role,
          id_customer: id_customer,
        });
  
        if (outHistoriesRes.status === 200) {
          toast.success("Order berhasil dikonfirmasi.");
          mutate();
          handleOpen();
        } else {
          toast.error("Gagal menambahkan data ke riwayat keluar.");
        }
      } else {
        toast.error("Gagal mengkonfirmasi Order.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan.");
      console.log(error);
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
                    Konfirmasi Order
                </div>
                <div className="text-sm text-red-600 mt-2 font-normal">
                    Setelah dikonfirmasi, tidak dapat dilakukan pengeditan lagi.
                </div>
            </div>
        </DialogHeader>
        <DialogBody>
            Apakah produk 
             <span className="font-semibold">
                  {` ${nama_produk} `}
             </span>
             sudah sampai ke
             <span className="font-semibold">
                  {` ${nama_cust} `}
             </span>
             ?
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
            <span>Konfirmasi</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}