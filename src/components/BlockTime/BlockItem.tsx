'use client'

import { useContext } from "react";
import { ReservationContext } from "@/contexts/ReservationsContext";
import { User } from "@/types/User";

type BlockItemProps = {
  block: any
  totalHeight?: number
}

export default function BlockItem ({ block, totalHeight = 1440 } : BlockItemProps) {
  const { setReservationSelected, setUserSelected, usersList } = useContext(ReservationContext)

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = timeToMinutes(block.startTime);
  const endMinutes = timeToMinutes(block.endTime);
  const height = ((endMinutes - startMinutes) / 1440) * totalHeight; 
  const top = (startMinutes / 1440) * totalHeight;

  const getUserOwner = () => (
    usersList.find((user: User) => user.id === block.user)
  )

  const onClick = () => {
    setReservationSelected(block)
    setUserSelected(getUserOwner())
  }

  return (
    <div
      key={block.id}
      onClick={onClick}
      className="absolute w-12 flex items-center text-white text-xs border-b rounded-md border-white cursor-pointer opacity-75"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        backgroundColor: block.color || '#4CAF50',
      }}
    />
  );
}