import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export default function ModalLihatOrderCust({
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
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };


  const renderItems = () => {
    const products = nama_produk.split(",");
    const quantities = qty.split(",");
    const prices = harga_per_item_setelah_ppn.split(",");
    const remarksArr = remarks.split(",");
    const kode = kode_produk.split(",");

    return products.map((product, index) => (
      <div key={index} className="flex gap-5">
        <div style={{ minWidth: '250px' }}>
          <div>Nama Produk</div>
          <div>Jumlah</div>
          <div>Harga per Item</div>
          <div>Catatan</div>
        </div>
        <div style={{ minWidth: '300px' }}>
          <div>: [{kode[index]}] {product}</div>
          <div>: {quantities[index]}</div>
          <div>: {formatCurrency(prices[index])}</div>
          <div>: {remarksArr[index]}</div>
        <hr className="my-2 border" />
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="font-normal">
        <Tooltip
            content="Detail Pesanan"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            className="bg-blue-800 text-blue-gray-50"
        >
          <Button size="sm" variant="text" color="blue" className="p-2" onClick={handleOpen}>
            <DocumentTextIcon className="h-6 w-6 text-blue-500 cursor-pointer" />
          </Button>
        </Tooltip>
      </div>
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
        <DialogHeader>{`Detail Pesanan [${sales_order}]`} </DialogHeader>
        <DialogBody>
          <div className="flex gap-5">
            <div style={{ minWidth: '250px' }}>
              <div >Nama Customer</div>
              <div>No. Telepon</div>
              <div>Alamat</div>
              <div>Tanggal Order</div>
              <div>Jadwal Kirim</div>
              <div>Total Harga</div>
              <div>Total DP1</div>
              <div>Metode Pembayaran DP1</div>
              <div>Total DP2</div>
              <div>Metode Pembayaran DP2</div>
              <div>Balance Due</div>
              <div>Nama Sales</div>
            </div>
            <div style={{ minWidth: '200px' }}>
              <div>: {nama_cust}</div>
              <div>: {no_telp}</div>
              <div>: {alamat}</div>
              <div>: {tanggal_order}</div>
              <div>: {jadwal_kirim}</div>
              <div>: {formatCurrency(total_harga)}</div>
              <div>: {formatCurrency(total_dp1)}</div>
              <div>: {metode_bayar_dp1}</div>
              <div>: {total_dp2 ? formatCurrency(total_dp2) : '-'}</div>
              <div>: {total_dp2 ? metode_bayar_dp2 : '-'}</div>
              <div>: {formatCurrency(balance_due)}</div>
              <div>: {nama_sales}</div>
            </div>
          </div>
          <div className="mt-5">
            <div className="font-semibold">
              Produk:
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
