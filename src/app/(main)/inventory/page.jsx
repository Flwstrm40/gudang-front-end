import InventoryCard from "@/components/inventory/InventoryCard";

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
      </div>
    );
  }
  
  export default Inventory;