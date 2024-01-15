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
    TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Toaster, toast } from 'sonner'
 
export default function ModalDeleteTransfer({mutate, id_transfer, nama_produk}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5050/transfers/${id_transfer}`);

      if (res.status === 200) {
        toast.success("Transfer berhasil dihapus.");
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
      <Button onClick={handleOpen} variant="text" color="red" size="sm">
        <TrashIcon className="h-5 w-5" /> 
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
                    Hapus Transfer
                </div>
                <div className="text-sm text-red-600 mt-2 font-normal">
                    Setelah transfer dihapus, tidak dapat dilakukan pengeditan lagi.
                </div>
            </div>
        </DialogHeader>
        <DialogBody>
            Apakah Anda yakin ingin menghapus transfer barang
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
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleDelete}>
            <span>Hapus</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}