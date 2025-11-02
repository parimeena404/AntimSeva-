# Google Login Setup Guide

## Overview

This guide explains how to set up Google OAuth login for the Antim Seva E-commerce application.

## Prerequisites

1. A Google Cloud Platform account
2. Node.js and npm installed

## Installation Steps

### 1. Install Required Packages

```bash
npm install @react-oauth/google jwt-decode
```

### 2. Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add your domain to the "Authorized JavaScript origins" (e.g., http://localhost:3000 for development)
7. Add your redirect URI to the "Authorized redirect URIs" (e.g., http://localhost:3000)
8. Click "Create" and note your Client ID

### 3. Configure Environment Variables

Add your Google Client ID to your `.env.local` file:

```
GOOGLE_CLIENT_ID=your-client-id-here
```

### 4. Set Up Google OAuth Provider

Update your `app/layout.js` file to include the Google OAuth provider:

```jsx
'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {/* Your existing providers */}
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
```

### 5. Update Login Page Implementation

Replace the placeholder Google login button with a functional one:

```jsx
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

// Inside your LoginPage component
const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);
    
    // Extract user data from decoded token
    const userData = {
      name: decoded.name,
      email: decoded.email,
      googleId: decoded.sub,
      profileImage: decoded.picture,
    };
    
    // Call the googleLogin function from AuthContext
    await googleLogin(credentialResponse.credential, userData);
    router.push('/');
  } catch (error) {
    setFormError(error.message || 'Google login failed');
  }
};

// Replace the placeholder button with:
<div className="flex justify-center my-4">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => setFormError('Google login failed')}
    text="signin_with"
    shape="rectangular"
    locale="en"
    theme="outline"
    size="large"
  />
</div>
```

### 6. Fix the Google API Route

Update the `app/api/auth/google/route.js` file to import bcrypt:

```js
import bcrypt from 'bcryptjs';
```

## Testing

1. Start your development server: `npm run dev`
2. Navigate to the login page
3. Click the "Login with Google" button
4. Complete the Google authentication flow
5. You should be redirected to the home page after successful authentication

## Troubleshooting

- If you encounter CORS issues, ensure your domain is properly added to the Google Cloud Console
- Check browser console for any JavaScript errors
- Verify that your environment variables are correctly set
- Ensure all required packages are installed

## Security Considerations

- Always validate Google tokens on the server side
- Store sensitive information in environment variables
- Use HTTPS in production
- Implement proper error handling