'use client';
import { Input, Button } from "@material-tailwind/react";

const Search = () => {
    return ( 
      <div className="w-[70%]">
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="text"
            color="blue"
            label="Cari di sini..."
            className="pr-20"
            // containerProps={{
            //   className: "min-w-[288px]",
            // }}
          />
          <Button
            size="sm"
            color="blue"
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </div>
      </div>
    );
  }
  
  export default Search;