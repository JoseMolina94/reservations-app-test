import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataUrl = process.env.DATA_URL
    const filePath = path.join(process.cwd(), dataUrl as string, 'block-times.json');
  
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
  
    return Response.json({ success: true, status: 200, data: data.blockTimes});
  } catch (err) {
    return Response.json({ success: false, status: 500, message: err });
  }

}
