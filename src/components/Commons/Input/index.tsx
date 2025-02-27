import { ChangeEvent } from "react"

type Input = {
  label: string
  placeholder?: string
  value?: string | number
  name: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input (props: Input) {
  const { 
    label,
    placeholder = "",
    value = "",
    name,
    onChange = (e: ChangeEvent<HTMLInputElement>) => {}
  } = props

  return (
    <div className="block">
      <p className="text-xs">{label}</p>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="text-xs border w-full border-gray-400 px-1 py-1 rounded-md"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}