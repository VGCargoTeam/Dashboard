import fs from 'fs'; import path from 'path';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const body = req.body;
  const ref = "CC-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + Math.random().toString(36).substr(2, 4).toUpperCase();
  const newEntry = { ref, date: body.flightDate, tonnage: parseInt(body.tonnage), ...body };
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const fileData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
  fileData.push(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
  res.status(200).json({ ref });
}
