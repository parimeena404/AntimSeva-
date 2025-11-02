'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  price: number
  category: string
  description?: string
  image?: string
  available?: boolean
}

export default function PhotoTestPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [errorLog, setErrorLog] = useState<string[]>([])

  const logError = (message: string) => {
    console.error(message)
    setErrorLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const logSuccess = (message: string) => {
    console.log(message)
    setErrorLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ✅ ${message}`])
  }

  // Test photo upload with detailed debugging
  const testPhotoUpload = async (file: File) => {
    try {
      setIsUploading(true)
      setUploadResult(null)
      setErrorLog([])
      
      logSuccess(`Starting upload test for: ${file.name} (${file.size} bytes)`)
      logSuccess(`File type: ${file.type}`)

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size exceeds 10MB limit')
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File is not an image')
      }

      toast.loading('Testing photo upload...')
      
      const formData = new FormData()
      formData.append('file', file)

      logSuccess('FormData created, sending request to /api/admin/upload')

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const responseText = await response.text()
      logSuccess(`Response received - Status: ${response.status}`)
      logSuccess(`Response body: ${responseText}`)

      if (response.ok) {
        const data = JSON.parse(responseText)
        setUploadResult(data)
        
        const imageUrl = data.url || data.imageUrl
        setImagePreview(imageUrl)
        
        logSuccess('Upload successful!')
        logSuccess(`Image URL: ${imageUrl}`)
        toast.success('✅ Photo uploaded successfully!')
        
        return imageUrl
      } else {
        throw new Error(`Upload failed with status ${response.status}: ${responseText}`)
      }
    } catch (error: any) {
      logError(`Upload failed: ${error.message}`)
      toast.error(`❌ Upload failed: ${error.message}`)
      setUploadResult({ error: error.message })
      return null
    } finally {
      setIsUploading(false)
    }
  }

  // Test different upload methods
  const testGoogleDriveConnection = async () => {
    try {
      logSuccess('Testing Google Drive API connection...')
      
      // Create a simple test file
      const testContent = 'Test file for Google Drive connection'
      const testBlob = new Blob([testContent], { type: 'text/plain' })
      const testFile = new File([testBlob], 'test.txt', { type: 'text/plain' })
      
      await testPhotoUpload(testFile)
    } catch (error: any) {
      logError(`Google Drive connection test failed: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📸 Photo Upload Test</h1>
          <p className="text-gray-600">Debug photo upload functionality step by step</p>
        </div>

        {/* Upload Test Section */}
        <Card>
          <CardHeader>
            <CardTitle>🔍 Photo Upload Debug</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-lg font-medium">Select Photo to Test</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {isUploading ? (
                  <div className="space-y-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm text-gray-600">Uploading to Google Drive...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          testPhotoUpload(file)
                        }
                      }}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500">Choose any image file (PNG, JPG, GIF up to 10MB)</p>
                    
                    <div className="flex justify-center space-x-4">
                      <Button 
                        onClick={testGoogleDriveConnection}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={isUploading}
                      >
                        🧪 Test Google Drive Connection
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div>
                <Label className="text-lg font-medium">📷 Image Preview</Label>
                <div className="mt-2 space-y-2">
                  <img 
                    src={imagePreview} 
                    alt="Upload Preview"
                    className="max-w-md h-64 object-contain border rounded bg-white"
                    onLoad={() => logSuccess('Image loaded successfully in preview')}
                    onError={() => logError('Image failed to load in preview')}
                  />
                  <p className="text-sm text-gray-600 break-all">URL: {imagePreview}</p>
                </div>
              </div>
            )}

            {/* Upload Result */}
            {uploadResult && (
              <div>
                <Label className="text-lg font-medium">📊 Upload Result</Label>
                <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
                  {JSON.stringify(uploadResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Debug Log */}
        <Card>
          <CardHeader>
            <CardTitle>📝 Debug Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-64 overflow-auto">
              {errorLog.length === 0 ? (
                <p>No logs yet. Upload a file to see debug information.</p>
              ) : (
                errorLog.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting Guide */}
        <Card>
          <CardHeader>
            <CardTitle>🔧 Troubleshooting Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium text-lg mb-2">Common Issues & Solutions:</h3>
                <div className="space-y-3">
                  <div>
                    <strong>❌ "Failed to upload file":</strong>
                    <p className="text-gray-600">Google Drive API credentials might be incorrect or expired.</p>
                  </div>
                  
                  <div>
                    <strong>❌ Image not loading in preview:</strong>
                    <p className="text-gray-600">Google Drive file permissions might not be set to public.</p>
                  </div>
                  
                  <div>
                    <strong>❌ "File size exceeds limit":</strong>
                    <p className="text-gray-600">Choose a file smaller than 10MB.</p>
                  </div>
                  
                  <div>
                    <strong>✅ Success but image doesn't show:</strong>
                    <p className="text-gray-600">Check the URL format and Google Drive sharing settings.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <h4 className="font-medium text-blue-900 mb-2">Required Google Drive Setup:</h4>
                <ol className="list-decimal list-inside space-y-1 text-blue-800">
                  <li>Google Drive API enabled</li>
                  <li>Service account created with proper credentials</li>
                  <li>Folder ID: 12QvTwqjDMSAa0m8WhuylKHsejMrbMrYH</li>
                  <li>Folder should be shared publicly or with service account</li>
                  <li>Environment variables properly set in Vercel</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
