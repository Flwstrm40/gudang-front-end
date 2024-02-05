'use client';
import { Input, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";

const Search = ({Value, onChange, label}) => {
  useEffect(() => {
    // Add event listener untuk menangkap tombol yang ditekan
    const handleKeyDown = (e) => {
      // Periksa apakah tombol yang ditekan adalah "k" dan apakah Ctrl ditekan bersamaan
      if ((e.key === 'M' || e.key === 'm') && e.ctrlKey) {
        // Aktifkan fungsi pencarian
        document.getElementById('search-input').focus();
      }
    };

    // Tambahkan event listener ke window saat komponen dimount
    window.addEventListener('keydown', handleKeyDown);

    // Bersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return ( 
      <div className="w-[70%] md:w-full">
        <div className="relative flex w-full gap-2 ">
          <Input
            id="search-input"
            type="text"
            color="blue"
            label={label}
            className="pr-20"
            value={Value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // handleSearch();
              }
            }}
          />
          <Button
            size="sm"
            color="blue"
            className="!absolute right-1 top-1 rounded lg:hidden"
            // onClick={handleSearch}
          >
            CTRL + M
          </Button>
        </div>
      </div>
    );
  }
  
  export default Search;