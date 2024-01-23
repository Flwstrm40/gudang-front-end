'use client';
import { Button, Card, tab } from "@material-tailwind/react";
// import ModalTambahStok from "./ModalTambahStok";
import Search from "../search/Search";
import SortBy from "../sortBy/SortBy";
import Pagination from "../pagination/Pagination";
import { useState, useEffect } from "react";
import { 
  TrashIcon,
  CheckIcon,
  PencilSquareIcon,
  PrinterIcon, 
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


// const TABLE_HEAD = ["Asal", "Tujuan", "Barang", "Qty", ""];
const TABLE_HEAD = ["Item Order", "Qty","Customer", "Jadwal Kirim", ""];

// Function to slice rows based on the active page
const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default function OrderTable() {
    const { data: tableRows, error, mutate } = useSWR(`${process.env.API}/customers`, async (url) => {
      const response = await axios.get(url);
      return response.data.customers;
    });
  
    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");
    const [filteredRows, setFilteredRows] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const cookies = parseCookies();
  
    const role = cookies.role;
  
    useEffect(() => {
      // console.log(tableRows)
      if (!tableRows) return;

      setActivePage(1);
      // Filtering logic based on search input and status === 0
      const filtered = tableRows.filter(({ kode_produk, nama_produk, kuantiti }) =>
        kode_produk.toLowerCase().includes(searchInput.toLowerCase()) ||
        nama_produk.toLowerCase().includes(searchInput.toLowerCase()) ||
        kuantiti.toString().includes(searchInput)
      );

      // console.log(filtered)
  
      // Only include rows with status === 0
      const statusFilteredRows = filtered.filter(({ status_terima }) => status_terima === '0');
      

      // console.log(statusFilteredRows)
      // Sorting logic based on the selected option
      let sortedRows = [...statusFilteredRows];
      if (sortOption === "quantityAsc") {
        sortedRows = sortedRows.sort((a, b) => a.kuantiti - b.kuantiti);
      } else if (sortOption === "quantityDesc") {
        sortedRows = sortedRows.sort((a, b) => b.kuantiti - a.kuantiti);
      } else if (sortOption === "productAsc") {
        sortedRows = sortedRows.sort((a, b) => a.nama_produk.localeCompare(b.nama_produk));
      } else if (sortOption === "productDesc") {
        sortedRows = sortedRows.sort((a, b) => b.nama_produk.localeCompare(a.nama_produk));
      } else if (sortOption === "default") {
        sortedRows = sortedRows.sort((a, b) => a.id_customer - b.id_customer);
      }
  
      setFilteredRows(sortedRows);
    }, [searchInput, tableRows, sortOption]);
  
    if (error) return <p>Error fetching data...</p>;
    if (!tableRows) return <p>Loading...</p>;
  
    // Get the current page of rows based on activePage and pageSize
    const paginatedRows = paginate(filteredRows, activePage, pageSize);

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
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
        <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={"Cari Barang/Asal/Tujuan di sini..."} />
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
                  Tidak ada Pesanan yang masuk.
                </td>
              </tr>
            ) : (
              paginatedRows.map(({ id_customer, jadwal_kirim, id_produk, nama_produk, kode_produk, stok, harga, deskripsi, kuantiti, nama_cust, no_hp, alamat, pembayaran, tanggal_order, sales_jualan }) => (
                <tr key={id_customer} className="even:bg-blue-gray-50/50">
                  {/* <td className="p-3">
                    <div className="font-normal">{asal}</div>
                  </td> */}
                  <td className="p-3">
                    <ModalLihatProduk nama_produk={nama_produk} kode_produk={kode_produk} Stok={stok} Harga={harga} Deskripsi={deskripsi} kuantiti={kuantiti}/>
                  </td>
                  <td className="p-3">
                    <div className="font-normal">{kuantiti}</div>
                  </td>
                  <td className="p-3">
                    <ModalLihatOrderCust nama_cust={nama_cust} no_hp={no_hp} alamat={alamat} sales_jualan={sales_jualan} kuantiti={kuantiti} pembayaran={pembayaran} tanggal_order={formatDate(tanggal_order)} jadwal_kirim={formatDate(jadwal_kirim)} harga={harga}/>
                  </td>
                  <td className="p-3">
                    <div className="font-normal">{formatDate(jadwal_kirim)}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-1 items-center sm:flex-col">
                      {/* <div> */}
                        {/* <ModalTambahStok name={nama_produk} produkId={id_customer} mutate={mutate}/> */}
                        {/* <PencilSquareIcon className="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => toast.success("Berhasil mengedit transfer")}/>
                        <TrashIcon className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => toast.success("Berhasil menghapus transfer")}/> */}
                        <Button onClick={() => handlePrintButton(id_customer)} variant="text" color="blue" size="sm">
                          <PrinterIcon className="h-5 w-5" /> 
                        </Button>
                        {/* <ModalEditTransfer id_customer={id_customer} id_produk={id_produk} id_toko={id_toko} edit_kuantitas={kuantiti} edit_keterangan={keterangan}  mutate={mutate}/> */}
                        {/* <ModalDeleteTransfer id_customer={id_customer} mutate={mutate} nama_produk={nama_produk}/> */}
                        <ModalKonfirmasiOrder nama_cust={nama_cust} mutate={mutate} id_customer={id_customer} nama_produk={nama_produk} id_produk={id_produk} harga={harga}/>
                      {/* </div> */}
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