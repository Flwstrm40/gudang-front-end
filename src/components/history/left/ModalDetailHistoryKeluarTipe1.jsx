import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
 
export default function ModalDetailHistoryKeluarTipe1({
  nama_cust,
  no_telp,
  alamat,
  tanggal_order,
  jadwal_kirim,
  total_harga,
  total_dp1,
  metode_bayar_dp1,
  total_dp2,
  metode_bayar_dp2,
  balance_due,
  status_terima,
  kode_produk,
  nama_sales,
  nama_produk,
  harga_per_item_setelah_ppn,
  qty,
  remarks,
  sales_order,
  tanggal,
  jam,
  pj}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

//   const totalHarga = harga_jual? harga_jual * stok_keluar : harga * stok_keluar;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
    return formattedDate;
  };

  const renderItems = () => {
    const products = nama_produk ? nama_produk.split(",") : [];
    const quantities = qty ? qty.split(",") : [];
    const prices = harga_per_item_setelah_ppn ? harga_per_item_setelah_ppn.split(",") : [];
    const remarksArr = remarks ? remarks.split(",") : [];
    const kode = kode_produk ? kode_produk.split(",") : [];

    return products.map((product, index) => (
      <div key={index} className="flex gap-5">
        <div style={{ minWidth: '250px' }}>
          <div>Nama Produk</div>
          <div>Stok Keluar</div>
          {/* <div>Harga per Item</div> */}
          <div>Catatan</div>
        </div>
        <div style={{ minWidth: '300px' }}>
          <div>: [{kode[index]}] {product}</div>
          <div>: {quantities[index]}</div>
          {/* <div>: {formatCurrency(prices[index])}</div> */}
          <div>: {remarksArr[index]}</div>
        <hr className="my-2 border" />
        </div>
      </div>
    ));
  };

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
        size="lg"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="overflow-auto max-h-[90%]"
      >
        <DialogHeader>{`Riwayat Keluar Pesanan [${sales_order}]`} </DialogHeader>
        <DialogBody>
          <div className="flex gap-5">
            <div style={{ minWidth: '250px' }}>
              <div>Tanggal Keluar (Jam)</div>
              <div >Nama Customer</div>
              <div>No. Telepon</div>
              <div>Alamat</div>
              <div>Tanggal Order</div>
              <div>Jadwal Kirim</div>
              <div>Total Harga</div>
              {/* <div>Total DP1</div>
              <div>Metode Pembayaran DP1</div>
              <div>Total DP2</div>
              <div>Metode Pembayaran DP2</div>
              <div>Balance Due</div> */}
              <div>Nama Sales</div>
              <div>Konfirmator</div>
            </div>
            <div style={{ minWidth: '200px' }}>
              <div>: {tanggal} ({jam} WIB)</div>
              <div>: {nama_cust}</div>
              <div>: {no_telp}</div>
              <div>: {alamat}</div>
              <div>: {tanggal_order}</div>
              <div>: {jadwal_kirim}</div>
              <div>: {formatCurrency(total_harga)}</div>
              {/* <div>: {formatCurrency(total_dp1)}</div>
              <div>: {metode_bayar_dp1}</div>
              <div>: {total_dp2 ? formatCurrency(total_dp2) : '-'}</div>
              <div>: {total_dp2 ? metode_bayar_dp2 : '-'}</div>
              <div>: {formatCurrency(balance_due)}</div> */}
              <div>: {nama_sales}</div>
              <div>: {pj}</div>
            </div>
          </div>
          <div className="mt-5">
            <div className="font-semibold">
              Produk Keluar:
            </div>
            {renderItems()}
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