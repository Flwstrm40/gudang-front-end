'use client';

// Import necessary dependencies
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  // Get the router instance
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [user, setUser] = useState([]);

  // // Mengakses cookies
  const cookies = parseCookies();
  const id = cookies.id;
  // console.log("id", id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!cookies.token) {
          router.push('/');
        } else {
          const response = await axios.get(`http://localhost:5050/user/${id}`);
          setUser(response.data[0]);
          // console.log("user", response.data[0])
          
          setUsername(response.data[0].username);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData(); 
  }, [cookies.token, id, router]);



  console.log('Username:', username);

  return ( 
    <div className="text-red-800 text-5xl flex-col justify-center">
      Dashboard Page, hi {username}!
    </div>
  );
}

export default Dashboard;

