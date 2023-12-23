import { SearchUserName } from '@/app/libs/db';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  
 
  try {
    if (!username) throw new Error('');
    const result = await SearchUserName(username);
    return NextResponse.json({ result }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
// }
}