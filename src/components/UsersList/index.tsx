'use client'

import React, { useState } from "react"
import useSWR from 'swr'
import UserCard from "../UserCard";
import UserListFilter from "./UserListFilter";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type UserFilter = {
  search: string
  props: string[]
}

export default function UsersList () {
  const { data: usersList, isLoading } = useSWR('/api/users', fetcher);
  const [filter, setFilter] = useState<UserFilter>({search: '', props: ['name']})

  const filterData = () => {
    if (!usersList) return [];

    const searchTerm = filter.search.toLowerCase();

    const result = usersList.filter((user: any) => {
      return filter.props.some((prop) => {
        const propValue = user[prop]?.toLowerCase();
        console.log('----', propValue, prop, searchTerm)
        return propValue?.includes(searchTerm);
      });
    });

    return result
  };

  console.log('FFFF', filter, filterData())

  return (
    <div className="border w-full">
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
          !isLoading &&
          <div>
            {
              filterData().map((user: any, index: number) => (
                <UserCard key={`user-item-${index}`} user={user} />
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}