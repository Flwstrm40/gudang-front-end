'use client';


import { Button, Card, tab } from "@material-tailwind/react";
import Search from "@/components/search/Search";
import Pagination from "@/components/pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { Toaster, toast } from "sonner";
import useSWR, {mutate} from "swr";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
// import { isSameDay, isWithinInterval, addDays, addMonths } from 'date-fns';
import { DateRangePicker } from 'react-date-range';


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
  const [activePage, setActivePage] = useState(1);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [isOpened, setIsOpened] = useState(false);

  const pageSize = 6; // Number of rows per page
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
  
    const filtered = tableRows.filter(({ kode_produk, nama_produk, stok_masuk, pj, tanggal }) => {
      const lowerCasedSearch = searchInput.toLowerCase();
      // console.log("Row:", { kode_produk, nama_produk, stok_masuk, pj, tanggal });
  
      const rowDate = new Date(tanggal);
      console.log("Row Date:", rowDate);
  
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
  
    // console.log("filteredRows:", filtered);
    setFilteredRows(filtered);
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
      <Toaster position="top-right" closeButton={true} richColors={true}/>
      <div className="text-xl flex sm:flex-col gap-4 justify-center mb-5">
        <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={"Cari Riwayat di sini..."} />
        {/* <HistoryFilter onChange={(value) => setSortOption(value)} /> */}
        <Button size="md" variant="filled" className="hover:bg-blue-800" onClick={handleOpen} color="blue">
          Filter
        </Button>
      </div>
      {isOpened && (
        <div className="mb-3 flex justify-center gap-8 items-end md:flex-col "> {/* Adjust the margin as needed */}
          <DateRangePicker
            onChange={(ranges) => setDateRange([ranges.selection])}
            ranges={dateRange}
          />
          <Button variant="text" color="blue-gray" onClick={hanldeReset}>
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
              <Card key={id_history_masuk} className="border p-4 rounded-md text-sm text-black" shadow={false}>
                <div className="flex justify-between gap-3">
                  <div className="font-semibold text-md mb-2">[{kode_produk}] {nama_produk}</div>
                  <div className="mb-2 text-blue-gray-700">{formatDate(tanggal)}</div>
                </div>
                <div className="text-blue-gray-700 flex flex-col gap-2">
                  <div> Stok Masuk: {stok_masuk}</div>
                  <div> {pj} </div>
                  <hr />
                  <div className="flex justify-between gap-3 items-center">
                    <div> {jam} WIB</div>
                    <button className="font-semibold hover:bg-blue-gray-50 rounded-md pl-4 p-2">
                      <div className="flex items-center gap-2">
                        <div>
                          Detail 
                        </div>
                        <div>
                          <ChevronRightIcon className="h-4 w-4" />
                        </div>
                      </div>
                    </button>
                  </div>
                  {/* <div>{keterangan}</div> */}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
      <div className="mt-5 justify-end flex items-center">
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