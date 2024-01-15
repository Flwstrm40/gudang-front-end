import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import FormEditCard from "./FormEditTransfer";
 
export default function ModalEditTransfer({id_transfer, id_produk, id_toko, edit_kuantitas, edit_keterangan, mutate}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} variant="text" size="sm" color="blue">
        <PencilSquareIcon className="h-4 w-4" />
      </Button>
    <Dialog open={open} size="lg" handler={handleOpen}>
        <DialogBody>
            <FormEditCard id_transfer={id_transfer} id_produk={id_produk} id_toko={id_toko} edit_kuantitas={edit_kuantitas} edit_keterangan={edit_keterangan} handleOpen={handleOpen} mutate={mutate}/>
        </DialogBody>
      </Dialog>
    </>
  );
}