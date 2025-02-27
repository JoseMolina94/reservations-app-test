'use client'

import React from "react"
import useSWR from 'swr'
import UserCard from "../UserCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersList () {

  const { data: usersList, error, isLoading } = useSWR('/api/users', fetcher);
  console.log('DDDD', usersList)

  return (
    <div className="border w-full">
      <div className="flex gap-2 justify-between px-3 py-2 bg-gray-400" >
        <h1 className="text-2xl font-semibold" >Lista de usuarios</h1>
      </div>
      <div>
        {
          !isLoading &&
          <div>
            {
              usersList.map((user: any, index: number) => (
                <UserCard key={`user-item-${index}`} user={user} />
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}