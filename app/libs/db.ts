import { Pool } from "pg";

import { ScoreType, UserType } from "@/types/type"





const pool = new Pool({

  connectionString: process.env.POSTGRES_URL + "?sslmode=require",

})

export async function InsertNewUser({email,password,username}:UserType) {
    const result = await pool.query('INSERT INTO wordapp_users (email, password,username) VALUES ($1, $2,$3) RETURNING *', [email, password,username] );
  return result;
}

export async function InsertNewScore({user_id,score}:ScoreType) {
  const result = await pool.query('INSERT INTO wordapp_scores (user_id, score)  VALUES ($1, $2) RETURNING * ', [user_id, score] );
  const increaseGameCount = await pool.query("UPDATE wordapp_users SET total_games = total_games + 1 WHERE id = ($1)", [user_id]);
  
return result;
}

export async function GetScores() {
  const result = await pool.query('SELECT wordapp_scores.*, wordapp_users.username FROM wordapp_scores JOIN wordapp_users ON wordapp_scores.user_id = wordapp_users.id ORDER BY wordapp_scores.score DESC;'  );
return result;
}

export async function GetHighestThree(username:string) {
  const result = await pool.query('SELECT wordapp_scores.*, wordapp_users.username FROM wordapp_scores JOIN wordapp_users ON wordapp_scores.user_id = wordapp_users.id WHERE wordapp_users.username=$1 ORDER BY wordapp_scores.score DESC LIMIT 3;',[username] );
return result;
}
export async function GetLastGames(username:string) {
  const result = await pool.query('SELECT wordapp_scores.*, wordapp_users.username FROM wordapp_scores JOIN wordapp_users ON wordapp_scores.user_id = wordapp_users.id WHERE wordapp_users.username=$1 ORDER BY wordapp_scores.score_date DESC LIMIT 10;',[username] );
return result;
}


export async function SearchEmail(email:string) {
    const result = await pool.query('SELECT * FROM wordapp_users WHERE email = $1 LIMIT 1',[email] );  

    
    if(result.rows.length < 0)
    {
          return null;
    }
  
    return result.rows[0];
  }
  export async function SearchUserName(username:string) {
    
    const result = await pool.query('SELECT * FROM wordapp_users WHERE username = $1', [username]);
      if (result.rows.length === 0) {
    return null;
  }
   return result.rows[0];
  }

export default pool;