import { GetHighestThree, GetLastGames, SearchUserName } from "@/app/libs/db";
import ProfileComponent from "@/components/ProfileComponent";
import { ScoreType, UserType } from "@/types/type";


interface pageProps {
  params:{username:string[]};
}


const Profile = async ({params}:pageProps) => {


  const param = params.username;

  if(param)
  {

  const lastScore:ScoreType[] = await GetLastGames(param[0]).then((res) => res.rows);
  
  // const user:UserType = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getFullUser?username=${param}`).then((res) => res.json()).then((res) => res.result);
  const user:UserType = await SearchUserName(param[0]);


  const highScore:ScoreType[] = await GetHighestThree(param[0]).then((res) => res.rows);
  
    
  return <ProfileComponent lastScore={lastScore} user={user} highScore={highScore}/>
	
  }
  
  
 
}

export default Profile