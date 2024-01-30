import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import { InboxIcon } from "@heroicons/react/24/solid";
import { parseCookies } from "nookies";
 
export function ModalLihatDetail({Produk, Kode, Stok, Harga, Deskripsi, pathname}) {
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
        {pathname === "/stockTransfer"?
            <Tooltip 
                content= {<>[{Kode}] {Produk}</>}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}
                className="bg-blue-gray-900 text-blue-gray-50"
            >
                <button className="hover:bg-blue-gray-100 p-2 rounded-md" onClick={handleOpen}>
                    [{Kode}] {Produk ? (Produk.length > 20 ? Produk.substr(0, 18) + "..." : Produk) : ""}
                </button>
            </Tooltip>
            :  
            <Tooltip 
                content={<>{Produk}</>}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}
                className="bg-blue-gray-900 text-blue-gray-50"
            >
                <button size="sm" variant="text" color="black" className="hover:bg-blue-gray-100 p-2 rounded-md" onClick={handleOpen}>
                {Produk ? (Produk.length > 50 ? Produk.substr(0, 50) + "..." : Produk) : ""}
                </button>
            </Tooltip>
         }
        </div>
        <Dialog open={open} handler={handleOpen} className="overflow-auto max-h-[90%]">
            <div>
            <div className="flex justify-between ml-5 mr-5 text-xl my-2 font-semibold text-blue-gray-800">
                <div>
                    {Kode}
                </div>
                <div>
                    Sisa Stok: {Stok}
                </div>
            </div>
            </div>
            <DialogBody divider className="grid place-items-center gap-4 text-blue-gray-800">
            <InboxIcon className="h-20 w-20 text-blue-gray-500" />
            <div color="red" className="font-semibold">
                {Produk}
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