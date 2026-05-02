import type { NextApiRequest, NextApiResponse } from "next";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcDA5MDdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzg5NiwiaWF0IjoxNzc3NzAyOTk2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZDAxNmYyZTEtMjhiOC00MmQwLWIyYTEtNWM4OWRlNDU2ZWQ0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWJoaXNoZWsgcHVkdWdvc3VsYSIsInN1YiI6IjU1NTIxZjExLWRkMTgtNDJhOC04Y2FlLTZkZWI5ZTIxMmQ0MyJ9LCJlbWFpbCI6ImFwMDkwN0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFiaGlzaGVrIHB1ZHVnb3N1bGEiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTE5NDEiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI1NTUyMWYxMS1kZDE4LTQyYTgtOGNhZS02ZGViOWUyMTJkNDMiLCJjbGllbnRTZWNyZXQiOiJ1eVp5RldnZldlcEZxTUp6In0.IJErQgShqssP4Ty43mPdQAE8K8ZOCXkw1DeC47kyWEw"; // your token

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
}