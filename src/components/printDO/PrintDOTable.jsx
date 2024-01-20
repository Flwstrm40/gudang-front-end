"use client";
import { useEffect } from 'react';

export default function PrintDOTable({ id_customer }) {
  useEffect(() => {
    window.print();

    window.close();
  }, []); 

  return (
    <div>
      <p>halo, {id_customer}</p>
    </div>
  );
}
