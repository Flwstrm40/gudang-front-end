import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  div,
} from "@material-tailwind/react";
import { InboxIcon } from "@heroicons/react/24/solid";
import { parseCookies } from "nookies";
 
export function ModalLihatProduk({nama_produk, kode_produk, Stok, Harga, Deskripsi, kuantiti}) {
  const [open, setOpen] = React.useState(false);
  const cookies = parseCookies();
  const handleOpen = () => setOpen(!open);
 
  const role = cookies.role;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <>
       <div className="font-normal">
            <button size="sm" variant="text" color="black" className="hover:bg-blue-gray-100 p-2 rounded-md" onClick={handleOpen}>
                [{kode_produk}] {nama_produk}
            </button>
        </div>
        <Dialog open={open} handler={handleOpen}>
            <div>
            <div className="flex justify-between ml-5 mr-5 text-xl my-2 font-semibold text-blue-gray-800">
                <div>
                    {kode_produk}
                </div>
                <div>
                    Sisa Stok: {Stok}
                </div>
            </div>
            </div>
            <DialogBody divider className="grid place-items-center gap-4 text-blue-gray-800">
            <InboxIcon className="h-20 w-20 text-blue-gray-500" />
            <div color="red" className="font-semibold">
                {nama_produk}
            </div>
            <div className="text-center font-normal">
                {Deskripsi}
            </div>
            </DialogBody>
            <div className="flex justify-between my-2 mr-5 items-center ml-5">
                <div>
                {role === "kepala gudang" && 
                <div className="text-lg">
                    {formatCurrency(Harga)}
                </div>}
                </div>
                <div>
                    <Button variant="filled" onClick={handleOpen} color="blue">
                        Tutup
                    </Button>
                </div>
            </div>
        </Dialog>
    </>
  );
}