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
// import ModalDetailHistoryMasuk from "./ModalDetailHistoryMasuk";
import RadioFilterType from "./RadioFilterType";
import { set } from "date-fns";
import ModalDetailHistoryKeluarTipe0 from "./ModalDetailHistoryKeluarTipe0";
import ModalDetailHistoryKeluarTipe1 from "./ModalDetailHistoryKeluarTipe1";
import RowsPerPage from "@/components/pagination/RowsPerPage";
import { Tooltip } from "@material-tailwind/react";


// Function to slice rows based on the active page
const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default function HistoryLeftTable() {
  const { data: tableRows, error, mutate } = useSWR(`${process.env.API}/outHistories`, async (url) => {
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

  const formatDate2 = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
    return formattedDate;
  };

  useEffect(() => {
    if (!tableRows) return;

    setActivePage(1);
    const filtered = tableRows.filter(({ s_kode_produk, s_nama_produk, kuantitas, nama_cust, nama_toko, kuantiti, s_tanggal, s_tipe, s_jam }) => {
      const lowerCasedSearch = searchInput.toLowerCase();
      const rowDate = new Date(s_tanggal);

      const isDateInRange = dateRange[0].startDate && dateRange[0].endDate
        ? rowDate >= dateRange[0].startDate && rowDate <= dateRange[0].endDate
        : true;

    const isTypeMatch = radio === "all" ? true : s_tipe == radio;

      return (s_kode_produk?.toLowerCase().includes(lowerCasedSearch) ||
        s_nama_produk?.toLowerCase().includes(lowerCasedSearch) ||
        kuantitas?.toString().includes(searchInput) ||
        kuantiti?.toString().includes(lowerCasedSearch) ||
        nama_cust?.toLowerCase().includes(lowerCasedSearch) ||
        nama_toko?.toLowerCase().includes(lowerCasedSearch) ||
        s_tanggal?.toLowerCase().includes(lowerCasedSearch))
        && isDateInRange && isTypeMatch
    });

    const sortedRows = filtered.sort((a, b) => new Date(b.s_id_history_keluar) - new Date(a.s_id_history_keluar));

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
        <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={"Cari Riwayat Keluar di sini..."} />
        {/* <HistoryFilter onChange={(value) => setSortOption(value)} /> */}
        <Button size="md" variant="filled" className="hover:bg-blue-800" onClick={handleOpen} color="blue">
          Filter
        </Button>
      </div>
      {isOpened && (
        <div className="mb-3 flex justify-center gap-8 xl:flex-col xl:items-center overflow-auto xl:my-auto"> 
          <DateRangePicker
            onChange={(ranges) => setDateRange([ranges.selection])}
            ranges={dateRange}
            className="border rounded-lg p-2 bg-white"
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
            paginatedRows.map(({ 
              s_id_history_keluar,
              s_harga_jual,
              s_stok_keluar,
              s_tipe,
              s_tanggal,
              s_jam,
              s_pj,
              s_id_customer,
              s_id_transfer,
              s_kode_produk,
              s_nama_produk,
              s_stok,
              s_deskripsi,
              s_harga_produk,
              id_transfer,
              id_toko,
              kuantitas,
              asal,
              keterangan,
              status,
              nama_toko,
              order_histories_id,
              order_id,
              sales_order,
              nama_cust,
              no_telp,
              alamat,
              nama_sales,
              tanggal_order,
              jadwal_kirim,
              total_dp1,
              metode_bayar_dp1,
              total_dp2,
              metode_bayar_dp2,
              balance_due,
              status_terima,
              kode_produk,
              nama_produk,
              harga_per_item_setelah_ppn,
              qty,
              remarks
          }) => (
          
              <Card key={s_id_history_keluar} className="border p-4 rounded-md text-sm text-black hover:bg-blue-50 ease-in duration-100" shadow={false}>
                <div className="flex justify-between gap-3">
                  <div className="font-semibold text-md mb-2 cursor-default"> 
                    <Tooltip
                        content={s_kode_produk ? `${`[${s_kode_produk}] ${s_nama_produk}`.replace(/,/g, '; ')}` : `[${kode_produk}] ${nama_produk}`.replace(/,/g, '; ')}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        className="text-white bg-blue-700 font-semibold"
                      >
                      {  s_kode_produk
                            ? `${
                                `[${s_kode_produk}] ${s_nama_produk}`.replace(/,/g, '; ').length > 75
                                  ? `${`[${s_kode_produk}] ${s_nama_produk}`.replace(/,/g, '; ').substring(0, 75)}...`
                                  : `[${s_kode_produk}] ${s_nama_produk}`.replace(/,/g, '; ')
                              }`
                            : `${
                                `[${kode_produk}] ${nama_produk}`.replace(/,/g, '; ').length > 75
                                  ? `${`[${kode_produk}] ${nama_produk}`.replace(/,/g, '; ').substring(0, 75)}...`
                                  : `[${kode_produk}] ${nama_produk}`.replace(/,/g, '; ')
                              }`}

                    </Tooltip>
                  </div>
                  <div className="mb-2 text-blue-gray-700">{formatDate(s_tanggal)}</div>
                </div>
                <div className="text-blue-gray-700 flex flex-col gap-2">
                    <div className="flex justify-start gap-3">
                        <div>
                          <div> Stok Keluar </div>
                          <div> Cust/Tujuan </div>
                        </div>
                        <div>
                          <div className="cursor-default"> 
                          <Tooltip
                                content={s_tipe === 1? qty?.replace(/,/g, '; ') : kuantitas}
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }}
                                className="text-white bg-blue-500 font-normal"
                              >
                            {
                              s_tipe === 1
                                ? `${
                                    qty?.replace(/,/g, '; ').length > 50
                                      ? `: ${qty?.replace(/,/g, '; ').substring(0, 50)}... (${s_stok_keluar})`
                                      : `: ${qty?.replace(/,/g, '; ')} (${s_stok_keluar})`
                                  }`
                                : `${
                                    kuantitas?.length > 50
                                      ? `: ${kuantitas?.substring(0, 50)}...`
                                      : `: ${kuantitas}`
                                  }`
                            }

                          </Tooltip>
                          </div>
                          <div> : {s_tipe === 1? nama_cust: nama_toko} </div>
                        </div>
                    </div>
                  <hr />
                  <div className="flex justify-between gap-3 items-center">
                    <div> {s_jam} WIB</div>
                    {s_tipe === 0?
                      <ModalDetailHistoryKeluarTipe0 harga_jual={s_harga_jual} harga={s_harga_produk} nama_toko={nama_toko} stok_keluar={kuantitas} tanggal={formatDate(s_tanggal)} jam={s_jam} keterangan={keterangan} kode_produk={s_kode_produk} nama_produk={s_nama_produk} pj={s_pj}/>
                      :  <ModalDetailHistoryKeluarTipe1 nama_cust={nama_cust} no_telp={no_telp} alamat={alamat} tanggal_order={formatDate2(tanggal_order)} 
                                                        jadwal_kirim={formatDate2(jadwal_kirim)} total_harga={s_harga_jual} total_dp1={total_dp1} 
                                                        metode_bayar_dp1={metode_bayar_dp1} total_dp2={total_dp2} metode_bayar_dp2={metode_bayar_dp2} balance_due={balance_due} 
                                                        status_terima={status_terima} kode_produk={kode_produk} nama_produk={nama_produk} nama_sales={nama_sales} jam={s_jam} pj={s_pj}
                                                        harga_per_item_setelah_ppn={harga_per_item_setelah_ppn} qty={qty} remarks={remarks} sales_order={sales_order} tanggal={formatDate2(s_tanggal)}/>
                    } 
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