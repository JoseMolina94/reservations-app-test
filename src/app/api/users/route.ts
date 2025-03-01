import { User } from '@/types/User';
import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';
import { generateRandomId } from '@/helpers/randomID';

export async function GET() {
  try {
    const dataUrl = process.env.DATA_URL
    const filePath = path.join(process.cwd(), dataUrl as string, 'users.json');
  
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
  
    return Response.json(data.users || []);
  } catch (err) {
    return Response.json([]);
  }
}

export async function POST(request: NextRequest) {
  const dataUrl = process.env.DATA_URL
  const filePath = path.join(process.cwd(), dataUrl as string, 'users.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    const { name, address, phone, email } = await request.json();

    const newUser = {
      id: generateRandomId(6), 
      name, 
      address, 
      phone, 
      email,
      reservations: []
    };

    data.users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json({ message: 'Usuario guardado con éxito', data: newUser });
  } catch (error) {
    return Response.json({ error: 'Error al agregar el usuario' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const dataUrl = process.env.DATA_URL
  const filePath = path.join(process.cwd(), dataUrl as string, 'users.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    const { id, name, address, phone, email, reservations } = await request.json();

    const userToUpdate = data.users.find((user: User) => user.id === id);

    if (userToUpdate) {
      userToUpdate.name = name
      userToUpdate.address = address
      userToUpdate.phone = phone
      userToUpdate.email = email
      userToUpdate.reservations = reservations

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return Response.json({ message: 'Bloque de tiempo actualizado', data: userToUpdate });
    } else {
      return Response.json({ error: 'Bloque de tiempo no encontrado' }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ error: 'Error al actualizar el bloque de tiempo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const dataUrl = process.env.DATA_URL
  const filePath = path.join(process.cwd(), dataUrl as string, 'users.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    const { id } = await request.json();

    data.users = data.users.filter((user: User) => user.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json({ message: 'Usuario eliminado' });
  } catch (error) {
    return Response.json({ error: 'Error al eliminar el usuario' }, { status: 500 });
  }
}