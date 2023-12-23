import pool, { InsertNewScore, InsertNewUser, SearchEmail } from "@/app/libs/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"





export async function POST(request: Request) {
  
        // Kullanıcıdan gelen JSON verisini çıkar
        const requestData = await request.json();
        
        const { score, email  } = requestData;
        // Kullanıcıyı veritabanına ekleyin
        
        
        const search = await SearchEmail(email);
        
        

        if(search)
        {
          const result = await InsertNewScore({ score:score, user_id: search?.id });
          const increaseGameCount = await pool.query("UPDATE wordapp_users SET total_games = total_games + 1 WHERE id = $1", [search?.id]);
          return new NextResponse ("Score saved to succesfully",{status: 200});
        }
        
        return new NextResponse ("You need to login to save your score ! ",{status: 200});
        
  
        
        
  
    

  }