// import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData()
//     const file = formData.get('image') as File
//     const title = formData.get('title') as string

//     const uploadFormData = new FormData()
//     uploadFormData.append('image', file)
//     uploadFormData.append('title', title)

//     const response = await fetch('http://ec2-3-214-82-117.compute-1.amazonaws.com:8001/', {
//       method: 'POST',
//       body: uploadFormData,
//     })

//     if (!response.ok) {
//       throw new Error('Upload failed')
//     }

//     const data = await response.json()
//     return NextResponse.json(data)
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to upload file' },
//       { status: 500 }
//     )
//   }
// }


import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    
    // Forward to Django
    const djangoFormData = new FormData()
    djangoFormData.append('image', file)
    djangoFormData.append('title', 'Image Upload')

    const response = await fetch('http://ec2-3-214-82-117.compute-1.amazonaws.com:8001/', {
      method: 'POST',
      body: djangoFormData
    })

    if (!response.ok) {
      throw new Error('Django upload failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
