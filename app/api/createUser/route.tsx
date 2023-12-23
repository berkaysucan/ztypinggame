import pool, { InsertNewUser, SearchEmail } from "@/app/libs/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"





export async function POST(request: Request) {
  
        // Kullanıcıdan gelen JSON verisini çıkar
        const requestData = await request.json();
        
        const { email, password,username  } = requestData;
        // Kullanıcıyı veritabanına ekleyin
        
        
        const search = await SearchEmail(email);
        
        
        if(search)
        {
          return new NextResponse ("User Exist",{status: 200});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await InsertNewUser({ email:email, password: hashedPassword ,username:username});
  
        
        return new NextResponse ("User registered succesfully!.",{status: 200});
  
    

  }