'use client'

import { ChangeEvent, useEffect, useState } from 'react';

interface DropDownProps {
  value: any
  onChange: (name: string, value: any) => void
  name: string
  noLabel?: boolean
  interval?: number
  label?: string
  options: any[]
  valueProp?: string
  labelProp?: string
  getCompleteObject?: boolean
  required?: boolean
}

export default function DropDown (props : DropDownProps) {
  const { 
    value, 
    onChange = (name: string, value: any) => {}, 
    name,
    noLabel = false,
    label = '',
    options = [],
    valueProp = 'value',
    labelProp = 'label',
    getCompleteObject = false,
    required = false
  } = props
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [onOpen, setOnOpen] = useState<boolean>(false)

  const onChangeFunc = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const assingValue = (valueToAssign: any) => {
    onChange(name, valueToAssign)
    setOnOpen(false)
  }

  const filteredOptions = () => options.filter((option: any) =>
    option[labelProp].toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSearchTerm(() => {
      let found = null

      if (!getCompleteObject) {
        found = options.find((option: any) => option[valueProp] === value) || null
      } else {
        found = options.find((option: any) => option[valueProp] === value[valueProp]) || null
      }

      if (found) {
        return found[labelProp]
      }

      return ''
    })
  }, [value])

  return (
    <div>
      {
        !noLabel &&
          <p className="text-xs">
            {label}
          </p>
      }
      
      <div className="w-full relative ">
        <input
          type="text"
          placeholder="Buscar Usuario"
          value={searchTerm}
          onChange={(e) => onChangeFunc(e)}
          className="border p-1 rounded-md w-full mb-2 text-xs"
          onFocus={() => setOnOpen(true)}
          required={required}
        />

        {
          onOpen &&
            <div 
              style={{ scrollbarWidth: 'none' }} 
              className='border rounded-md bg-white absolute max-h-48 overflow-auto z-[1] border-gray-400 w-full' 
            >
              {filteredOptions().map((option: any, index: number) => (
                <div 
                  key={`option-item-${index}`}
                  onClick={() => assingValue(
                    !getCompleteObject ? option[valueProp] : option
                  )}
                  className='cursor-pointer hover:bg-slate-300 p-2'
                >
                  {option[labelProp]}
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  )
}