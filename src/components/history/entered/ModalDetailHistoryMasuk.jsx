import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
 
export default function ModalDetailHistoryMasuk({stok_masuk, tanggal, jam, keterangan, kode_produk, nama_produk, pj}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
        <button className="font-semibold hover:bg-blue-500 rounded-md pl-4 p-2 ease-in duration-200 hover:text-white" onClick={handleOpen}>
            <div className="flex items-center gap-2">
                <div>
                    Detail 
                </div>
                <div>
                    <ChevronRightIcon className="h-4 w-4" />
                </div>
            </div>
        </button>
      <Dialog
        open={open}
        size="md"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="overflow-auto max-h-[90%]"
      >
        <DialogHeader>[{kode_produk}] {nama_produk}</DialogHeader>
        <DialogBody>
            <div className="flex gap-5">
                <div style={{ minWidth: '150px' }}>
                    <div>
                        Tanggal (Jam)
                    </div>
                    <div>
                        Stok Masuk
                    </div>
                    <div>
                        Konfirmator
                    </div>
                    <div>
                        Keterangan
                    </div>
                </div>
                <div style={{ minWidth: '250px' }}>
                    <div>
                        : {tanggal} ({jam} WIB)
                    </div>
                    <div>
                        : {stok_masuk}
                    </div>
                    <div>
                        : {pj}
                    </div>
                    <div>
                        : {keterangan? keterangan : "-"}
                    </div>
                </div>
            </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Tutup</span>
          </Button>
          {/* <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  );
}