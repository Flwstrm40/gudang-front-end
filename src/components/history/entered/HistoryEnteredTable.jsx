'use client';


import { Button, Card, tab } from "@material-tailwind/react";
import Search from "@/components/search/Search";
import Pagination from "@/components/pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import useSWR, {mutate} from "swr";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
// import { isSameDay, isWithinInterval, addDays, addMonths } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import ModalDetailHistoryMasuk from "./ModalDetailHistoryMasuk";
import { constants } from "crypto";
import RowsPerPage from "@/components/pagination/RowsPerPage";
import { Tooltip } from "@material-tailwind/react";

// Function to slice rows based on the active page
const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default function HistoryEnteredTable() {
  const { data: tableRows, error, mutate } = useSWR(`${process.env.API}/inHistories`, async (url) => {
    const response = await axios.get(url);
    return response.data.inHistories;
  });

  const [searchInput, setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [isOpened, setIsOpened] = useState(false);

  const [pageSize, setPageSize] = useState(6);
  const cookies = parseCookies();

  const handleOpen = () => {
    setIsOpened(!isOpened);
  };

  const hanldeReset = () => {
    setDateRange([
      {
        startDate: null,
        endDate: null,
        key: 'selection',
      },  
    ]);
  };

  useEffect(() => {
    if (!tableRows) return;
  
    // console.log("dateRange[0].startDate:", dateRange[0].startDate);
    // console.log("dateRange[0].endDate:", dateRange[0].endDate);
  
    setActivePage(1);
    const filtered = tableRows.filter(({ kode_produk, nama_produk, stok_masuk, pj, tanggal }) => {
      const lowerCasedSearch = searchInput.toLowerCase();
      // console.log("Row:", { kode_produk, nama_produk, stok_masuk, pj, tanggal });
  
      const rowDate = new Date(tanggal);
      // console.log("Row Date:", rowDate);
  
      const isDateInRange = dateRange[0].startDate && dateRange[0].endDate
        ? rowDate >= dateRange[0].startDate && rowDate <= dateRange[0].endDate
        : true;
  
      // console.log("isDateInRange:", isDateInRange);
  
      return (kode_produk.toLowerCase().includes(lowerCasedSearch) ||
        nama_produk.toLowerCase().includes(lowerCasedSearch) ||
        stok_masuk.toString().includes(searchInput) ||
        pj.toLowerCase().includes(lowerCasedSearch) ||
        tanggal.toLowerCase().includes(lowerCasedSearch))
        && isDateInRange;
    });
  
    const sortedRows = filtered.sort((a, b) => new Date(b.id_history_masuk) - new Date(a.id_history_masuk));
    // console.log("filteredRows:", filtered);
    setFilteredRows(sortedRows);
  }, [searchInput, tableRows, dateRange]);
  
  if (error) return <p>Error fetching data...</p>;
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
      <div className="text-xl flex sm:flex-col gap-4 justify-center mb-5">
        <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={"Cari Riwayat Masuk di sini..."} />
        {/* <HistoryFilter onChange={(value) => setSortOption(value)} /> */}
        <Button size="md" variant="filled" className="hover:bg-blue-800" onClick={handleOpen} color="blue">
          Filter
        </Button>
      </div>
      {isOpened && (
        <div className="mb-3 flex justify-center gap-8 items-end xl:flex-col xl:items-center overflow-auto xl:my-auto"> {/* Adjust the margin as needed */}
          <DateRangePicker
            onChange={(ranges) => setDateRange([ranges.selection])}
            ranges={dateRange}
            className="border rounded-lg p-2 bg-white"
          />
          <Button variant="text" color="red" onClick={hanldeReset}>
            Reset
          </Button>
        </div>
      )}
      <div className="h-full w-full overflow-auto text-black">
        <div className="flex flex-col gap-3 mt-4">
          {paginatedRows.length === 0 ? (
            <div className="text-center text-sm text-gray-600 mt-4 py-3 col-span-full">
              Riwayat Tidak Ditemukan.
            </div>
          ) : (
            paginatedRows.map(({ id_history_masuk, id_produk, stok_masuk, tanggal, jam, keterangan, nama_produk, kode_produk, pj }) => (
              <Card key={id_history_masuk} className="border p-4 rounded-md text-sm text-black hover:bg-blue-50 ease-in duration-100" shadow={false}>
                <div className="flex justify-between gap-3">
                  <div className="font-semibold text-md mb-2 cursor-default">
                    <Tooltip
                        content={kode_produk ? `${`[${kode_produk}] ${nama_produk}`}` : `[]`}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        className="text-white bg-blue-700 font-semibold"
                      >
                      {  kode_produk
                            ? `${
                                `[${kode_produk}] ${nama_produk}`.length > 75
                                  ? `${`[${kode_produk}] ${nama_produk}`.substring(0, 75)}...`
                                  : `[${kode_produk}] ${nama_produk}`
                              }`
                            : `${
                                `[]`
                              }`}

                    </Tooltip>
                  </div>
                  <div className="mb-2 text-blue-gray-700">{formatDate(tanggal)}</div>
                </div>
                <div className="text-blue-gray-700 flex flex-col gap-2">
                  <div className="flex justify-start gap-4">
                    <div>
                      <div> Stok Masuk </div>
                      <div> Keterangan </div>
                    </div>
                    <div>
                      <div className="cursor-default">
                      <Tooltip
                                content={stok_masuk ? `${stok_masuk}` : `[]`}
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }}
                                className="text-white bg-blue-500 font-normal"
                              >
                            {
                              stok_masuk 
                                ? `: ${
                                   stok_masuk
                                  }`
                                : `: ${
                                    `[]`
                                  }`
                            }

                          </Tooltip>
                      </div>
                      <div> : {keterangan ? keterangan : "-"} </div>
                    </div>
                  </div>
                  
                  <hr />
                  <div className="flex justify-between gap-3 items-center">
                    <div> {jam} WIB</div>
                    <ModalDetailHistoryMasuk stok_masuk={stok_masuk} tanggal={formatDate(tanggal)} jam={jam} keterangan={keterangan} kode_produk={kode_produk} nama_produk={nama_produk} pj={pj}/>
                  </div>
                  {/* <div>{keterangan}</div> */}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
      <div className="mt-5 justify-start gap-4 flex items-center md:flex-col">
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
    </div>
  );
}