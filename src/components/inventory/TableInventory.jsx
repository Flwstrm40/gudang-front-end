import { Button, Card, div } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import ModalTambahStok from "./ModalTambahStok";
import Search from "../search/Search";
import SortBy from "../sortBy/SortBy";
import { useState } from "react";

const TABLE_HEAD = ["Kode", "Produk", "Stok", ""];
 
const TABLE_ROWS = [
  {
    kode: "K001",
    produk: "Kulkas",
    stok: "21",
  },
  {
    kode: "K002",
    produk: "Lemari 2 Pintu",
    stok: "56",
  },
  {
    kode: "K003",
    produk: "Lemari 3 Pintu",
    stok: "30",
  },
  {
    kode: "K004",
    produk: "Kasur",
    stok: "5",
  },
  {
    kode: "K005",
    produk: "Meja Makan",
    stok: "42",
  },
];
 
export default function TableInventory() {
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
            {TABLE_ROWS.map(({ kode, produk, stok }, index) => (
              <tr key={kode} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <div className="font-normal">
                    {kode}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-normal">
                    {produk}
                  </div>
                </td>
                <td className="p-4">
                      <div className="font-normal">
                          {stok}  
                      </div>
                </td>
                <td className="p-4">
                    <div className="flex justify-center gap-3 items-center sm:flex-col">
                      <div>
                        <ModalTambahStok name={produk} />
                      </div>
                      <div>
                        <Button size="sm" variant="text" color="black">
                          Detail
                        </Button>
                      </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}