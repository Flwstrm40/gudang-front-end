import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { 
    CheckIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { parseCookies } from "nookies";
import { Tooltip } from "@material-tailwind/react";
import { set } from "date-fns";

 
export default function ModalKonfirmasiOrder({
  mutate, 
  order_id,
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
  const [loading, setLoading] = React.useState(false);
  const cookies = parseCookies();
  const role = cookies.role;

  const handleOpen = () => setOpen(!open);
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const customerRes = await axios.put(`${process.env.API}/customers/${id_customer}`, {
  //       status_terima: '1',
  //     });
  
  //     if (customerRes.status === 200) {
  //       // Post data to outHistories
  //       const outHistoriesRes = await axios.post(`${process.env.API}/outHistories`, {
  //         id_produk: id_produk,
  //         harga_jual: harga,
  //         tanggal: new Date().toISOString().split('T')[0], // Today's date
  //         jam: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'}), // Current time
  //         tipe: 1,
  //         pj: role,
  //         id_customer: id_customer,
  //       });
  
  //       if (outHistoriesRes.status === 200) {
  //         toast.success("Order berhasil dikonfirmasi.");
  //         mutate();
  //         handleOpen();
  //       } else {
  //         toast.error("Gagal menambahkan data ke riwayat keluar.");
  //       }
  //     } else {
  //       toast.error("Gagal mengkonfirmasi Order.");
  //     }
  //   } catch (error) {
  //     toast.error("Terjadi kesalahan.");
  //     console.log(error);
  //   }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // change qty from string to array of integers
      const qtyArray = qty.split(',').map(qty => parseInt(qty.trim(), 10));
      const totalQty = qtyArray.reduce((total, qty) => total + qty, 0);

      // const orderRes = await axios.put(`${process.env.API}/orders/${order_id}`, {
      //   status_terima: 1,
      // });

      const orderRes = await axios.put(`${process.env.API2}/setDelivered/${sales_order}`, {
        status: 1,
      });
  
      if (orderRes.status === 200) {
        // add 1 day to tanggal_order and jadwal_kirim
        const newTanggalOrder = new Date(tanggal_order);
        newTanggalOrder.setDate(newTanggalOrder.getDate() + 1); 
  
        const newJadwalKirim = new Date(jadwal_kirim);
        newJadwalKirim.setDate(newJadwalKirim.getDate() + 1); 
  
        // Post data to orderHistories
        const orderHistoryData = {
          order_histories_id: order_id,
          sales_order: sales_order,
          nama_cust: nama_cust,
          no_telp: no_telp,
          alamat: alamat,
          nama_sales: nama_sales,
          tanggal_order: newTanggalOrder.toISOString().split('T')[0], // Format tanggal ISO tanpa waktu
          jadwal_kirim: newJadwalKirim.toISOString().split('T')[0], // Format tanggal ISO tanpa waktu
          total_dp1: total_dp1,
          metode_bayar_dp1: metode_bayar_dp1,
          total_dp2: total_dp2,
          metode_bayar_dp2: metode_bayar_dp2,
          balance_due: balance_due,
          status_terima: 1,
          kode_produk: kode_produk,
          nama_produk: nama_produk,
          harga_per_item_setelah_ppn: harga_per_item_setelah_ppn,
          qty: qty,
          remarks: remarks,
        };
  
        const orderHistoryRes = await axios.post(`${process.env.API}/orderHistories`, orderHistoryData);
  
        if (orderHistoryRes.status === 200) {
          // Post data to outHistories
          const outHistoryData = {
            harga_jual: total_harga, 
            tanggal: new Date().toISOString().split('T')[0], // Today's date
            jam: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'}), // Current time
            stok_keluar: totalQty,
            tipe: 1,
            pj: role,
            order_id: order_id, // Pastikan id_customer sesuai dengan yang Anda perlukan
          };
  
          const outHistoriesRes = await axios.post(`${process.env.API}/outHistories`, outHistoryData);
          if (outHistoriesRes.status === 200) {
            toast.success("Order berhasil dikonfirmasi.");
            setLoading(false);
            } else {
            toast.error("Gagal menambahkan data ke riwayat keluar.");
            setLoading(false);
          }
        } else {
            toast.error("Gagal menambahkan data ke riwayat pesanan.");
            setLoading(false);
        }
      } else {
        toast.error("Gagal mengkonfirmasi Order.");
        setLoading(false);
      }
      mutate();
      handleOpen();
    } catch (error) {
      toast.error("Terjadi kesalahan, silakan coba lagi nanti.");
      setLoading(false);
      console.log(error);
    }
  };
  


  return (
    <>
      <Tooltip
            content="Konfirmasi Pesanan"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            className="bg-green-800 text-blue-gray-50"
        >
          <Button onClick={handleOpen} variant="text" color="green" size="sm" className="p-2">
            <CheckIcon className="h-5 w-5" /> 
          </Button>
        </Tooltip>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="overflow-auto max-h-[90%]"
      >
        <DialogHeader>
            <div className="flex flex-col">
                <div>
                    Konfirmasi Order
                </div>
                <div className="text-sm text-red-600 mt-2 font-normal">
                    Setelah dikonfirmasi, tidak dapat dilakukan pengeditan lagi.
                </div>
            </div>
        </DialogHeader>
        <DialogBody>
            Apakah produk 
             <span className="font-semibold">
                  {` ${nama_produk} `}
             </span>
             sudah sampai ke
             <span className="font-semibold">
                  {` ${nama_cust} `}
             </span>
             ?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Batalkan</span>
          </Button>
          <Button variant="filled" color="green" onClick={handleSubmit} disabled={loading ? true : false}>
            <span>{loading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Konfirmasi"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}