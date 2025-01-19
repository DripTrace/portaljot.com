import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  try {
    const response = await fetch(
      `http://ec2-3-214-82-117.compute-1.amazonaws.com:8001/upload-progress/?progress_id=${id}`
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get progress' },
      { status: 500 }
    )
  }
}
