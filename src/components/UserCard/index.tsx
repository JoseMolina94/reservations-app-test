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
      className={`border-t border-gray-400 cursor-pointer border-b grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 justify-center items-center px-3 py-2 
        ${((userSelected?.id || '') === reservation?.user.id) && 'bg-slate-200'}`
      }
      onClick={() => onClick()}
    >
      <div className="col-span-1">
        <img
          src={avatar}
          alt={reservation?.user.name}
          className=" w-16 h-16 lg:w-10 lg:h-10 rounded-full"
        />
      </div>
      <p className="col-span-2 truncate">{reservation?.user?.name}</p>
      <p className="col-span-2 md:col-span-3 lg:col-span-1 truncate">{reservation?.user?.phone}</p>
      <p className="col-span-2 md:col-span-3 truncate">{reservation?.user?.email}</p>
      <p className="col-span-2 lg:col-span-4 truncate">{reservation?.user?.address}</p>

      <div
        style={{
          backgroundColor: reservation?.color
        }}
        className=" w-full h-4 md:w-8 md:h-8 rounded-md opacity-75 col-span-2 md:col-span-1"
      />
      <div />
    </div>
  )
} 