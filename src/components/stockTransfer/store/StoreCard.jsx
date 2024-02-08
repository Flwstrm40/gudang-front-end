'use client';

import AddStore from "./AddStore";
import StoreTable from "./StoreTable";

export default function StoreCard() {
  
    return (
      <div className="flex flex-col gap-6">
        <div>
          <AddStore />
        </div>
        <div>
          <StoreTable />
        </div>
      </div>
    );
  }