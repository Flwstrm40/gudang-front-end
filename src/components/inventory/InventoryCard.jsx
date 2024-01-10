'use client';

import Search from "../search/Search";
import SortBy from "../sortBy/SortBy";

const InventoryCard = () => {
    return ( 
      <div>
        <div className="text-xl flex sm:flex-col gap-4 justify-center">
          <Search />
          <SortBy />
        </div>
      </div>
    );
  }
  
export default InventoryCard;