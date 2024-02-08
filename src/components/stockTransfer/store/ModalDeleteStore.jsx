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
import { set } from "date-fns";
import { Spinner } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";
import useSWR from "swr";
 
export default function ModalDeleteStore({mutate, id_toko, nama_toko}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleOpen = () => setOpen(!open);
 
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.delete(`${process.env.API}/stores/${id_toko}`);

      if (res.status === 200) {
        toast.success("Toko berhasil dihapus.");
        mutate();
        handleOpen();
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
      <Tooltip
          content="Hapus Toko"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          className="bg-red-800 text-blue-gray-50"
      >
        <Button onClick={handleOpen} variant="text" color="red" size="sm">
          <TrashIcon className="h-5 w-5" /> 
        </Button>
      </Tooltip>
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
                    Hapus Toko
                </div>
                <div className="text-sm text-red-600 mt-2 font-normal">
                    Setelah Toko dihapus, tidak dapat dilakukan pengeditan lagi.
                </div>
            </div>
        </DialogHeader>
        <DialogBody>
            Apakah Anda yakin ingin menghapus Toko
            <span className="font-semibold">
                {` ${nama_toko}?`}
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