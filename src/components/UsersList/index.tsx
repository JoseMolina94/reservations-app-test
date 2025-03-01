'use client'

import { useState, useContext } from "react"
import UserCard from "../UserCard";
import UserListFilter from "./UserListFilter";
import { ReservationContext } from "@/contexts/ReservationsContext";
import { User } from "@/types/User";

type UserFilter = {
  search: string
  props: string[]
}

export default function UsersList () {
  const { usersList, usersLoading, reservationsLoading } = useContext(ReservationContext)
  const [filter, setFilter] = useState<UserFilter>({search: '', props: []})

  const filterData = () => {
    if (!usersList) return [];
    if (filter.props.length === 0) return usersList

    const searchTerm = filter.search.toLowerCase();

    const result = usersList.filter((user: User) => {
      return filter.props.some((prop) => {
        const propValue = (user as any)[prop]?.toLowerCase();
        return propValue?.includes(searchTerm);
      });
    });

    return result
  };

  return (
    <div className="border border-gray-400 rounded-md w-full flex-1">
      <div className="flex flex-col lg:flex-row gap-2 justify-between items-center px-3 py-2" >
        <h1 className="text-2xl font-semibold" >Lista de usuarios</h1>
        <div>
          <UserListFilter 
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
      <div className="max-h-[644px] overflow-y-auto overflow-x-hidden" >
        {
          (!usersLoading && !reservationsLoading) &&
          <div>
            {
              filterData().map((user: User, index: number) => (
                <UserCard key={`user-item-${index}`} user={user} />
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}