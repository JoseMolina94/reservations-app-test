import { User } from "./User"


export interface BlockTime {
  id?: string
  startTime: string
  endTime: string
  color: string
  date: string
  user: User
}