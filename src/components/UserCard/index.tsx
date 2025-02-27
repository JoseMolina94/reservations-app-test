import { ReservationContext } from "@/contexts/ReservationsContext";
import { BlockTime } from "@/types/BlockTime";
import { useContext, useState } from "react";

type UserCardProps = {
  reservation: BlockTime
}

export default function UserCard({ reservation }: UserCardProps) {
  const [avatar] = useState<string>(`https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`)
  const { userSelected, setUserSelected, setReservationSelected } = useContext(ReservationContext)

  const onClick = () => {
    setUserSelected(reservation?.user)
    setReservationSelected(reservation)
  }

  return (
    <div
      className={`border-t cursor-pointer border-b grid grid-cols-6 justify-center items-center px-3 py-2 
        ${((userSelected?.id || '') === reservation?.user.id) && 'bg-slate-200'}`
      }
      onClick={() => onClick()}
    >
      <div>
        <img
          src={avatar}
          alt={reservation?.user.name}
          className="w-10 h-10 rounded-full"
        />
      </div>
      <p>{reservation?.user?.name}</p>
      <p>{reservation?.user?.phone}</p>
      <p>{reservation?.user?.email}</p>
      <p>{reservation?.user?.address}</p>

      <div
        style={{
          backgroundColor: reservation?.color
        }}
        className="w-8 h-8 rounded-md opacity-75"
      />
      <div />
    </div>
  )
} 