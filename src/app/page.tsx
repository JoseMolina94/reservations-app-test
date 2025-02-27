import React from "react";
import BlockTime from "@/components/BlockTime";
import UsersList from "@/components/UsersList";
import AddOrEditUserForm from "@/components/AddOrEditUserForm";
import ReservationContextProvider from "@/contexts/ReservationsContext";

export default function Home() {
  return (
    <div className=" w-auto h-auto border rounded-2xl m-6 " >
      <div className=" bg-blue-500 text-white border-b font-medium rounded-t-2xl text-3xl px-4 py-2 mb-4" >
        Reservas
      </div>

      <div className="p-4 flex gap-6">
        <div className="space-y-1 space-x-3.5 h-fit w-fit" >
          <div className="text-gray-600 text-xss" >Línea de tiempos</div>
          <BlockTime totalHeight={640} />
        </div>

        <ReservationContextProvider>
          <div className="w-full flex-1 flex gap-4">
            <UsersList />
            <div>
              <AddOrEditUserForm />
            </div>
          </div>
        </ReservationContextProvider>
      </div>
      
    </div>
  );
}
