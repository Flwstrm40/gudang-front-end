"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { set } from 'date-fns';

export default function InventoryTablePrint() {
    const [loading, setLoading] = useState(true);
    const [printTriggered, setPrintTriggered] = useState(false);

    useEffect(() => {
        if (!loading && !printTriggered) {
            window.print();
            setPrintTriggered(true);
        }
        
        window.onafterprint = () => {
            window.close();
        };

    }, [loading, printTriggered]);

    const { data, error } = useSWR(`${process.env.API}/products`, async (url) => {
        const response = await axios.get(url);
        setLoading(false);
        return response.data.products;
    });

    if (error) return <div className="text-red-500">Error fetching data</div>;
    if (!data) return <div className="text-gray-600">Loading...</div>;

    const currentDateTime = new Date().toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    return (
        <div className="max-w-screen-md mx-auto text-base">
            <div className="flex justify-end mb-5 gap-3">
                <div>
                    Printed Out:
                </div>
                <div className="text-right">
                    <p>{currentDateTime}</p>
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-r">Kode</th>
                        <th className="py-2 px-4 border-b border-r">Produk</th>
                        <th className="py-2 px-4 border-b border-r">Stok</th>
                        <th className="py-2 px-4 border-b border-r">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ kode_produk, nama_produk, stok }) => (
                        <tr key={kode_produk} className="hover:bg-gray-100 text-center">
                            <td className="py-2 px-4 border-b border-r">{kode_produk}</td>
                            <td className="py-2 px-4 border-b border-r">{nama_produk}</td>
                            <td className="py-2 px-4 border-b border-r">{stok}</td>
                            <td className="py-2 px-4 border-b">
                                {/* Add your checkbox element here */}
                                <input type="checkbox" className="h-5 w-5" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
