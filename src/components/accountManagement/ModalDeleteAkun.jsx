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
} from "@heroicons/react/24/solid";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { set } from "date-fns";
import { Spinner } from "@material-tailwind/react";
 
export default function ModalDeleteAkun({mutate, id_user, username}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.delete(`${process.env.API}/user/${id_user}`);

      if (res.status === 200) {
        toast.success("User berhasil dihapus.");
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
                    Hapus Akun
                </div>
                <div className="text-sm text-red-600 mt-2 font-normal">
                    Setelah Akun dihapus, tidak dapat digunakan kembali.
                </div>
            </div>
        </DialogHeader>
        <DialogBody>
            Apakah Anda yakin ingin menghapus akun
            <span className="font-semibold">
                {` ${username}?`}
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
            <span> {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Hapus"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}