'use client';
import { Button, Card } from "@material-tailwind/react";
import ModalTambahStok from "./ModalTambahStok";
import Search from "../search/Search";
import SortBy from "../sortBy/SortBy";
import Pagination from "../pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { ModalLihatDetail } from "./ModalLihatDetail";

const TABLE_HEAD = ["Kode", "Produk", "Stok", ""];

export default function TableInventory() {
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/products');
        setTableRows(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [tableRows]); 

  if (isLoading) return <p>Loading...</p>
  // if (!tableRows || tableRows.length === 0) return <p>No product data</p>

  console.log("tableRows", tableRows)

  return (
    <div>
      <div className="text-xl flex sm:flex-col gap-4 justify-center mb-5">
          <Search />
          <SortBy />
      </div>
      <Card className="h-full w-full overflow-auto text-black">
        <table className="w-full min-w-max table-auto text-center text-sm">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-500 p-4 ">
                  <div
                    className="font-normal leading-none text-white"
                  >
                    {head}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ id_produk, kode_produk, nama_produk, stok, harga, deskripsi }) => (
              <tr key={id_produk} className="even:bg-blue-gray-50/50">
                <td className="p-3">
                  <div className="font-normal">
                    {kode_produk}
                  </div>
                </td>
                <td className="px-0 py-3">
                 <ModalLihatDetail Produk={nama_produk} Kode={kode_produk} Stok={stok} Harga={harga} Deskripsi={deskripsi}/>
                </td>
                <td className="p-3">
                      <div className="font-normal">
                          {stok}  
                      </div>
                </td>
                <td className="p-3">
                    <div className="flex justify-center gap-3 items-center sm:flex-col">
                      <div>
                        <ModalTambahStok name={nama_produk} produkId={id_produk}/>
                      </div>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="mt-5 flex justify-end">
          <Pagination />
        </div>
    </div>
  );
}
