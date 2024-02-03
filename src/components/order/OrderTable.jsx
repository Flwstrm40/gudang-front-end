'use client';
import { Button, Card, tab } from "@material-tailwind/react";
// import ModalTambahStok from "./ModalTambahStok";
import Search from "../search/Search";
import SortBy from "../sortBy/SortBy";
import Pagination from "../pagination/Pagination";
import { useState, useEffect } from "react";
import { 
  ShoppingCartIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { parseCookies } from "nookies";
import { Toaster, toast } from "sonner";
import useSWR, {mutate} from "swr";
import { ModalLihatProduk } from "./ModalLihatProduk";
import ModalLihatOrderCust from "./ModalLihatOrderCust";
import ModalKonfirmasiOrder from "./ModalKonfirmasiOrder";
import { useRouter } from "next/navigation";
import RowsPerPage from "../pagination/RowsPerPage";
import ButtonTooltip from "../tooltip/ButtonTooltip";


// const TABLE_HEAD = ["Asal", "Tujuan", "Barang", "Qty", ""];
const TABLE_HEAD = ["Item(s) Order", "Qty","Customer", "Jadwal Kirim", ""];

// Function to slice rows based on the active page
const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default function OrderTable() {
  const { data: orders, error, mutate } = useSWR(`${process.env.API}/orders/details`, async (url) => {
    const response = await axios.get(url);
    return response.data;
  });

    // console.log(orders)
  
    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");
    const [filteredRows, setFilteredRows] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const cookies = parseCookies();
  
    const role = cookies.role;
  
    useEffect(() => {
      if (!orders) return;
  
      setActivePage(1);
      const filtered = orders.filter(({ nama_produk, kode_produk, qty, nama_cust, jadwal_kirim }) =>
        kode_produk.toLowerCase().includes(searchInput.toLowerCase()) ||
        nama_produk.toLowerCase().includes(searchInput.toLowerCase()) ||
        nama_cust.toLowerCase().includes(searchInput.toLowerCase()) ||
        qty.toString().includes(searchInput)
      );
  
      const statusFilteredRows = filtered.filter(({ status_terima }) => status_terima === 0);
  
      let sortedRows = [...statusFilteredRows];
      if (sortOption === "quantityAsc") {
        sortedRows = sortedRows.sort((a, b) => a.qty - b.qty);
      } else if (sortOption === "quantityDesc") {
        sortedRows = sortedRows.sort((a, b) => b.qty - a.qty);
      } else if (sortOption === "productAsc") {
        sortedRows = sortedRows.sort((a, b) => a.nama_produk.localeCompare(b.nama_produk));
      } else if (sortOption === "productDesc") {
        sortedRows = sortedRows.sort((a, b) => b.nama_produk.localeCompare(a.nama_produk));
      } else if (sortOption === "default") {
        sortedRows = sortedRows.sort((a, b) => a.order_id - b.order_id);
      }
  
      setFilteredRows(sortedRows);
    }, [searchInput, orders, sortOption]);

    // console.log(filteredRows)
  
    if (error) return <p>Error fetching data...</p>;
    if (!orders) return <p>Loading...</p>;
  
    // Get the current page of rows based on activePage and pageSize
    const paginatedRows = paginate(filteredRows, activePage, pageSize);

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
      return formattedDate;
    };

    const formatDate2 = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
      return formattedDate;
    };
    
    const handlePrintButton = (id_customer) => {
      window.open(`/printDO/${id_customer}`, '_blank');
    };

    return (
      <div>
        <Toaster position="top-right" closeButton={true} richColors={true}/>
        <div className="text-xl flex sm:flex-col gap-4 justify-center mb-5">
          <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={"Cari Item/Qty/Customer di sini..."} />
          <SortBy onChange={(value) => setSortOption(value)} />
        </div>
        <Card className="h-full w-full overflow-auto text-black">
          <table className="w-full min-w-max table-auto text-center text-sm">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-500 p-4 ">
                    <div className="font-normal leading-none text-white">
                      {head}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="text-center text-gray-600 mt-4 py-3 text-md">
                    <div className="flex flex-col gap-5 items-center">
                      <div>
                        <XCircleIcon className="h-52 w-h-52 text-blue-gray-500" />
                      </div>
                      <div className="text-base">
                        Tidak ada Pesanan yang masuk.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedRows.map(({ order_id, jadwal_kirim, kode_produk, nama_produk, qty, harga_per_item_setelah_ppn, nama_cust, no_telp, alamat, total_harga, total_dp1, metode_bayar_dp1, total_dp2, metode_bayar_dp2, balance_due, status_terima, remarks, tanggal_order, nama_sales, sales_order }) => (
                  <tr key={order_id} className="even:bg-blue-gray-50/50">
                    <td className="p-3">
                      <div className="font-normal">
                        <ButtonTooltip
                          content={nama_produk.replace(/,/g, '; ')}
                          textButton={
                            nama_produk.replace(/,/g, '; ').length > 30
                              ? `${nama_produk.replace(/,/g, '; ').substr(0, 30)}...`
                              : nama_produk.replace(/,/g, '; ')
                          }
                        />
                      </div>
                    </td>


                    <td className="p-3">
                      <div className="font-normal">
                        <ButtonTooltip content={qty.replace(/,/g, '; ')} textButton={qty.replace(/,/g, '; ').length > 10 ? `${qty.replace(/,/g, '; ').substr(0, 30)}...` : qty.replace(/,/g, '; ')} />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-normal">{nama_cust}</div>
                      {/* <ModalLihatOrderCust nama_cust={nama_cust} no_hp={no_hp} alamat={alamat} sales_jualan={sales_jualan} kuantiti={qty} pembayaran={pembayaran} tanggal_order={formatDate(tanggal_order)} jadwal_kirim={formatDate(jadwal_kirim)} harga={harga}/> */}
                    </td>
                    <td className="p-3">
                      <div className="font-normal">{formatDate(jadwal_kirim)}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-1 items-center sm:flex-col">
                        {/* <DocumentTextIcon className="h-6 w-6 text-blue-500 cursor-pointer" onClick={() => router.push(`/order/${order_id}`)}/> */}
                        <ModalLihatOrderCust  nama_cust={nama_cust} no_telp={no_telp} alamat={alamat} tanggal_order={formatDate2(tanggal_order)} 
                                              jadwal_kirim={formatDate2(jadwal_kirim)} total_harga={total_harga} total_dp1={total_dp1} 
                                              metode_bayar_dp1={metode_bayar_dp1} total_dp2={total_dp2} metode_bayar_dp2={metode_bayar_dp2} balance_due={balance_due} 
                                              status_terima={status_terima} kode_produk={kode_produk} nama_produk={nama_produk} nama_sales={nama_sales}
                                              harga_per_item_setelah_ppn={harga_per_item_setelah_ppn} qty={qty} remarks={remarks} sales_order={sales_order} />
                        <ModalKonfirmasiOrder order_id={order_id} nama_cust={nama_cust} no_telp={no_telp} alamat={alamat} tanggal_order={tanggal_order} 
                                              jadwal_kirim={jadwal_kirim} total_dp1={total_dp1} metode_bayar_dp1={metode_bayar_dp1} total_dp2={total_dp2} 
                                              metode_bayar_dp2={metode_bayar_dp2} balance_due={balance_due} status_terima={status_terima} 
                                              kode_produk={kode_produk} nama_produk={nama_produk} nama_sales={nama_sales} total_harga={total_harga}
                                              harga_per_item_setelah_ppn={harga_per_item_setelah_ppn} qty={qty} remarks={remarks} mutate={mutate} sales_order={sales_order}/>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
        <div className="mt-4 justify-between flex items-center">
          <div className="flex justify-start gap-4 items-center md:flex-col">
              <div>
                {filteredRows.length > 0 && (
                  <Pagination
                  activePage={activePage}
                  pageCount={Math.ceil(filteredRows.length / pageSize)}
                  onPageChange={(pageNumber) => setActivePage(pageNumber)}
                  />
                  )}     
              </div>
              <div>
                {filteredRows.length > 0 && (
                  <RowsPerPage pageSize={pageSize} setPageSize={setPageSize} setActivePage={setActivePage}/>
                  )}
              </div>
          </div>
          <div>
            {/* <DialFormTransfer /> */}
          </div>
        </div>
      </div>
    );
  }