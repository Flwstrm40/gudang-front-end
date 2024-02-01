import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { set } from "date-fns";

export default function CardLineChart() {
  const chartRef = useRef(null);
  const [stokMasukData, setStokMasukData] = useState([]);
  const [stokKeluarData, setStokKeluarData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024");
  const years = Array.from({length: new Date().getFullYear() - 2017}, (_, i) => (new Date().getFullYear() - i).toString());


  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Lakukan permintaan HTTP untuk mendapatkan data stok masuk dari endpoint yang sesuai
        const stokMasukResponse = await axios.get(`${process.env.API}/inHistories/rekapStokMasuk/2024`);
        // Lakukan permintaan HTTP untuk mendapatkan data stok keluar dari endpoint yang sesuai
        const stokKeluarResponse = await axios.get(`${process.env.API}/outHistories/rekapStokKeluar/2024`);
    
        // Periksa apakah respons sukses
        if (stokMasukResponse.status === 200 && stokKeluarResponse.status === 200) {
          // Buat objek untuk menyimpan data stok masuk dan stok keluar per bulan
          const stokMasukPerBulan = {};
          const stokKeluarPerBulan = {};
      
          // Isi objek stokMasukPerBulan dengan data dari respons stok masuk
          stokMasukResponse.data.sumOfStokMasuk.forEach(entry => {
            stokMasukPerBulan[entry.bulan] = parseInt(entry.total_stok_masuk);
          });
      
          // Isi objek stokKeluarPerBulan dengan data dari respons stok keluar
          stokKeluarResponse.data.sumOfStokKeluar.forEach(entry => {
            stokKeluarPerBulan[entry.bulan] = parseInt(entry.total_stok_keluar);
          });
      
          // Buat array untuk menyimpan data stok masuk dan stok keluar yang akan ditampilkan pada chart
          const stokMasukChartData = Array.from({ length: 12 }, (_, i) => {
            const totalStokMasuk = stokMasukPerBulan[i + 1];
            return totalStokMasuk !== undefined ? totalStokMasuk : 0;
          });
      
          const stokKeluarChartData = Array.from({ length: 12 }, (_, i) => {
            const totalStokKeluar = stokKeluarPerBulan[i + 1];
            return totalStokKeluar !== undefined ? totalStokKeluar : 0;
          });
      
          // Perbarui state stokMasukData dan stokKeluarData dengan data stok masuk dan stok keluar yang sudah diisi nilai 0 untuk bulan-bulan yang tidak memiliki data
          setStokMasukData(stokMasukChartData);
          setStokKeluarData(stokKeluarChartData);
        } else {
          // Tampilkan pesan kesalahan jika permintaan gagal
          console.error("Failed to fetch data.");
        }
      } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error("Error:", error);
      }
    };

    fetchChartData();
  }, []); 

  useEffect(() => {
    const config = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Stok Masuk",
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: stokMasukData,
            fill: false,
          },
          {
            label: "Stok Keluar",
            fill: false,
            backgroundColor: "#D24545",
            borderColor: "#D24545",
            data: stokKeluarData,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Stok Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "white",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              grid: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "white",
                min: 0,
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              grid: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };

    setSelectedYear("2024");
    const ctx = document.getElementById("line-chart").getContext("2d");

    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, config);

    return () => {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
    };
  }, [stokMasukData, stokKeluarData]);

  const handleYearChange = async (event) => {
    const selectedYear = event.target.value;
    try {
      // Lakukan permintaan HTTP untuk mendapatkan data stok masuk dari endpoint yang sesuai
      const stokMasukResponse = await axios.get(`${process.env.API}/inHistories/rekapStokMasuk/${selectedYear}`);
      // Lakukan permintaan HTTP untuk mendapatkan data stok keluar dari endpoint yang sesuai
      const stokKeluarResponse = await axios.get(`${process.env.API}/outHistories/rekapStokKeluar/${selectedYear}`);
      
      // Buat objek untuk menyimpan data stok masuk dan stok keluar per bulan
      const stokMasukPerBulan = {};
      const stokKeluarPerBulan = {};
  
      // Isi objek stokMasukPerBulan dengan data dari respons stok masuk
      stokMasukResponse.data.sumOfStokMasuk.forEach(entry => {
        stokMasukPerBulan[entry.bulan] = parseInt(entry.total_stok_masuk);
      });
  
      // Isi objek stokKeluarPerBulan dengan data dari respons stok keluar
      stokKeluarResponse.data.sumOfStokKeluar.forEach(entry => {
        stokKeluarPerBulan[entry.bulan] = parseInt(entry.total_stok_keluar);
      });
  
      // Buat array untuk menyimpan data stok masuk dan stok keluar yang akan ditampilkan pada chart
      const stokMasukChartData = Array.from({ length: 12 }, (_, i) => {
        const totalStokMasuk = stokMasukPerBulan[i + 1];
        return totalStokMasuk !== undefined ? totalStokMasuk : 0;
      });
  
      const stokKeluarChartData = Array.from({ length: 12 }, (_, i) => {
        const totalStokKeluar = stokKeluarPerBulan[i + 1];
        return totalStokKeluar !== undefined ? totalStokKeluar : 0;
      });
  
      // Perbarui state stokMasukData dan stokKeluarData dengan data stok masuk dan stok keluar yang sudah diisi nilai 0 untuk bulan-bulan yang tidak memiliki data
      setStokMasukData(stokMasukChartData);
      setStokKeluarData(stokKeluarChartData);
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error("Error:", error);
    }
  };
  
  
  

  return (
    <div>
      <div className="flex justify-end mb-3">
        {/* Select year */}
        <select
          onChange={handleYearChange}
          defaultValue={selectedYear}
          className="text-base px-3 py-1 border-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {/* Card stats */}
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-md bg-blue-gray-800">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blue-gray-200 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-blue-gray-50 text-xl font-semibold">Perbandingan Stok</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-80">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
