
import {
    Card,
    Input,
    Checkbox,
    Button,
    Textarea,
    Collapse,
  } from "@material-tailwind/react";
import { ArrowUturnLeftIcon, PlusIcon, ChevronDoubleDownIcon } from "@heroicons/react/24/solid"; 
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { TooltipIcon } from "@/components/tooltip/Tooltip";
import { Spinner } from "@material-tailwind/react";
import useSWR, {mutate} from "swr";  

export default function AddStore() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isChevronRotated, setIsChevronRotated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toko, setToko] = useState({
        nama_toko: ""
    });
    
    const handleBack = () => {
        router.push("/stockTransfer");
    }
    
    // console.log("toko", toko);
    const toggleOpen = () => {
        setOpen((cur) => !cur);
        setIsChevronRotated((prev) => !prev);
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!toko.nama_toko) {
            toast.error("Harap isi kolom Nama Toko.");
            return;
        }
        
        setIsLoading(true);
        try {
          const response = await axios.post(`${process.env.API}/stores`, toko);
    
          if (response.status === 200) {
            // Handle success, maybe redirect to inventory page
            toast.success("Toko berhasil ditambahkan");
            setIsLoading(false);
            setToko({
                nama_toko: ""
            });
            mutate(`${process.env.API}/stores`);
          } else {
            // Handle error
            toast.error("Gagal menambahkan Toko");
            setIsLoading(false);
            console.error("Failed to add Store");
          }
        } catch (error) {           
            toast.error("Gagal menambahkan Toko");
            setIsLoading(false);
            console.error("Error:", error);
        }
      };
    
      const handleChange = (e, field) => {
        const { value } = e.target;
    
        setToko((prevProduct) => ({
          ...prevProduct,
          [field]: value,
        }));
      };
    

    return (
       <div className="text-sm text-black w-full mb-3">
        <div className="flex justify-start gap-5 items-center text-xl text-black font-bold">
            <Button variant="text" className="rounded-full" onClick={handleBack}>
                <ArrowUturnLeftIcon className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
                <div>
                    Toko
                </div>
                <div color="gray" className="mt-1 font-normal text-sm">
                    Tambah dan kelola toko Tujuan
                </div>
            </div>
        </div>
        <div className="flex justify-between items-center mt-10">
          <div className="flex justify-start gap-6">
            <div className="flex flex-col">
                <div className="font-semibold text-lg ">
                Tambah Toko Tujuan
                </div>
            </div>
          </div>
          <Button variant="text" onClick={toggleOpen}>
            <ChevronDoubleDownIcon className={`h-5 w-5 transform ${isChevronRotated ? 'rotate-180 ease-in duration-300' : 'ease-in duration-300'}`} />
          </Button>
        </div>
        <Collapse open={open}>
            <form className="mb-2 w-full mt-5" onSubmit={handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
                    <div className="-mb-3">
                        Nama Toko (*)
                    </div>
                    <Input 
                        type="text"
                        className=" !border-t-blue-gray-200 focus:!border-gray-700"
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                        value={toko.nama_toko}
                        onChange={(e) => handleChange(e, "nama_toko")}
                    />
            </div>
            <div className="mt-7 text-xs text-red-800">
                (*) Wajib diisi
            </div>
            <Button className="mt-3" fullWidth color="blue" type="submit">
                {isLoading ? <Spinner color="white" className='mx-auto h-4 w-4'/> : "Tambah"}
            </Button>

            </form>
        </Collapse>
      </div>
    );
  }