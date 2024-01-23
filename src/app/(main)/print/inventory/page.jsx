import InventoryTablePrint from "@/components/print/inventory/InventoryTablePrint";


export const metadata = {
  title: 'Cetak Inventori',
  description: 'Cetak Inventori page',
}

const printInventory = () => {
  return ( 
    <div>
      <InventoryTablePrint />
    </div>
  );
}
  
export default printInventory;