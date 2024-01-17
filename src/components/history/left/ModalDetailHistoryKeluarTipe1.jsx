import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
 
export default function ModalDetailHistoryKeluarTipe1({stok_keluar, tanggal, jam, keterangan, kode_produk, nama_produk, pj, harga, nama_cust, no_hp, alamat, pembayaran, tanggal_order, jadwal_kirim}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const totalHarga = harga * stok_keluar;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
    return formattedDate;
  };

  return (
    <>
        <button className="font-semibold hover:bg-blue-gray-50 rounded-md pl-4 p-2" onClick={handleOpen}>
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
                    <div className="font-semibold">
                        Produk Keluar
                    </div>
                    <div>
                        Tanggal (Jam)
                    </div>
                    <div>
                        Stok Keluar
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

                    <div className="mt-5 font-semibold">
                        Identitas Pembeli
                    </div>
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
                            Pembayaran
                        </div>
                        <div>
                            Tanggal Order
                        </div>
                        <div>
                            Jadwal Kirim
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        {<br/>}
                    </div>
                    <div>
                        : {tanggal} ({jam} WIB)
                    </div>
                    <div>
                        : {stok_keluar}
                    </div>
                    <div>
                        : {formatCurrency(totalHarga)} (@{formatCurrency(harga)})
                    </div>
                    <div>
                        : {pj}
                    </div>
                    <div>
                        : {keterangan? keterangan : "-"}
                    </div>
                    <div>
                        <div className="mt-5">
                            {<br/>}
                        </div>
                        <div>
                            : {nama_cust}
                        </div>
                        <div>
                            : {no_hp? no_hp : "-"}
                        </div>
                        <div>
                            : {alamat}
                        </div>
                        <div>
                            : {pembayaran}
                        </div>
                        <div>
                            : {formatDate(tanggal_order)}
                        </div>
                        <div>
                            : {jadwal_kirim? formatDate(jadwal_kirim) : "-"}
                        </div>
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