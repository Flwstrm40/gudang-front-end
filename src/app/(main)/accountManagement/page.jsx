import AccountManagementCard from "@/components/accountManagement/AccountManagementCard";

export const metadata = {
  title: 'Manajemen Akun',
  description: 'Manajemen Akun page',
}

const accountManagement = () => {
    return ( 
      <div>
        <AccountManagementCard/>
      </div>
    );
  }
  
  export default accountManagement;