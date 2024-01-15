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
 
export default function ModalKonfirmasiTransfer({mutate, id_transfer}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5050/transfers/${id_transfer}`, {
        status: 1,
      });

      if (res.status === 200) {
        toast.success("Transfer berhasil dikonfirmasi.");
        mutate();
        handleOpen();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan.");
      console.log(error);
    }
  };


  return (
    <>
      <Button onClick={handleOpen} variant="text" color="green" size="sm">
        <CheckIcon className="mr-2 h-5 w-5" /> 
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
            Apakah barang yang ditransfer sudah sampai di toko tujuan?
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
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Konfirmasi</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}