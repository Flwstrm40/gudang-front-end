'use client';

import { 
  Card,
  CardBody,
} from "@material-tailwind/react";
import Search from "../search/Search";
import SortBy from "../sortBy/SortBy";
import TableInventory from "./TableInventory";
import DialAddProduk from "./DialAddProduk";
import Pagination from "../pagination/Pagination";
import { Toaster, toast } from "sonner";

const InventoryCard = () => {
    return ( 
      <div>
        <div className="text-lg">
          <TableInventory />
        </div>
        {/* <div>
          <DialAddProduk/>
        </div> */}
      </div>
    );
  }
  
export default InventoryCard;