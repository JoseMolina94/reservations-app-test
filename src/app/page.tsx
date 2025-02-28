import React from "react";
import BlockTime from "@/components/BlockTime";
import UsersList from "@/components/UsersList";
import AddOrEditUserForm from "@/components/AddOrEditUserForm";
import ReservationContextProvider from "@/contexts/ReservationsContext";
import AddBlockTimeForm from "@/components/AddBlockTimeForm";

export default function Home() {
  return (
    <ReservationContextProvider>
      <div className="w-auto h-auto border rounded-2xl m-1 lg:m-6" >
        <div className=" bg-blue-500 text-white border-b font-medium rounded-t-2xl text-3xl px-4 py-2 mb-4" >
          Reservas
        </div>

        <div className="flex items-center gap-2 flex-col lg:flex-row ">
          <div className="lg:p-4 p-1 flex gap-2 lg:gap-4 w-full">
            <div className="space-y-1 lg:space-x-3.5 h-fit w-fit" >
              <div className="text-gray-600 text-xss hidden lg:block " >Línea de tiempos</div>
              <BlockTime totalHeight={640} />
            </div>

            <div className="w-full flex-1 flex lg:pl-0 pl-12 gap-4">
              <UsersList />
            </div>
          </div>

          <div className="w-full lg:w-fit px-1 lg:pr-4 flex gap-4">
            <div className="space-y-4 w-full block md:flex lg:block lg:space-y-4 md:gap-2 items-start md:space-y-0">
              <AddOrEditUserForm />
              <AddBlockTimeForm />
            </div>
          </div>
        </div>
      </div>
    </ReservationContextProvider>
  );
}
