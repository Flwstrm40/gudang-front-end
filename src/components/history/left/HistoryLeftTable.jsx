'use client';


import { Button, Card, tab } from "@material-tailwind/react";
import Search from "@/components/search/Search";
import Pagination from "@/components/pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import useSWR, {mutate} from "swr";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
// import { isSameDay, isWithinInterval, addDays, addMonths } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
// import ModalDetailHistoryMasuk from "./ModalDetailHistoryMasuk";
import RadioFilterType from "./RadioFilterType";
import { set } from "date-fns";
import ModalDetailHistoryKeluar from "./ModalDetailHistoryKeluar";

// tipe 0 = id_customernya null, tipe 1 = id_transfernya null

// Function to slice rows based on the active page
const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default function HistoryLeftTable() {
  const { data: tableRows, error, mutate } = useSWR('http://localhost:5050/outHistories', async (url) => {
    const response = await axios.get(url);
    return response.data.outHistories;
  });

  const [searchInput, setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [radio, setRadio] = useState("all");
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
    setRadio("all");

    // Uncheck radio button by updating the checked status
  const radioAll = document.getElementById("radio-type-all");
  if (radioAll) {
    radioAll.checked = true;
  }
  };

  const handleTypeChange = (value) => {
    setRadio(value);
  };

  useEffect(() => {
    if (!tableRows) return;

    const filtered = tableRows.filter(({ kode_produk, nama_produk, kuantitas, nama_cust, nama_toko, kuantiti, tanggal, tipe, jam }) => {
      const lowerCasedSearch = searchInput.toLowerCase();
      const rowDate = new Date(tanggal);

      const isDateInRange = dateRange[0].startDate && dateRange[0].endDate
        ? rowDate >= dateRange[0].startDate && rowDate <= dateRange[0].endDate
        : true;

    const isTypeMatch = radio === "all" ? true : tipe == radio;

      return (kode_produk.toLowerCase().includes(lowerCasedSearch) ||
        nama_produk.toLowerCase().includes(lowerCasedSearch) ||
        kuantitas?.toString().includes(searchInput) ||
        kuantiti?.toString().includes(lowerCasedSearch) ||
        nama_cust?.toLowerCase().includes(lowerCasedSearch) ||
        nama_toko?.toLowerCase().includes(lowerCasedSearch) ||
        tanggal.toLowerCase().includes(lowerCasedSearch))
        && isDateInRange && isTypeMatch
    });

    const sortedRows = filtered.sort((a, b) => new Date(b.id_history_keluar) - new Date(a.id_history_keluar));

    setFilteredRows(sortedRows);
  }, [searchInput, tableRows, dateRange, radio]);

  
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
        <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={"Cari Riwayat di sini..."} />
        {/* <HistoryFilter onChange={(value) => setSortOption(value)} /> */}
        <Button size="md" variant="filled" className="hover:bg-blue-800" onClick={handleOpen} color="blue">
          Filter
        </Button>
      </div>
      {isOpened && (
        <div className="mb-3 flex justify-center gap-8 xl:flex-col xl:items-center "> {/* Adjust the margin as needed */}
          <DateRangePicker
            onChange={(ranges) => setDateRange([ranges.selection])}
            ranges={dateRange}
          />
          <div className="flex flex-col justify-between items-start xl:items-center">
            <RadioFilterType onChange={handleTypeChange}/>
            <Button variant="text" color="red" onClick={hanldeReset}>
                Reset
            </Button>
          </div>
        </div>
      )}
      <div className="h-full w-full overflow-auto text-black">
        <div className="flex flex-col gap-3 mt-4">
          {paginatedRows.length === 0 ? (
            <div className="text-center text-sm text-gray-600 mt-4 py-3 col-span-full">
              Riwayat Tidak Ditemukan.
            </div>
          ) : (
            paginatedRows.map(({ id_history_keluar, id_produk, tipe, kuantitas, kuantiti, tanggal, jam, keterangan, nama_produk, kode_produk, pj, nama_cust, nama_toko }) => (
              <Card key={id_history_keluar} className="border p-4 rounded-md text-sm text-black" shadow={false}>
                <div className="flex justify-between gap-3">
                  <div className="font-semibold text-md mb-2">[{kode_produk}] {nama_produk}</div>
                  <div className="mb-2 text-blue-gray-700">{formatDate(tanggal)}</div>
                </div>
                <div className="text-blue-gray-700 flex flex-col gap-2">
                    <div className="flex justify-start gap-3">
                        <div>
                        <div> Stok Keluar </div>
                        <div> Cust/Tujuan </div>
                        </div>
                        <div>
                        <div> : {tipe === 1? kuantiti: kuantitas}</div>
                        <div> : {tipe === 1? nama_cust: nama_toko} </div>
                        </div>
                    </div>
                  <hr />
                  <div className="flex justify-between gap-3 items-center">
                    <div> {jam} WIB</div>
                    <ModalDetailHistoryKeluar stok_keluar={tipe === 1? kuantiti: kuantitas} tanggal={formatDate(tanggal)} jam={jam} keterangan={keterangan} kode_produk={kode_produk} nama_produk={nama_produk} pj={pj}/>
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