import { Card } from "@material-tailwind/react";

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 3 && currentHour < 10) {
    return 'Selamat Pagi';
  } else if (currentHour >= 10 && currentHour < 15) {
    return 'Selamat Siang';
  } else if (currentHour >= 15 && currentHour < 18) {
    return 'Selamat Sore';
  } else {
    return 'Selamat Malam';
  }
};

const DashboardCard = ({ username }) => {
  const greeting = getGreeting();

  return ( 
    <div>
        {greeting}, {username}! 
    </div>
  );
}

export default DashboardCard;
