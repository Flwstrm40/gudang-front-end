import PrintDOTable from "@/components/printDO/PrintDOTable";


export const metadata = {
  title: 'Cetak Delivery Order',
  description: 'Cetak Delivery Order page',
}

const printDO = ({params}) => {
  return ( 
    <div>
      <PrintDOTable id_customer={params.id_customer}/>
    </div>
  );
}
  
export default printDO;