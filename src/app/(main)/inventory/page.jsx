import InventoryCard from "@/components/inventory/InventoryCard";
import DialAddProduk from "@/components/inventory/DialAddProduk";

export const metadata = {
  title: 'Inventori',
  description: 'Inventori page',
}

const Inventory = () => {
    return ( 
      <div>
        <div>
          <InventoryCard/>
        </div>
        <div>
          <DialAddProduk/>
        </div>
      </div>
    );
  }
  
  export default Inventory;