'use client'
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import DateInput from "../Commons/DateInput";
import HourPicker from "./HourPicker";
import { ReservationContext } from "@/contexts/ReservationsContext";
import DropDown from "../Commons/DropDown";

export default function AddBlockTimeForm() {
  const { usersList } = useContext(ReservationContext)
  const [editMode, setEditMode] = useState<boolean>(false)
  const DEFAULT_VALUES = {
    userID: '',
    startTime: '00:00',
    endTime: '00:00',
    date: ''
  }
  const [formData, setFormData] = useState<any>(DEFAULT_VALUES);

  const clearForm = () => {
    setFormData(DEFAULT_VALUES)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    console.log('FFFF', formData)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropDownChange = (name: string, value: any) => {
    console.log('YYYY', name, value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="border rounded-md border-gray-400 w-full h-auto" >
      <div className="border-b border-gray-400 mb-3 min-w-[200px] w-full px-2 text-lg py-1 font-medium " >
        {!editMode ? 'Crear bloque de tiempo' : 'Editar bloque de tiempo'}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col px-2 pb-4 gap-2">
        <DropDown
          name="userID"
          onChange={handleDropDownChange}
          label="Usuario ligado"
          options={usersList || []}
          value={formData.userID}
          labelProp="name"
          valueProp="id"
        />

        <DateInput
          label="Fecha"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />

        <div className="space-y-1">
          <p className="text-xs" >Rango de horas</p>
          <div className="flex items-center justify-between gap-2" >
            <HourPicker
              name="startTime"
              onChange={handleSelectChange}
              value={formData.startTime}
              noLabel
              interval={30}
            />
            <span> - </span>
            <HourPicker
              name="endTime"
              onChange={handleSelectChange}
              value={formData.endTime}
              noLabel
              interval={30}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-1 rounded-md w-full"
        >
          Guardar
        </button>
      </form>
    </div>
  )
}