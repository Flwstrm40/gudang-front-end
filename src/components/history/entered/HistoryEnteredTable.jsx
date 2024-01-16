'use client';


import { Button, Card, tab } from "@material-tailwind/react";
import Search from "@/components/search/Search";
import SortBy from "@/components/sortBy/SortBy";
import Pagination from "@/components/pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { Toaster, toast } from "sonner";
import useSWR, {mutate} from "swr";


const TABLE_HEAD = ["Kode", "Produk", "Stok", ""];

// Function to slice rows based on the active page
const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default function HistoryEnteredTable() {
  const { data: tableRows, error, mutate } = useSWR('http://localhost:5050/inHistories', async (url) => {
    const response = await axios.get(url);
    return response.data.inHistories;
  });

  const [searchInput, setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [activePage, setActivePage] = useState(1);
  const pageSize = 6; // Number of rows per page
  const cookies = parseCookies();

  const role = cookies.role;


//   useEffect(() => {
//     if (!tableRows) return;
//     // Filtering logic based on search input
//     const filtered = tableRows.filter(({ kode_produk, nama_produk, stok }) =>
//       kode_produk.toLowerCase().includes(searchInput.toLowerCase()) ||
//       nama_produk.toLowerCase().includes(searchInput.toLowerCase()) ||
//       stok.toString().includes(searchInput)
//     );

//     // Sorting logic based on the selected option
//     let sortedRows = [...filtered];
//     if (sortOption === "quantityAsc") {
//       sortedRows = sortedRows.sort((a, b) => a.stok - b.stok);
//     } else if (sortOption === "quantityDesc") {
//       sortedRows = sortedRows.sort((a, b) => b.stok - a.stok);
//     } else if (sortOption === "productAsc") {
//       sortedRows = sortedRows.sort((a, b) => a.nama_produk.localeCompare(b.nama_produk));
//     } else if (sortOption === "productDesc") {
//       sortedRows = sortedRows.sort((a, b) => b.nama_produk.localeCompare(a.nama_produk));
//     } else if (sortOption === "default") {
//       sortedRows = sortedRows.sort((a, b) => a.id_produk - b.id_produk);
//     }

//     setFilteredRows(sortedRows);
//   }, [searchInput, tableRows, sortOption]);

//   if (error) return <p>Error fetching data...</p>;
  if (!tableRows) return <p>Loading...</p>;

  // Get the current page of rows based on activePage and pageSize
  const paginatedRows = paginate(filteredRows, activePage, pageSize);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
    return formattedDate;
  };
  

  return (
    <div>
      <Toaster position="top-right" closeButton={true} richColors={true}/>
      <div className="text-xl flex sm:flex-col gap-4 justify-center mb-5">
        <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={"Cari Produk/Kode di sini..."} />
        <SortBy onChange={(value) => setSortOption(value)} />
      </div>
      <div className="h-full w-full overflow-auto text-black">
        <div className="flex flex-col gap-3 p-4">
          {tableRows.length === 0 ? (
            <div className="text-center text-gray-600 mt-4 py-3 text-md col-span-full">
              Tidak ada Produk yang tersedia.
            </div>
          ) : (
            tableRows.map(({ id_history_masuk, id_produk, stok_masuk, tanggal, jam, keterangan }) => (
              <Card key={id_history_masuk} className="border border-blue-500 p-4 rounded-md">
                <div className="font-semibold text-lg mb-2">{id_produk}</div>
                <div className="mb-2">{formatDate(tanggal)}</div>
                <div className="mb-2">{jam}</div>
                <div className="mb-2">{keterangan}</div>
                {/* Tambahkan elemen sesuai kebutuhan */}
              </Card>
            ))
          )}
        </div>
      </div>
      <div className="mt-4 justify-between flex items-center">
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
        </div>
      </div>
    </div>
  );
}