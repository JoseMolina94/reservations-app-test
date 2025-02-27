import React from "react"

type TagProps = {
  label: string,
  className?: string
}

export default function Tag (props : TagProps) {
  const {
    label,
    className = ""
  } = props

  return (
    <div className={`bg-gray-300 rounded-md ${className} px-3 py-1 text-xs cursor-default w-fit h-fit`}>
      {label}
    </div>
  )
}