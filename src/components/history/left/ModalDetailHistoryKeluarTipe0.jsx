import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
 
export default function ModalDetailHistoryKeluarTipe0({stok_keluar, tanggal, jam, keterangan, kode_produk, nama_produk, pj, nama_toko, harga, harga_jual}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const totalHarga = harga_jual? harga_jual * stok_keluar : harga * stok_keluar;

  
 
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
      >
        <DialogHeader>[{kode_produk}] {nama_produk}</DialogHeader>
        <DialogBody>
            <div className="flex gap-5">
                <div>
                    <div>
                        Tanggal (Jam)
                    </div>
                    <div>
                        Stok Keluar
                    </div>
                    <div>
                        Tujuan
                    </div>
                    <div>
                        Total Harga (@Harga)
                    </div>
                    <div>
                        Konfirmator
                    </div>
                    <div>
                        Keterangan
                    </div>
                </div>
                <div>
                    <div>
                        : {tanggal} ({jam} WIB)
                    </div>
                    <div>
                        : {stok_keluar}
                    </div>
                    <div>
                        : {nama_toko}
                    </div>
                    <div>
                      : {formatCurrency(totalHarga)} (@{formatCurrency(harga_jual? harga_jual : harga)})
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
        </DialogFooter>
      </Dialog>
    </>
  );
}