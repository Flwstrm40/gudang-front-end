'use client';
import { Tooltip, Button } from "@material-tailwind/react";
 
export default function ButtonTooltip({ content, textButton}) {
  return (
    <Tooltip 
        content={content}
        animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        className="bg-blue-gray-900 text-blue-gray-50"
    >
      <Button variant="text" className="normal-case font-normal text-sm text-black">{textButton}</Button>
    </Tooltip>
  );
}