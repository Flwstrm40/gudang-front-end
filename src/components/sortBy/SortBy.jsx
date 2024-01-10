'use client';
import { Select, Option } from "@material-tailwind/react";
 
export default function SortBy() {
  return (
    <div className="w-72">
      <Select
        label="Sort By"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        color="blue"
      >
        <Option>Kuantitas (Ascending)</Option>
        <Option>Kuantitas (Descending)</Option>
        <Option>Produk (A-Z)</Option>
        <Option>Produk (Ascending)</Option>
      </Select>
    </div>
  );
}