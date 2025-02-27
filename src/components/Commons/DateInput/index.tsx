import { ChangeEvent } from "react"

type Input = {
  label: string
  placeholder?: string
  value?: string | number
  name: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export default function DateInput (props: Input) {
  const { 
    label,
    placeholder = "",
    value = "",
    name,
    onChange = (e: ChangeEvent<HTMLInputElement>) => {},
    required = false
  } = props

  console.log(value)

  return (
    <div className="block">
      <p className="text-xs">{label}</p>
      <input
        type="date"
        name={name}
        placeholder={placeholder}
        className="text-xs border w-full border-gray-400 px-1 py-1 rounded-md"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}