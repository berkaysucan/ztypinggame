// Import necessary modules and functions
import pool, { InsertNewUser, SearchEmail } from "@/app/libs/db";
import { NextResponse } from "next/server";

// Define the POST method
async function POST(request: Request) {
  const email = await request.json();
 
 
  const search = await SearchEmail(email );

 
  
  if (!search) {
    return new NextResponse("Error", { status: 200 });
  }

  return new NextResponse(JSON.stringify(search), { status: 200, headers: { "Content-Type": "application/json" } });
}

// Export the POST method
export { POST };