import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Readable } from 'stream'

// Google Drive setup
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
  },
  scopes: ['https://www.googleapis.com/auth/drive.file']
})

const drive = google.drive({ version: 'v3', auth })

export async function POST(request: NextRequest) {
  try {
    // For development - skip authentication check temporarily
    // TODO: Remove this bypass in production
    const isDev = process.env.NODE_ENV !== 'production'
    
    if (!isDev) {
      // Admin authentication check
      const userCookie = request.cookies.get('user')
      if (!userCookie) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const userData = JSON.parse(userCookie.value)
      if (!userData.isAdmin) {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
      }
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer and create stream
    const buffer = Buffer.from(await file.arrayBuffer())
    const stream = Readable.from(buffer)

    // Upload to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: `${Date.now()}_${file.name}`, // Add timestamp to avoid conflicts
        parents: ['12QvTwqjDMSAa0m8WhuylKHsejMrbMrYH'] // Your shared folder ID
      },
      media: {
        mimeType: file.type,
        body: stream
      }
    })

    // Make file publicly viewable
    await drive.permissions.create({
      fileId: response.data.id!,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    })

    // Return the Google Drive direct link
    const driveUrl = `https://drive.google.com/uc?id=${response.data.id}`
    
    console.log(`File uploaded to Google Drive: ${file.name}, ID: ${response.data.id}`)
    
    return NextResponse.json({ 
      success: true, 
      url: driveUrl,
      fileId: response.data.id,
      filename: file.name,
      size: file.size,
      message: 'File uploaded successfully to Google Drive'
    })

  } catch (error) {
    console.error('Google Drive upload error:', error)
    
    // Fallback to base64 if Google Drive fails
    try {
      const formData = await request.formData()
      const file = formData.get('file') as File
      
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const base64 = buffer.toString('base64')
        const dataUrl = `data:${file.type};base64,${base64}`
        
        return NextResponse.json({ 
          success: true, 
          url: dataUrl,
          filename: file.name,
          size: file.size,
          message: 'File uploaded (fallback to base64 - Google Drive connection failed)'
        })
      }
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError)
    }

    return NextResponse.json(
      { error: 'Failed to upload file' }, 
      { status: 500 }
    )
  }
}
