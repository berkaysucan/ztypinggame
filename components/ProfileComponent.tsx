"use client"
import {  useEffect, useState } from 'react'
import {Card, CardHeader, CardBody,Divider} from "@nextui-org/react";
import { ScoreType, UserType } from '@/types/type';
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',

  } as Intl.DateTimeFormatOptions;

  interface ProfileComponentProps {
    lastScore: ScoreType[];
    user: UserType;
    highScore: ScoreType[];
  }
const ProfileComponent = ({lastScore,user,highScore}:ProfileComponentProps) => {
  
  

  return (
    <div className='flex flex-col gap-4'>
    
      <Card className="w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-2xl">{user?.username}</p>
        </div>
        
      </CardHeader>
      <Divider/>
    
      <CardBody>
        <p className='text-sm'>Registration Date : <span>{user?.registration_date? new Date(user?.registration_date).toLocaleString('en-us', options) : '--'}</span></p>
        <p className='text-sm'>Total Games Played : <span>{user?.total_games}</span></p>
      </CardBody>
      </Card>

      <Card>
      <CardBody>
        <p>Highest Scores </p>
        <Divider className='my-2'/>

        {highScore.map((score:any,index:any)=>(<span className="text-sm" key={index}>{score.score}</span>))}
      </CardBody>
      </Card>
      <Card>
      
      
      <CardBody>
        <p>Last Scores :</p>
        <Divider className='my-2'/>

        {lastScore?.map((score:any,index:any)=>(<span className="text-sm" key={index}>{score.score}</span>))}
      </CardBody>
      </Card>
    
  </div>
  )
}

export default ProfileComponent