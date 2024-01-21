'use client';
import { Button, Card, tab } from "@material-tailwind/react";
import ModalTambahStok from "./ModalTambahStok";
import Search from "../search/Search";
import SortBy from "../sortBy/SortBy";
import Pagination from "../pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { ModalLihatDetail } from "./ModalLihatDetail";
import ModalEditStok from "./ModalEditProduk";
import DialAddProduk from "./DialAddProduk";
import { parseCookies } from "nookies";
import { Toaster, toast } from "sonner";
import useSWR, {mutate} from "swr";


const TABLE_HEAD = ["Kode", "Produk", "Stok", ""];

// Function to slice rows based on the active page
const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default function TableInventory() {
  const { data: tableRows, error, mutate } = useSWR(`${process.env.API}/products`, async (url) => {
    const response = await axios.get(url);
    return response.data.products;
  });

  const [searchInput, setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [activePage, setActivePage] = useState(1);
  const pageSize = 6; // Number of rows per page
  const cookies = parseCookies();

  const role = cookies.role;


  useEffect(() => {
    if (!tableRows) return;
    // Filtering logic based on search input
    const filtered = tableRows.filter(({ kode_produk, nama_produk, stok }) =>
      kode_produk.toLowerCase().includes(searchInput.toLowerCase()) ||
      nama_produk.toLowerCase().includes(searchInput.toLowerCase()) ||
      stok.toString().includes(searchInput)
    );

    // Sorting logic based on the selected option
    let sortedRows = [...filtered];
    if (sortOption === "quantityAsc") {
      sortedRows = sortedRows.sort((a, b) => a.stok - b.stok);
    } else if (sortOption === "quantityDesc") {
      sortedRows = sortedRows.sort((a, b) => b.stok - a.stok);
    } else if (sortOption === "productAsc") {
      sortedRows = sortedRows.sort((a, b) => a.nama_produk.localeCompare(b.nama_produk));
    } else if (sortOption === "productDesc") {
      sortedRows = sortedRows.sort((a, b) => b.nama_produk.localeCompare(a.nama_produk));
    } else if (sortOption === "default") {
      sortedRows = sortedRows.sort((a, b) => a.id_produk - b.id_produk);
    }

    setFilteredRows(sortedRows);
  }, [searchInput, tableRows, sortOption]);

  if (error) return <p>Error fetching data...</p>;
  if (!tableRows) return <p>Loading...</p>;

  // Get the current page of rows based on activePage and pageSize
  const paginatedRows = paginate(filteredRows, activePage, pageSize);

  return (
    <div>
      <Toaster position="top-right" closeButton={true} richColors={true}/>
      <div className="text-xl flex sm:flex-col gap-4 justify-center mb-5">
        <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={"Cari Produk/Kode di sini..."} />
        <SortBy onChange={(value) => setSortOption(value)} />
      </div>
      <Card className="h-full w-full overflow-auto text-black" shadow={true}>
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
                  Tidak ada Produk yang tersedia.
                </td>
              </tr>
            ) : (
              paginatedRows.map(({ id_produk, kode_produk, nama_produk, stok, harga, deskripsi }) => (
                <tr key={id_produk} className="even:bg-blue-gray-50/50">
                  <td className="p-3">
                    <div className="font-normal">{kode_produk}</div>
                  </td>
                  <td className="px-0 py-3">
                    <ModalLihatDetail Produk={nama_produk} Kode={kode_produk} Stok={stok} Harga={harga} Deskripsi={deskripsi}/>
                  </td>
                  <td className="p-3">
                    <div className="font-normal">{stok}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2 items-center sm:flex-col">
                      <div>
                        <ModalTambahStok name={nama_produk} produkId={id_produk} mutate={mutate}/>
                      </div>
                      { role === "kepala gudang" &&
                      <div>
                        <ModalEditStok nama_produk={nama_produk} kode_produk={kode_produk} harga={harga} deskripsi={deskripsi} id_produk={id_produk} mutate={mutate}/>
                      </div>}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
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
          {role === "kepala gudang" && 
          <DialAddProduk/>}
        </div>
      </div>
    </div>
  );
}