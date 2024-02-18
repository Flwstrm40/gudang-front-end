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
 
export default function ModalDeleteProfPic({mutate, id_user}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleOpen = () => setOpen(!open);
 
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.delete(`${process.env.API}/user/${id_user}/delete-profile-photo`);

      if (res.status === 200) {
        toast.success("Foto profil berhasil dihapus.");
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
        <Button onClick={handleOpen}  color="red" size="md" className="shadow-none">
            <div className="flex gap-2 items-center justify-center">
                <div>
                    <TrashIcon className="h-5 w-5" /> 
                </div>
                <div>
                    Hapus Foto
                </div>
            </div>
        </Button>
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
                    Hapus Foto Profil
                </div>
            </div>
        </DialogHeader>
        <DialogBody>
            Apakah Anda yakin ingin menghapus foto profil?
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