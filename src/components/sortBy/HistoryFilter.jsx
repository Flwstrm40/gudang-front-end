'use client';
import { Select, Option } from "@material-tailwind/react";
 
export default function HistoryFilter({ onChange }) {
  const handleSortChange = (value) => {
    onChange(value);
  };

  return (
    <div className="w-72">
      <Select
        label="Filter By"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        color="blue"
        value="default"
        onChange={handleSortChange}
      >
        <Option value="default">Semua</Option>
        <Option value="hari-ini">Hari ini</Option>
        <Option value="7-hari">7 Hari</Option>
        <Option value="sebulan">Sebulan</Option>
        <Option value="6-bulan">6 Bulan</Option>
        <Option value="setahun">Setahun</Option>
      </Select>
    </div>
  );
}