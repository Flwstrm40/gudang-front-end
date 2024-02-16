
import { Button, Card, tab, Collapse } from "@material-tailwind/react";
// import ModalTambahStok from "./ModalTambahStok";
import Search from "../../search/Search";
import SortByToko from "@/components/sortBy/SortByToko";
import Pagination from "../../pagination/Pagination";
import { useState, useEffect } from "react";
import { TrashIcon, XCircleIcon, ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import ModalEditStore from "./ModalEditStore";
import ModalDeleteStore from "./ModalDeleteStore";
// import DialAddProduk from "./DialAddProduk";
import { parseCookies } from "nookies";
import { Toaster, toast } from "sonner";
import useSWR, {mutate} from "swr";
import DialFormTransfer from ".././DialFormTransfer";
import ModalEditTransfer from ".././ModalEditTransfer";
import { usePathname } from "next/navigation";
import RowsPerPage from "../../pagination/RowsPerPage";
import ButtonTooltip from "../../tooltip/ButtonTooltip";
import Loading from "../../loading/loading";

// const TABLE_HEAD = ["No", "Nama Toko", ""];
const TABLE_HEAD = ["Nama Toko", ""];

// Function to slice rows based on the active page
const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default function StoreTable() {
    const { data: tableRows, error, mutate } = useSWR(`${process.env.API}/stores`, async (url) => {
      const response = await axios.get(url);
      return response.data.stores;
    });

    const pathname = usePathname();
  
    const [isChevronRotated, setIsChevronRotated] = useState(false);
    const [currentPath, setCurrentPath] = useState(pathname);
    const [searchInput, setSearchInput] = useState("");
    const [filteredRows, setFilteredRows] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [open, setOpen] = useState(false);
    const cookies = parseCookies();
  
    const role = cookies.role;

    const toggleOpen = () => {
        setOpen((cur) => !cur);
        setIsChevronRotated((prev) => !prev);
    };

    useEffect(() => {
      if (!tableRows) return;

      setActivePage(1);
      // Filtering logic based on search input and status === 0
      const filtered = tableRows.filter(({ nama_toko }) =>
        nama_toko.toLowerCase().includes(searchInput.toLowerCase()) 
      );
  
  
      // Sorting logic based on the selected option
      let sortedRows = [...filtered];
      if (sortOption === "default") {
        sortedRows = sortedRows.sort((a, b) => b.id_toko - a.id_toko);
      } else if (sortOption === "storeAsc") {
        sortedRows = sortedRows.sort((a, b) => a.nama_toko.localeCompare(b.nama_toko));
      } else if (sortOption === "storeDesc") {
        sortedRows = sortedRows.sort((a, b) => b.nama_toko.localeCompare(a.nama_toko));
      }
  
      setFilteredRows(sortedRows);
    }, [searchInput, tableRows, sortOption]);
  
    if (error) return <p>Error fetching data...</p>;
    if (!tableRows) return <Loading />;
    // Get the current page of rows based on activePage and pageSize
    const paginatedRows = paginate(filteredRows, activePage, pageSize);

  return (
    <div>
        <div className="flex justify-between items-center text-black">
            <div className="font-semibold text-lg ">
                List Toko Tujuan
            </div>
            <div>
                <Button variant="text" onClick={toggleOpen}>
                    <ChevronDoubleDownIcon className={`h-5 w-5 transform ${isChevronRotated ? 'rotate-180 ease-in duration-300' : 'ease-in duration-300'}`} />
                </Button>
            </div>
        </div>
        <Collapse open={open}>
            <div className="text-xl flex sm:flex-col gap-4 justify-center mb-5 mt-5">
                <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={"Cari Nama Toko di sini..."} />
                <SortByToko onChange={(value) => setSortOption(value)} />
            </div>
            <Card className="h-full w-full overflow-auto text-black overflow-y-hidden">
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
                                Tidak ada Toko yang ditemukan.
                            </div>
                            </div>
                        </td>
                    </tr>
                    ) : (
                    paginatedRows.map(({ id_toko, nama_toko }, index) => (
                        <tr key={id_toko} className="even:bg-blue-gray-50/50">
                        {/* <td className="p-3">
                            <div className="font-normal">{asal}</div>
                        </td> */}
                        {/* <td className="p-3">
                            <div className="font-normal">{index + 1}</div>
                        </td> */}
                        <td className="p-3">
                            <div className="font-normal">
                            <ButtonTooltip content={nama_toko} textButton={nama_toko.length > 60 ? `${nama_toko.substr(0, 60)}...` : nama_toko} />
                            </div>
                        </td>
                        <td className="p-3">
                            <div className="flex justify-center gap-2 items-center sm:flex-col">
                            <div>
                                <ModalEditStore id_toko={id_toko} nama_toko={nama_toko} mutate={mutate}/>
                                <ModalDeleteStore id_toko={id_toko} nama_toko={nama_toko} mutate={mutate}/>
                            </div>
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
        </Collapse>
    </div>
  );
}