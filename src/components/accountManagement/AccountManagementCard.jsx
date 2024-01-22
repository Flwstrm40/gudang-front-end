'use client';

import { Button, Card } from "@material-tailwind/react";
import useSWR, {mutate} from "swr";
import axios from "axios";
import { KeyIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "sonner";
import ModalKonfirmasiReset from "./ModalKonfirmasiReset";

const AccountManagementCard = () => {
  const {data: dataKepalaGudang, error} = useSWR(`${process.env.API}/user/kepala-gudang`, async (url) => {
    const response = await axios.get(url);
    return response.data[0];
  });

  const {data: dataAdmin, errorAdmin} = useSWR(`${process.env.API}/user/admin`, async (url) => {
    const response = await axios.get(url);
    return response.data.admins;
  });

  // console.log(dataKepalaGudang);
  // console.log(dataAdmin);

  if (!dataKepalaGudang || !dataAdmin) return <div>Loading...</div>;

    return ( 
      <div className="text-black text-sm">
        {/* Kepala Gudang */}
        <div className="text-lg font-semibold mb-5">
          Kepala Gudang
        </div>
        <Card shadow={false} className="border p-4 rounded-md text-sm text-black">
          <div className="flex gap-5 justify-between items-center">
            <div className="flex gap-5">
              <div>
                <div>Username </div>
                <div>Display Name</div>
              </div>
              <div className="flex gap-1">
                <div>
                  <div>:</div>
                  <div>:</div>
                </div>
                <div>
                  <div>{dataKepalaGudang?.username}</div>
                  <div>{dataKepalaGudang?.displayName}</div>
                </div>
              </div>
            </div>

            <div>
              <ModalKonfirmasiReset id={dataKepalaGudang?.id} username={dataKepalaGudang?.username} />
            </div>
          </div>
        </Card>

        {/* Admin */}
        <div className="text-lg font-semibold mt-10 mb-5">
          Admin
        </div>
        {dataAdmin?.map(({id, username, displayName}) => (
          <Card key={id} shadow={false} className="mb-3 border p-4 rounded-md text-sm text-black">
            <div className="flex gap-5 justify-between items-center">
              <div className="flex gap-5">
                <div>
                  <div>Username </div>
                  <div>Display Name</div>
                </div>
                <div className="flex gap-1">
                  <div>
                    <div>:</div>
                    <div>:</div>
                  </div>
                  <div>
                    <div>{username}</div>
                    <div>{displayName? displayName: "-"}</div>
                  </div>
                </div>
              </div>

              <div>
               <ModalKonfirmasiReset id={id} username={username} />
              </div>
            </div>
          </Card>
        ))}


      </div>
    );
  }
  
export default AccountManagementCard;