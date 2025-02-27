'use client'

import { ChangeEvent, FormEvent, useState, useContext, useEffect } from "react";
import Input from "../Commons/Input";
import { User } from "@/types/user";
import { mutate } from 'swr';
import { ReservationContext } from "@/contexts/ReservationsContext";

export default function AddOrEditUserForm() {
  const { userSelected, setUserSelected } = useContext(ReservationContext)
  const DEFAULT_VALUES = {
    name: '',
    email: '',
    phone: '',
    address: '',
  }
  const [formData, setFormData] = useState<User>(DEFAULT_VALUES);
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearForm = () => {
    if (userSelected?.id) {
      setUserSelected(null)
    }

    setFormData(DEFAULT_VALUES);
    setEditMode(false)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users', {
        method: !editMode ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el usuario');
      }

      mutate('/api/users')

      clearForm()

      console.log('Usuario guardado correctamente');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      mutate('/api/users')

      clearForm()

      console.log('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (userSelected?.id) {
      setFormData(userSelected)
      setEditMode(true)
    } else {
      setFormData(DEFAULT_VALUES)
      setEditMode(false)
    }
  }, [userSelected?.id])

  return (
    <div className="border rounded-md border-gray-400 w-full h-auto" >
      <div className="border-b border-gray-400 mb-3 min-w-[200px] w-full px-2 text-lg py-1 font-medium " >
        {!editMode ? 'Nuevo usuario' : 'Editar usuario'}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col px-2 pb-4 gap-2">
        <Input
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          label="E-mail"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          label="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <Input
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <div className="space-y-2">
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

          {
            editMode &&
            <button
              type="button"
              className="bg-red-500 text-white py-1 rounded-md w-full"
              onClick={() => deleteUser()}
            >
              Eliminar usuario
            </button>
          }

        </div>
      </form>
    </div>
  )
}