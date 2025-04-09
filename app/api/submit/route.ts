import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const data = await request.json()
  console.log("Server recieved data: ", { ...data, password: "<redacted>", confirmPassword: "<redacted>" })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return Response.json({ status: "success" })
}
