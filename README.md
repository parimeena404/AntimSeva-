# Antim Seva - अंतिम सेवा

A comprehensive funeral services website providing essential items and services for final rites. Built with Next.js 15 and MongoDB Atlas cloud database.

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/register-page.png" width="200" alt="Register Page"/><br><em>Registration Page</em></td>
      <td><img src="https://github.com/user-attachments/assets/products-page.png" width="200" alt="Products Page"/><br><em>Products Catalog</em></td>
      <td><img src="https://github.com/user-attachments/assets/packages-page.png" width="200" alt="Packages Page"/><br><em>Package Deals</em></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/home-page.png" width="200" alt="Home Page"/><br><em>Home Page</em></td>
      <td><img src="https://github.com/user-attachments/assets/login-page.png" width="200" alt="Login Page"/><br><em>Login Page</em></td>
      <td></td>
    </tr>
  </table>
</div>

## 🌟 Features

- **User Authentication** - Registration, login, JWT-based auth, Google OAuth
- **Product Catalog** - Individual products and package deals  
- **Shopping Cart** - Add/remove items, user-specific cart management
- **Bilingual Support** - Hindi and English interface
- **Responsive Design** - Mobile-first modern UI

## 🛠️ Tech Stack

**Frontend:** Next.js 15, React 18, TypeScript, Tailwind CSS  
**Backend:** Next.js API Routes, MongoDB Atlas  
**Authentication:** JWT with jose library  
**UI Components:** Radix UI, Lucide React

## 🚀 Quick Start

**Prerequisites:** Node.js 18+, MongoDB Atlas account, pnpm

```bash
# Clone and install
git clone https://github.com/AnuragTiwari1508/Antim-Seva.git
cd Antim-Seva
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and JWT secret

# Start development
pnpm dev
```

## 🗄️ MongoDB Atlas Setup

1. **Create Account:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster:** Choose free tier M0
3. **Get Connection String:** Replace in `.env.local`
4. **IP Whitelist:** Add your IP or `0.0.0.0/0` for development

```bash
# Test connection
node -e "
const { connectToDatabase } = require('./lib/mongodb-native.js');
async function test() {
  try {
    const { db } = await connectToDatabase();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database error:', error.message);
  }
}
test();"
```

## 🔧 Development Commands

```bash
# Development server
pnpm dev

# API Testing
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","phone":"9876543210"}'

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Build & Production
pnpm build
pnpm start
```

## � Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check MONGODB_URI and IP whitelist |
| Port 3000 in use | `kill -9 $(lsof -ti:3000)` or use different port |
| JWT token errors | Clear cookies: `curl -X GET http://localhost:3000/api/auth/logout` |
| Pages not loading | Clear cache: `rm -rf .next && pnpm dev` |

```bash
# Debug commands
DEBUG=* pnpm dev                    # Enable debug logging
lsof -i :3000                      # Check what's using port 3000
curl -v http://localhost:3000/api/debug  # Test API endpoint
```

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Environment Variables for Production
```env
JWT_SECRET=your-production-jwt-secret
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Production Checklist
- [ ] Set strong JWT_SECRET
- [ ] Configure MongoDB Atlas production cluster
- [ ] Set up proper IP whitelisting
- [ ] Configure Google OAuth for production domain
- [ ] Set up SSL/HTTPS
- [ ] Configure CORS if needed

## 🔧 Advanced Configuration

### Custom MongoDB Configuration
```javascript
// lib/mongodb-native.js customization
const client = new MongoClient(uri, {
  tls: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  // Add custom options here
});
```

### JWT Configuration
```javascript
// Custom JWT settings in API routes
const token = jwt.sign(
  { userId: user._id.toString(), email: user.email },
  JWT_SECRET,
  { 
    expiresIn: '7d',  // Customize expiration
    issuer: 'antim-seva',
    audience: 'antim-seva-users'
  }
);
```

## 📊 Performance Optimization

### Database Optimization
```bash
# Create indexes for better performance
node -e "
const { connectToDatabase } = require('./lib/mongodb-native.js');
async function createIndexes() {
  const { db } = await connectToDatabase();
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('carts').createIndex({ userId: 1 });
  console.log('✅ Indexes created');
}
createIndexes();
"
```

### Monitoring Commands
```bash
# Check bundle size
npx @next/bundle-analyzer

# Analyze build
pnpm build && npx next build --profile

# Memory usage
node --max-old-space-size=4096 node_modules/.bin/next dev
```

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript checks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anurag Tiwari**
- GitHub: [@AnuragTiwari1508](https://github.com/AnuragTiwari1508)
- Email: tiwarianurag342407@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for cloud database services
- Tailwind CSS for styling utilities
- Radix UI for accessible components
- Vercel for hosting platform

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed error information
4. Include your environment details (Node.js version, OS, etc.)

---

**Happy Coding! 🚀**
