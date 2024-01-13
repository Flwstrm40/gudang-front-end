import AddInventoryCard from "@/components/inventory/addProduct/AddInventoryCard";

export const metadata = {
  title: 'Tambah Produk',
  description: 'Tambah Produk page',
}

const AddProduct = () => {
    return ( 
      <div>
        <div>
          <AddInventoryCard/>
        </div>
      </div>
    );
  }
  
  export default AddProduct;