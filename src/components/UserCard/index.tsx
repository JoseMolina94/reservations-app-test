import { ReservationContext } from "@/contexts/ReservationsContext";
import { getTomorrowDate } from "@/helpers/getTomorrowDate";
import { BlockTime } from "@/types/BlockTime";
import { User } from "@/types/User";
import { useContext, useEffect, useState } from "react";

type UserCardProps = {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  const [avatar] = useState<string>(`https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`)
  const [reservationUser, setReservationUser] = useState<BlockTime[] | null>(null)
  const { userSelected, setUserSelected, setReservationSelected, reservationsList } = useContext(ReservationContext)

  const getReservationData = () => {
    return reservationsList.filter(
      (reservation: BlockTime) => (user.reservations.includes(reservation.id as string) && reservation?.date === getTomorrowDate())
    )
  }

  const onClick = () => {
    setUserSelected(user)
    setReservationSelected(getReservationData()[0])
  }

  useEffect(() => {
    setReservationUser(
      getReservationData()
    )
  }, [])

  return (
    <div
      className={`border-t border-gray-400 cursor-pointer border-b grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 justify-center items-center px-3 py-2 
        ${((userSelected?.id || '') === user.id) && 'bg-slate-200'}`
      }
      onClick={() => onClick()}
    >
      <div className="col-span-1">
        <img
          src={avatar}
          alt={user.name}
          className=" w-16 h-16 lg:w-10 lg:h-10 rounded-full"
        />
      </div>
      <p className="col-span-2 truncate">{user?.name}</p>
      <p className="col-span-2 md:col-span-3 lg:col-span-1 truncate">{user?.phone}</p>
      <p className="col-span-2 md:col-span-3 truncate">{user?.email}</p>
      <p className="col-span-2 lg:col-span-4 truncate">{user?.address}</p>

      <div
        className="w-full h-auto col-span-2 md:col-span-1 flex md:flex-row flex-col"
      >
        {
          reservationUser?.map((r: BlockTime, index: number) => (
            <div
              key={`reservation-item-ref-${user.name}-${index}`}
              style={{
                backgroundColor: r?.color || '#ffffff'
              }}
              className="w-full h-4 md:w-8 md:h-8 rounded-md opacity-75"
            />
          ))
        }
      </div>

    </div>
  )
} 