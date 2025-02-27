'use client'

import { User } from "@/types/User";
import { createContext, ReactNode, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ReservationContext = createContext<any>(null)

type ReservationContextProviderProps = {
  children: ReactNode
}

export default function ReservationContextProvider ({ children }: ReservationContextProviderProps) {
  const { data: reservationsList, isLoading: reservationsLoading } = useSWR('/api/block-times', fetcher);
  const { data: usersList, isLoading: usersLoading } = useSWR('/api/users', fetcher);
  const [userSelected, setUserSelected] = useState<User | null>(null)
  const [reservationSelected, setReservationSelected] = useState<User | null>(null)

  return (
    <ReservationContext.Provider 
      value={{
        reservationsList,
        reservationsLoading,
        userSelected,
        setUserSelected,
        reservationSelected,
        setReservationSelected,
        usersList,
        usersLoading
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}