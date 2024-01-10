'use client';

import { 
  Card,
  CardBody,
} from "@material-tailwind/react";
import Search from "../search/Search";
import SortBy from "../sortBy/SortBy";
import TableInventory from "./TableInventory";
import Pagination from "../pagination/Pagination";

const InventoryCard = () => {
    return ( 
      <div>
        <div className="text-lg">
          <TableInventory />
        </div>
        <div className="mt-5 flex justify-end">
          <Pagination />
        </div>
      </div>
    );
  }
  
export default InventoryCard;