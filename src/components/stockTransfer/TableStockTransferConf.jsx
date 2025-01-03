'use client';
import { Button, Card, tab } from "@material-tailwind/react";
// import ModalTambahStok from "./ModalTambahStok";
import Search from "../search/Search";
import SortBy from "../sortBy/SortBy";
import Pagination from "../pagination/Pagination";
import { useState, useEffect } from "react";
import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { ModalLihatDetail } from "../inventory/ModalLihatDetail";
import ModalKonfirmasiTransfer from "./ModalKonfirmasiTransfer";
import ModalDeleteTransfer from "./ModalDeleteTransfer";
// import ModalEditStok from "./ModalEditProduk";
// import DialAddProduk from "./DialAddProduk";
import { parseCookies } from "nookies";
import { Toaster, toast } from "sonner";
import useSWR, {mutate} from "swr";
import DialFormTransfer from "./DialFormTransfer";
import ModalEditTransfer from "./ModalEditTransfer";
import { usePathname } from "next/navigation";
import RowsPerPage from "../pagination/RowsPerPage";
import ButtonTooltip from "../tooltip/ButtonTooltip";
import Loading from "../loading/Loading";


// const TABLE_HEAD = ["Asal", "Tujuan", "Barang", "Qty", ""];
const TABLE_HEAD = ["Tujuan", "Produk", "Qty", ""];

// Function to slice rows based on the active page
const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default function TableStockTransfeConf() {
    const { data: tableRows, error, mutate } = useSWR(`${process.env.API}/transfers`, async (url) => {
      const response = await axios.get(url);
      return response.data.transfers;
    });
    
    const { data: totalTransfer } = useSWR(
      `${process.env.API}/transfers/total`,
      async (url) => {
        const response = await axios.get(url);
        return response.data[0];
      }
    );

    const pathname = usePathname();
  
    const [currentPath, setCurrentPath] = useState(pathname);
    const [searchInput, setSearchInput] = useState("");
    const [filteredRows, setFilteredRows] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const cookies = parseCookies();
  
    const role = cookies.role;

    useEffect(() => {
      if (!tableRows) return;

      setActivePage(1);
      // Filtering logic based on search input and status === 0
      const filtered = tableRows.filter(({ nama_toko, nama_produk, asal, kuantitas, kode_produk }) =>
        nama_toko.toLowerCase().includes(searchInput.toLowerCase()) ||
        nama_produk.toLowerCase().includes(searchInput.toLowerCase()) ||
        asal.toLowerCase().includes(searchInput.toLowerCase()) ||
        kuantitas.toString().includes(searchInput) ||
        kode_produk.toLowerCase().includes(searchInput.toLowerCase())
      );
  
      // Only include rows with status === 0
      const statusFilteredRows = filtered.filter(({ status }) => status === 0);
  
      // Sorting logic based on the selected option
      let sortedRows = [...statusFilteredRows];
      if (sortOption === "quantityAsc") {
        sortedRows = sortedRows.sort((a, b) => a.kuantitas - b.kuantitas);
      } else if (sortOption === "quantityDesc") {
        sortedRows = sortedRows.sort((a, b) => b.kuantitas - a.kuantitas);
      } else if (sortOption === "productAsc") {
        sortedRows = sortedRows.sort((a, b) => a.nama_produk.localeCompare(b.nama_produk));
      } else if (sortOption === "productDesc") {
        sortedRows = sortedRows.sort((a, b) => b.nama_produk.localeCompare(a.nama_produk));
      } else if (sortOption === "default") {
        sortedRows = sortedRows.sort((a, b) => b.id_transfer - a.id_transfer);
      }
  
      setFilteredRows(sortedRows);
    }, [searchInput, tableRows, sortOption]);
  
    if (error) return <p>Error fetching data...</p>;
    if (!tableRows) return <Loading />;
    // Get the current page of rows based on activePage and pageSize
    const paginatedRows = paginate(filteredRows, activePage, pageSize);

  return (
    <div>
      <Toaster position="top-right" closeButton={true} richColors={true}/>
      <div className="text-xl flex sm:flex-col gap-4 justify-center mb-5">
        <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={"Cari Poduk/Tujuan/Qty di sini..."} />
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
                        Tidak ada transfer yang sedang dilakukan.
                      </div>
                    </div>
                </td>
              </tr>
            ) : (
              paginatedRows.map(({ id_transfer, id_produk, id_toko, asal, status, nama_toko, nama_produk, kode_produk, stok, harga, deskripsi, kuantitas, keterangan }) => (
                <tr key={id_transfer} className="even:bg-blue-gray-50/50">
                  {/* <td className="p-3">
                    <div className="font-normal">{asal}</div>
                  </td> */}
                  <td className="p-3">
                    <div className="font-normal">
                      <ButtonTooltip content={nama_toko} textButton={nama_toko.length > 20 ? `${nama_toko.substr(0, 20)}...` : nama_toko} />
                    </div>
                  </td>
                  <td className="p-3">
                    <ModalLihatDetail Produk={nama_produk} Kode={kode_produk} Stok={stok} Harga={harga} Deskripsi={deskripsi} pathname={currentPath}/>
                  </td>
                  <td className="p-3">
                    <div className="font-normal">{kuantitas}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-1 items-center">
                        <ModalEditTransfer id_transfer={id_transfer} id_produk={id_produk} id_toko={id_toko} edit_kuantitas={kuantitas} edit_keterangan={keterangan}  mutate={mutate}/>
                        <ModalDeleteTransfer id_transfer={id_transfer} mutate={mutate} nama_produk={nama_produk}/>
                        <ModalKonfirmasiTransfer mutate={mutate} id_transfer={id_transfer} nama_produk={nama_produk} id_produk={id_produk} harga={harga} stok_keluar={kuantitas}  
                                                 asal={asal} keterangan={keterangan} nama_toko={nama_toko} kode_produk={kode_produk} stok={stok} deskripsi={deskripsi}/>
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
          <DialFormTransfer />
        </div>
      </div>
    </div>
  );
}