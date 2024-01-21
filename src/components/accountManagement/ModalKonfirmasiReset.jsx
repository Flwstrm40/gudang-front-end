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
    KeyIcon
} from "@heroicons/react/24/solid";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { parseCookies } from "nookies";
 
export default function ModalKonfirmasiReset({id, username}) {
  const [open, setOpen] = React.useState(false);
  const cookies = parseCookies();
  const role = cookies.role;

  const handleOpen = () => setOpen(!open);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const resetPasswordRes = await axios.put(`${process.env.API}/user/reset-password/${id}`, {
          password: "admin"
        });
    
        if (resetPasswordRes.status === 200) {
          toast.success("Password berhasil direset.");
          handleOpen();
        } else {
          toast.error("Gagal mereset password.");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan, gagal mereset password.");
        console.error(error);
      }
  };
  


  return (
    <>
     <Button color="red" variant="text" className="py-2 px-4" onClick={handleOpen}>
            <KeyIcon className="h-5 w-5"/>
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
                    Konfirmasi Reset
                </div>
            </div>
        </DialogHeader>
        <DialogBody>
            Password 
            <span className="font-semibold">{` ${username}`} </span>
            akan direset menjadi "
            <span className="font-semibold">admin</span>
            ". Apakah anda yakin?
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