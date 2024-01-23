import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Pagination({ activePage, pageCount, onPageChange }) {
  const next = () => {
    if (activePage < pageCount) {
      onPageChange(activePage + 1);
    }
  };

  const prev = () => {
    if (activePage > 1) {
      onPageChange(activePage - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{activePage}</strong> of{" "}
        <strong className="text-gray-900">{pageCount}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={activePage === pageCount}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
