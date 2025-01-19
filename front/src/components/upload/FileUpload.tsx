// 'use client'

// import { useState } from 'react'

// export default function ImageUpload() {
//   const [file, setFile] = useState<File>()
//   const [uploading, setUploading] = useState(false)

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     if (!file) return

//     setUploading(true)
//     const formData = new FormData()
//     formData.append('image', file)
//     formData.append('title', 'My Image Title')

//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       })
      
//       if (!response.ok) {
//         throw new Error('Upload failed')
//       }
      
//       // Handle successful upload
//       const data = await response.json()
//       console.log('Upload successful:', data)
//     } catch (error) {
//       console.error('Upload error:', error)
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="file"
//         accept="image/*"
//         onChange={(e) => setFile(e.target.files?.[0])}
//         disabled={uploading}
//       />
//       <button 
//         type="submit" 
//         disabled={!file || uploading}
//       >
//         {uploading ? 'Uploading...' : 'Upload'}
//       </button>
//     </form>
//   )
// }


// 'use client'

// import { useState } from 'react'

// export default function FileUpload() {
//   const [progress, setProgress] = useState<number>(0)
//   const [uploading, setUploading] = useState(false)

//   async function uploadFile(file: File) {
//     const progressId = Date.now().toString()
//     const formData = new FormData()
//     formData.append('file', file)

//     setUploading(true)
    
//     try {
//       // Start upload
//       const uploadPromise = fetch('/api/upload', {
//         method: 'POST',
//         body: formData
//       })

//       // Poll progress
//       const progressInterval = setInterval(async () => {
//         const progressResponse = await fetch(`/api/progress?progress_id=${progressId}`)
//         const { progress } = await progressResponse.json()
//         setProgress(progress)
        
//         if (progress === 100) {
//           clearInterval(progressInterval)
//         }
//       }, 1000)

//       await uploadPromise
//       clearInterval(progressInterval)
//       setProgress(100)
//     } catch (error) {
//       console.error('Upload failed:', error)
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <div>
//       <input 
//         type="file"
//         onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
//         disabled={uploading}
//       />
//       {uploading && <progress value={progress} max="100" />}
//     </div>
//   )
// }


'use client'

import { useState } from 'react'

export default function ImageUpload() {
  const [progress, setProgress] = useState<number>(0)
  const [uploading, setUploading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setUploading(true)

    try {
      // Upload to Next.js API route first
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed')

      // Poll for progress
      const uploadId = await response.json()
      const progressInterval = setInterval(async () => {
        const progressResponse = await fetch(`/api/upload/progress?id=${uploadId}`)
        const { progress } = await progressResponse.json()
        setProgress(progress)
        
        if (progress === 100) {
          clearInterval(progressInterval)
        }
      }, 1000)

    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="file" 
        name="image"
        accept="image/*"
        disabled={uploading}
      />
      {uploading && (
        <div>
          <progress value={progress} max="100" />
          <span>{progress}%</span>
        </div>
      )}
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  )
}
