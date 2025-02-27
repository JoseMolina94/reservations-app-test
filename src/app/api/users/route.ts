import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

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

    const { id, name, address, phone, email } = await request.json();

    const newUser = {
      id, 
      name, 
      address, 
      phone, 
      email
    };

    data.users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json({ message: 'Usuario guardado con éxito', data: newUser });
  } catch (error) {
    return Response.json({ error: 'Error al agregar el usuario' }, { status: 500 });
  }
}