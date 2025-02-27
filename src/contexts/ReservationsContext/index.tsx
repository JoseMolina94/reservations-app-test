'use client'

import { User } from "@/types/user";
import { createContext, ReactNode, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ReservationContext = createContext<any>(null)

type ReservationContextProviderProps = {
  children: ReactNode
}

export default function ReservationContextProvider ({ children }: ReservationContextProviderProps) {
  const { data: usersList, isLoading, isValidating, mutate } = useSWR('/api/users', fetcher);
  const [userSelected, setUserSelected] = useState<User | null>(null)

  return (
    <ReservationContext.Provider 
      value={{
        usersList,
        isLoading,
        isValidating,
        mutate,
        userSelected,
        setUserSelected
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}