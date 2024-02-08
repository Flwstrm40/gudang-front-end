import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import axios from "axios";
 
export default function ModalEditStore({id_toko, nama_toko, mutate}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  const [isChevronRotated, setIsChevronRotated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toko, setToko] = useState({
      nama_toko: nama_toko
  });
  
  
  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!toko.nama_toko) {
          toast.error("Harap isi kolom Nama Toko.");
          return;
      }
      
      setIsLoading(true);
      try {
        const response = await axios.put(`${process.env.API}/stores/${id_toko}`, toko);
  
        if (response.status === 200) {
          // Handle success, maybe redirect to inventory page
          toast.success("Toko berhasil diedit");
          mutate();
          setIsLoading(false);
          handleOpen();
        } else {
          // Handle error
          toast.error("Gagal mengedit Toko");
          setIsLoading(false);
          handleOpen();
          console.error("Failed to edit Store");
        }
      } catch (error) {           
          toast.error("Gagal mengedit Toko");
          setIsLoading(false);
          handleOpen();
          console.error("Error:", error);
      }
    };
  
    const handleChange = (e, field) => {
      const { value } = e.target;
  
      setToko((prevProduct) => ({
        ...prevProduct,
        [field]: value,
      }));
    };

  return (
    <>
      <Tooltip
          content="Edit Toko"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          className="bg-blue-800 text-blue-gray-50"
      >
        <Button onClick={handleOpen} variant="text" size="sm" color="blue">
          <PencilSquareIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Dialog open={open} size="lg" handler={handleOpen} className="overflow-auto max-h-[90%]">
        <DialogBody>
        <form className="mb-2 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <div className="font-semibold text-xl text-black">
                  Edit Toko
                </div>
                <div className="mt-1 font-normal text-sm text-blue-gray-600">
                  Edit Nama Toko
                </div>
              </div>
            <div className="mb-1 flex flex-col gap-6 mt-10">
                    <div className="-mb-3">
                        Nama Toko (*)
                    </div>
                    <Input 
                        type="text"
                        className=" !border-t-blue-gray-200 focus:!border-gray-700"
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                        value={toko.nama_toko}
                        onChange={(e) => handleChange(e, "nama_toko")}
                    />
            </div>
            <div className="mt-7 text-xs text-red-800">
                (*) Wajib diisi
            </div>
            <Button className="mt-3" fullWidth color="blue" type="submit">
                {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Simpan"}
            </Button>

            </form>
        </DialogBody>
      </Dialog>
    </>
  );
}