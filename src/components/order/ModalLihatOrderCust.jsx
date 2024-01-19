import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
 
export default function ModalLihatOrderCust({nama_cust, no_hp, alamat, sales_jualan, kuantiti, pembayaran, tanggal_order, jadwal_kirim, harga}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const totalHarga = harga * kuantiti;

  
 
  return (
    <>
       <div className="font-normal">
            <button size="sm" variant="text" color="black" className="hover:bg-blue-gray-100 p-2 rounded-md" onClick={handleOpen}>
                {nama_cust}
            </button>
        </div>
      <Dialog
        open={open}
        size="md"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Detail Order</DialogHeader>
        <DialogBody>
            <div className="flex gap-5">
                <div>
                    <div>
                        Nama Customer
                    </div>
                    <div>
                        No. HP
                    </div>
                    <div>
                        Alamat
                    </div>
                    <div>
                        Total Harga
                    </div>
                    <div>
                        Pembayaran
                    </div>
                    <div>
                        Tanggal Order
                    </div>
                    <div>
                        Jadwal Kirim
                    </div>
                </div>
                <div>
                    <div>
                        : {nama_cust}
                    </div>
                    <div>
                        : {no_hp}
                    </div>
                    <div>
                        : {alamat}
                    </div>
                    <div>
                      : {formatCurrency(totalHarga)} ({kuantiti} x {formatCurrency(harga)})
                    </div>
                    <div>
                        : {pembayaran}
                    </div>
                    <div>
                        : {tanggal_order}
                    </div>
                    <div>
                        : {jadwal_kirim}
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