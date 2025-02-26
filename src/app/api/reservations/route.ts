import { NextRequest } from "next/server";

export async function GET() {
  return Response.json({ message: 'Esta es la respuesta de la API para /api/reservation' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return Response.json({ message: 'Reserva recibida', data: body });
}