import React from "react";
import BlockTime from "@/components/BlockTime";
import UsersList from "@/components/UsersList";

export default function Home() {
  return (
    <div className=" w-auto h-auto border rounded-2xl m-6 " >
      <div className=" bg-blue-400 border-b font-medium rounded-t-2xl text-lg px-4 py-2 mb-4" >
        Reservas
      </div>

      <div className="p-4 flex gap-6">
        <div className="space-y-1 space-x-3.5 h-fit w-fit" >
          <div className="text-gray-600 text-xss" >Línea de tiempos</div>
          <BlockTime totalHeight={640} />
        </div>

        <div className="w-full flex-1" >
          <UsersList />
        </div>
      </div>
      
    </div>
  );
}
