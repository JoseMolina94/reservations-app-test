import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';
import { generateRandomId } from '@/helpers/randomID';
import { BlockTime } from '@/types/BlockTime';

export async function GET() {
  try {
    const dataUrl = process.env.DATA_URL
    const filePath = path.join(process.cwd(), dataUrl as string, 'blocktimes.json');
  
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
  
    return Response.json(data.blockTimes || []);
  } catch (err) {
    return Response.json([]);
  }
}

export async function POST(request: NextRequest) {
  const dataUrl = process.env.DATA_URL
  const filePath = path.join(process.cwd(), dataUrl as string, 'blocktimes.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    const { startTime, endTime, color, user, date } = await request.json();

    const newBlockTime = {
      id: generateRandomId(6), 
      startTime, 
      endTime, 
      color,
      user,
      date
    };

    data.blockTimes.push(newBlockTime);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json({ message: 'Bloque de tiempo guardado con éxito', data: newBlockTime });
  } catch (error) {
    return Response.json({ error: 'Error al agregar el bloque de tiempo' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const dataUrl = process.env.DATA_URL
  const filePath = path.join(process.cwd(), dataUrl as string, 'blocktimes.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    const { id, startTime, endTime, color, user, date } = await request.json();

    const blockToUpdate = data.blockTimes.find((block: BlockTime) => block.id === id);

    if (blockToUpdate) {
      blockToUpdate.startTime = startTime;
      blockToUpdate.endTime = endTime;
      blockToUpdate.color = color
      blockToUpdate.user = user
      blockToUpdate.date = date

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return Response.json({ message: 'Bloque de tiempo actualizado', data: blockToUpdate });
    } else {
      return Response.json({ error: 'Bloque de tiempo no encontrado' }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ error: 'Error al actualizar el bloque de tiempo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const dataUrl = process.env.DATA_URL
  const filePath = path.join(process.cwd(), dataUrl as string, 'blocktimes.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    const { id } = await request.json();

    data.blockTimes = data.blockTimes.filter((block: BlockTime) => block.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json({ message: 'Bloque de tiempo eliminado' });
  } catch (error) {
    return Response.json({ error: 'Error al eliminar el bloque de tiempo' }, { status: 500 });
  }
}