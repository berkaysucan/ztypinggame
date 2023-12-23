import TableComponent from '@/components/TableComponent'
import { GetScores } from '../libs/db';
import { ScoreType } from '@/types/type';

export const revalidate = 0

const  LeaderBoard = async () => {

 
  
  const scores:ScoreType[] = (await GetScores().then((res) => res.rows));

  return <div>
    
    <TableComponent scores={scores}  />
  </div>
}

export default LeaderBoard
