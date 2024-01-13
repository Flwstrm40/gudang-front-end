'use client';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Textarea,
  } from "@material-tailwind/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"; 
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { TooltipIcon } from "@/components/tooltip/Tooltip";
  
export default function AddInventoryCard() {
    const router = useRouter();

    const [info, setInfo] = useState({
        Informasi: "",
      });

    const handleBack = () => {
        router.push("/inventory");
    }

    // console.log("info", info);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!info.Informasi) {
            toast.error("Harap isi kolom informasi.");
            return;
        }
    
        try {
          const response = await axios.post("http://localhost:5050/infos", info);
    
          if (response.status === 200) {
            // Handle success, maybe redirect to inventory page
            toast.success("Info berhasil ditambahkan");
            // Tunggu 3 detik sebelum navigasi
            setTimeout(() => {
                router.push("/inventory");
            }, 1000);
          } else {
            // Handle error
            toast.error("Gagal menambahkan info");
            console.error("Failed to add info");
          }
        } catch (error) {           
            toast.error("Gagal menambahkan info");
            console.error("Error:", error);
        }
      };
    
      const handleChange = (e, field) => {
        const { value } = e.target;
    
        setInfo((prevProduct) => ({
          ...prevProduct,
          [field]: value,
        }));
      };
    

    return (
       <div className="text-sm text-black w-full">
        <Toaster position="top-right" closeButton={true} richColors={true}/>
        <div className="flex justify-between items-center mb-14">
          <div className="flex justify-start gap-6">
            <Button variant="text" className="rounded-full" onClick={handleBack}>
                <ArrowUturnLeftIcon className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
                <div className="font-semibold text-xl ">
                Tambah Info
                </div>
                <div color="gray" className="mt-1 font-normal">
                Tambah informasi untuk keperluan
                </div>
            </div>
          </div>
          <TooltipIcon message="Informasi akan disampaikan pada User" />
        </div>
        <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
          <div className="mb-1 flex md:flex-col gap-6">
                <div className="-mb-3">
                    Informasi
                </div>
                <Textarea 
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-gray-700"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                    value={info.informasi}
                    onChange={(e) => handleChange(e, "informasi")}
                />
          </div>
          <div className="mt-7 text-xs text-red-800">
            Wajib diisi
          </div>
          <Button className="mt-3" fullWidth color="blue" type="submit">
            Tambah
          </Button>

        </form>
      </div>
    );
  }