export type UserType = 
{
    id? : string;
    email : string;
    password : string;
    username:string;
    registration_date? : string;
    total_games? : number;
}

export type ScoreType = 
{
    score_id? : string;
    user_id : number;
    score : number;
    score_date?:Date;
    username?:string;
}