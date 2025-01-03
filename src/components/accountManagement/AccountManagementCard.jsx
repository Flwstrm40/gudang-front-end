'use client';

import { Button, Card } from "@material-tailwind/react";
import useSWR, {mutate} from "swr";
import axios from "axios";
import { KeyIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "sonner";
import ModalKonfirmasiReset from "./ModalKonfirmasiReset";
import DialAddUser from "./DialAddUser";
import ModalDeleteAkun from "./ModalDeleteAkun";
import Loading from "@/components/loading/Loading";

const AccountManagementCard = () => {
  const {data: dataKepalaGudang, error} = useSWR(`${process.env.API}/user/kepala-gudang`, async (url) => {
    const response = await axios.get(url);
    return response.data[0];
  });

  const {data: dataAdmin, errorAdmin, mutate} = useSWR(`${process.env.API}/user/admin`, async (url) => {
    const response = await axios.get(url);
    return response.data.admins;
  });

  // console.log(dataKepalaGudang);
  // console.log(dataAdmin);

  if (!dataKepalaGudang || !dataAdmin) return <Loading />;

    return ( 
      <div className="text-black text-sm">
        {/* Kepala Gudang */}
        <div className="text-lg font-semibold mb-5">
          Kepala Gudang
        </div>
        <Card shadow={false} className="border p-4 rounded-md text-sm text-black hover:bg-blue-50 ease-in duration-100">
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
          <Card key={id} shadow={false} className="mb-3 border p-4 rounded-md text-sm text-black hover:bg-blue-50 ease-in duration-100">
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

              <div className="flex">
                <div>
                  <ModalKonfirmasiReset id={id} username={username} />
                </div>
                <div>
                  <ModalDeleteAkun mutate={mutate} id_user={id} username={username} />
                </div>
              </div>
            </div>
          </Card>
        ))}
        <div className="justify-end flex mt-5">
          <div>
            <DialAddUser />
          </div>
        </div>


      </div>
    );
  }
  
export default AccountManagementCard;