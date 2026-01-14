# Database Connection Testing Guide

This guide will help you test your MongoDB database connection step by step.

## Prerequisites

- Node.js installed
- MongoDB instance (local or cloud like MongoDB Atlas)
- MongoDB connection string

## Step-by-Step Instructions

### Step 1: Install Dependencies

First, make sure all dependencies are installed:

```bash
npm install
```

This will install the required packages including `tsx` which is needed to run the test script.

### Step 2: Set Up Environment Variables

1. **Create a `.env` file** in the root directory of your project (same level as `package.json`)

2. **Add your MongoDB connection string** to the `.env` file:

   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   ```

   **Examples:**
   - **Local MongoDB:**
     ```env
     MONGODB_URI=mongodb://localhost:27017/stocks_app
     ```
   - **MongoDB Atlas (Cloud):**
     ```env
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
     ```
   - **MongoDB with Authentication:**
     ```env
     MONGODB_URI=mongodb://username:password@localhost:27017/stocks_app?authSource=admin
     ```

3. **Optional:** Add Node environment variable:
   ```env
   NODE_ENV=development
   ```

### Step 3: Get Your MongoDB Connection String

#### Option A: Local MongoDB

If you're running MongoDB locally:

- Default connection: `mongodb://localhost:27017/stocks_app`
- If you have authentication: `mongodb://username:password@localhost:27017/stocks_app?authSource=admin`

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create an account
3. Create a new cluster (or use an existing one)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database user password
8. Replace `<database>` with your database name (e.g., `stocks_app`)

### Step 4: Run the Test Script

Run the database connection test:

```bash
npm run test:db
```

Or directly with tsx:

```bash
npx tsx scripts/test-db-connection.ts
```

### Step 5: Check the Results

#### ✅ Success Output

If the connection is successful, you'll see:

```
🔍 Testing database connection...

✅ MONGODB_URI is set
📍 Connection string: mongodb://***:***@...

🔄 Attempting to connect to MongoDB...
✅ Successfully connected to MongoDB!
📊 Database name: stocks_app
🔌 Connection state: Connected

🧪 Testing database operations...
📁 Found X collection(s) in the database
   Collections:
   - collection1
   - collection2

✅ All tests passed! Your database connection is working correctly.
🔌 Connection closed.
```

#### ❌ Error Output

If there's an error, you'll see helpful messages:

- **Missing URI:** The script will tell you to create a `.env` file
- **Authentication failed:** Check your username/password
- **Connection timeout:** Check your network/firewall
- **Host not found:** Verify your MongoDB URL is correct

### Step 6: Troubleshooting

#### Problem: "Missing MongoDB URI"

**Solution:**

- Make sure you have a `.env` file in the root directory
- Check that `MONGODB_URI` is spelled correctly
- Restart your terminal/IDE after creating the `.env` file

#### Problem: "Authentication failed"

**Solution:**

- Verify your username and password in the connection string
- Make sure your MongoDB user has the correct permissions
- For MongoDB Atlas, check your IP whitelist settings

#### Problem: "Connection timeout" or "ENOTFOUND"

**Solution:**

- Check if MongoDB is running (for local installations)
- Verify your network connection
- Check firewall settings
- For MongoDB Atlas, ensure your IP address is whitelisted

#### Problem: "Cannot find module 'tsx'"

**Solution:**

```bash
npm install --save-dev tsx
```

### Step 7: Test in Your Application

Once the test script passes, you can use the database connection in your app:

```typescript
import { connectToDatabase } from '@/database/mongoose';

// In an API route or server component
const connection = await connectToDatabase();
// Now you can use mongoose models
```

## Additional Notes

- The `.env` file is already in `.gitignore`, so it won't be committed to version control
- Never commit your actual connection string with passwords to Git
- For production, use environment variables provided by your hosting platform
- The connection uses caching to avoid multiple connections in development

## Next Steps

After confirming your database connection works:

1. Create your Mongoose models/schemas
2. Use the connection in your API routes
3. Test CRUD operations
4. Set up your user authentication models

---

**Need help?** Check the error messages from the test script - they include helpful tips for common issues!
