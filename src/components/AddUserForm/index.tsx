'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../Commons/Input";
import { User } from "@/types/user";
import { mutate } from 'swr';

export default function AddUserForm () {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el usuario');
      }

      mutate('/api/users')

      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });

      console.log('Usuario agregado correctamente');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="border rounded-md border-gray-400 w-full h-auto" >
      <div className="border-b border-gray-400 mb-3 min-w-[200px] w-full px-2 text-lg py-1 font-medium " >
        Nuevo usuario
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
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-1 rounded-md"
        >
          Guardar
        </button>
      </form>
    </div>
  )
}