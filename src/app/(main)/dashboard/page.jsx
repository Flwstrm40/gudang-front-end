'use client';

import { useEffect } from 'react';
import { parseCookies } from 'nookies';

const Dashboard = () => {
  useEffect(() => {
    // Mengakses cookies
    const cookies = parseCookies();
    
    // Menampilkan cookies di console log
    console.log('Cookies:', cookies);
  }, []);

  return ( 
    <div className="text-red-800 text-5xl flex-col justify-center">
      Dashboard Page
    </div>
  );
}

export default Dashboard;
