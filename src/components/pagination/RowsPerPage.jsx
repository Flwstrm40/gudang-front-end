'use client';
import React from 'react';


const RowsPerPage = ({ pageSize, setPageSize, setActivePage }) => {
  return (
    <div className="flex gap-3 items-center">
        <div className="text-base text-black">
            Rows per page:
        </div>
        <select
            className="border border-gray-900 rounded-md text-base text-black p-1"
            value={pageSize}
            onChange={(e) => {
                setActivePage(1);
                setPageSize(Number(e.target.value));
            }}
            >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
        </select>
  </div>

  );
};

export default RowsPerPage;
