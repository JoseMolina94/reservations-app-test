
type UserCardProps = {
  user: any
}

export default function UserCard ({ user } : UserCardProps) {
  const avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`;

  return (
    <div className="border-t border-b grid grid-cols-6 justify-center items-center px-3 py-2 " >
      <div>
        <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
      </div>
      <p>{user.name}</p>
      <p>{user.phone}</p>
      <p>{user.email}</p>
      <p>{user.address}</p>
      <div />
    </div>
  )
} 