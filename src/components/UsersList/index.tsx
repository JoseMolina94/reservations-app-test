'use client'

import { useState, useContext } from "react"
import UserCard from "../UserCard";
import UserListFilter from "./UserListFilter";
import { ReservationContext } from "@/contexts/ReservationsContext";
import { BlockTime } from "@/types/BlockTime";

type UserFilter = {
  search: string
  props: string[]
}

export default function UsersList () {
  const { reservationsList, reservationsLoading } = useContext(ReservationContext)
  const [filter, setFilter] = useState<UserFilter>({search: '', props: []})

  const filterData = () => {
    if (!reservationsList) return [];
    if (filter.props.length === 0) return reservationsList

    const searchTerm = filter.search.toLowerCase();

    const result = reservationsList.filter((reservation: BlockTime) => {
      return filter.props.some((prop) => {
        const propValue = (reservation?.user as any)[prop]?.toLowerCase();
        return propValue?.includes(searchTerm);
      });
    });

    return result
  };

  return (
    <div className="border w-full flex-1">
      <div className="flex gap-2 justify-between items-center px-3 py-2" >
        <h1 className="text-2xl font-semibold" >Lista de usuarios</h1>
        <div>
          <UserListFilter 
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
      <div>
        {
          !reservationsLoading &&
          <div>
            {
              filterData().map((reservation: any, index: number) => (
                <UserCard key={`user-item-${index}`} reservation={reservation} />
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}