import StockTransferCard from "@/components/stockTransfer/StockTransferCard";

export const metadata = {
  title: 'Transfer Stok',
  description: 'Transfer Stok page',
}

const StockTransfer = () => {
    return ( 
      <div>
        <StockTransferCard/>
      </div>
    );
  }
  
  export default StockTransfer;