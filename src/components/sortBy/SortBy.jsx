'use client';
import { Select, Option } from "@material-tailwind/react";
 
export default function SortBy({ onChange }) {
  const handleSortChange = (value) => {
    onChange(value);
  };

  return (
    <div className="w-72 md:w-full">
      <Select
        label="Sort By"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        color="blue"
        value="default"
        onChange={handleSortChange}
      >
        <Option value="default">Default</Option>
        <Option value="quantityAsc">Kuantitas (Ascending)</Option>
        <Option value="quantityDesc">Kuantitas (Descending)</Option>
        <Option value="productAsc">Produk (A-Z)</Option>
        <Option value="productDesc">Produk (Z-A)</Option>
      </Select>
    </div>
  );
}