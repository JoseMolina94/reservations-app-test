'use client'

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import DateInput from "../Commons/DateInput";
import HourPicker from "./HourPicker";
import { ReservationContext } from "@/contexts/ReservationsContext";
import DropDown from "../Commons/DropDown";
import ColorPicker from "../Commons/ColorPicker";
import { mutate } from 'swr';
import { isTimeRangeOverlapping } from "@/helpers/blockTimeValidator";
import { getTomorrowDate } from "@/helpers/getTomorrowDate";

export default function AddBlockTimeForm() {
  const { reservationSelected, usersList, reservationsList, setReservationSelected } = useContext(ReservationContext)
  const [editMode, setEditMode] = useState<boolean>(false)
  const DEFAULT_VALUES = {
    user: '',
    startTime: '00:00',
    endTime: '00:00',
    date: getTomorrowDate(),
    color: '#ff0000'
  }
  const [formData, setFormData] = useState<any>(DEFAULT_VALUES);

  const clearForm = () => {
    if (reservationSelected?.id) {
      setReservationSelected(null)
    }

    setFormData(DEFAULT_VALUES);
    setEditMode(false)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const startTime = formData.startTime; 
    const endTime = formData.endTime; 

    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    if (endHours < startHours || (endHours === startHours && endMinutes <= startMinutes)) {
      alert('La hora de finalización debe ser mayor que la hora de inicio.');
      return
    }

    if (isTimeRangeOverlapping(reservationsList, formData, editMode)) {
      alert('El rango de horas seleccionado ya está en uso. Por favor, elige otro.');
      return
    }

    try {
      const response = await fetch('/api/block-times', {
        method: !editMode ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el bloque de tiempo');
      }

      mutate('/api/block-times')

      clearForm()

      console.log('Blocque de tiempo guardado correctamente');
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (reservationSelected?.id) {
      setFormData(reservationSelected)
      setEditMode(true)
    } else {
      setFormData(DEFAULT_VALUES)
      setEditMode(false)
    }
  }, [reservationSelected?.id])

  return (
    <div className="border rounded-md border-gray-400 w-full h-auto" >
      <div className="border-b border-gray-400 mb-3 min-w-[200px] w-full px-2 text-lg py-1 font-medium " >
        {!editMode ? 'Crear bloque de tiempo' : 'Editar bloque de tiempo'}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col px-2 pb-4 gap-2">
        <DropDown
          name="user"
          onChange={handleDropDownChange}
          label="Usuario ligado"
          options={usersList || []}
          value={formData.user}
          labelProp="name"
          valueProp="id"
          getCompleteObject
          required
        />

        <DateInput
          label="Fecha"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
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
              required
            />
            <span> - </span>
            <HourPicker
              name="endTime"
              onChange={handleSelectChange}
              value={formData.endTime}
              noLabel
              interval={30}
              required
            />
          </div>
        </div>

        <ColorPicker
          name='color'
          onChange={handleInputChange}
          value={formData.color}
        />

        <div className="flex gap-2 items-center w-full">
          <button
            type="button"
            className="bg-orange-500 text-white py-1 rounded-md w-full"
            onClick={() => clearForm()}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 rounded-md w-full"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}