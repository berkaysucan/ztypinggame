import pool, { GetScores } from "@/app/libs/db"
import { NextResponse } from "next/server"





export async function GET(request: Request) {
  
          
        
        const search = await GetScores();
        
        const responseData = JSON.stringify(search.rows);
        
        if(!search)
        {
            return new NextResponse("Error", { status: 200 });       
        }
        

  
        
        return new NextResponse(responseData, { status: 200, headers: { "Content-Type": "application/json" } });
  
    

  }