'use client';
import { Typography } from "@material-tailwind/react";
import { 
    
    CardHeader,
    CardBody,
    CardFooter,
    Button,
} from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";
 
export default function Loading() {
  return (
    <div className="mt-6 w-96 h-[100vh] animate-pulse mx-auto my-auto">
       <Skeleton count={10} />
    </div>
  );
}
