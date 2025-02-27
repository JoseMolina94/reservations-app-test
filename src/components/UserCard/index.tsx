import { ReservationContext } from "@/contexts/ReservationsContext";
import { useContext, useState } from "react";

type UserCardProps = {
  user: any
}

export default function UserCard ({ user } : UserCardProps) {
  const [avatar] = useState<string>(`https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`)
  const { userSelected, setUserSelected } = useContext(ReservationContext)

  return (
    <div 
      className={`border-t cursor-pointer border-b grid grid-cols-6 justify-center items-center px-3 py-2 
        ${ ((userSelected?.id || '') === user.id) && 'bg-slate-200' }`
      }
      onClick={() => setUserSelected(user)}
    >
      <div>
        <img 
          src={avatar} 
          alt={user.name}
          className="w-10 h-10 rounded-full" 
        />
      </div>
      <p>{user.name}</p>
      <p>{user.phone}</p>
      <p>{user.email}</p>
      <p>{user.address}</p>
      <div />
    </div>
  )
} 