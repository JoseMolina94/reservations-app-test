import React from "react";
import BlockTime from "@/components/BlockTime";

export default function Home() {

  return (
    <div className=" w-auto h-auto border rounded-2xl overflow-hidden " >
      <div className=" bg-blue-400 border-b font-medium text-lg px-4 py-2 mb-4" >
        Reservas
      </div>

      <div>
        <BlockTime  />
      </div>
      
    </div>
  );
}
