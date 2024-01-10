'use client';
import { Input, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log(searchText);
  }

  useEffect(() => {
    // Add event listener ketika user menekan tombol Enter
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && searchText !== "" && document.activeElement.id === "search-input") {
        // If Enter key is pressed, call the handleLogin function
        handleSearch(e);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [searchText]);

  return ( 
      <div className="w-[70%]">
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            id="search-input"
            type="text"
            color="blue"
            label="Cari di sini..."
            className="pr-20"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            size="sm"
            color="blue"
            className="!absolute right-1 top-1 rounded"
            onClick={handleSearch}
          >
            Cari
          </Button>
        </div>
      </div>
    );
  }
  
  export default Search;