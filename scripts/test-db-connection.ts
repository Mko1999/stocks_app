/**
 * Database Connection Test Script
 *
 * This script tests your MongoDB connection.
 * Run it with: npx tsx scripts/test-db-connection.ts
 */

// IMPORTANT: Load environment variables FIRST, before any other imports
// This ensures process.env is populated before mongoose.ts reads it
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env file from the root directory
dotenv.config({ path: resolve(process.cwd(), '.env') });

// Now import after dotenv has loaded
import { connectToDatabase } from '../database/mongoose';

async function testConnection() {
  console.log('🔍 Testing database connection...\n');

  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error('❌ ERROR: MONGODB_URI environment variable is not set!');
      console.log('\n📝 Please create a .env file in the root directory with:');
      console.log('   MONGODB_URI=your_mongodb_connection_string');
      console.log('\n💡 Example:');
      console.log('   MONGODB_URI=mongodb://localhost:27017/stocks_app');
      console.log('   or');
      console.log(
        '   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database'
      );
      process.exit(1);
    }

    console.log('✅ MONGODB_URI is set');
    console.log(
      `📍 Connection string: ${process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}\n`
    );

    // Attempt to connect
    console.log('🔄 Attempting to connect to MongoDB...');
    const connection = await connectToDatabase();

    if (connection && connection.connection.db) {
      console.log('✅ Successfully connected to MongoDB!');
      console.log(`📊 Database name: ${connection.connection.db.databaseName}`);
      console.log(
        `🔌 Connection state: ${connection.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`
      );

      // Test a simple operation
      console.log('\n🧪 Testing database operations...');
      const collections = await connection.connection.db
        .listCollections()
        .toArray();
      console.log(
        `📁 Found ${collections.length} collection(s) in the database`
      );

      if (collections.length > 0) {
        console.log('   Collections:');
        collections.forEach((col) => {
          console.log(`   - ${col.name}`);
        });
      }

      console.log(
        '\n✅ All tests passed! Your database connection is working correctly.'
      );

      // Close the connection
      await connection.connection.close();
      console.log('🔌 Connection closed.');
      process.exit(0);
    }
  } catch (error: unknown) {
    console.error('\n❌ Connection failed!');
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error details:', errorMessage);

    if (errorMessage.includes('authentication failed')) {
      console.log(
        '\n💡 Tip: Check your username and password in the connection string.'
      );
    } else if (
      errorMessage.includes('ENOTFOUND') ||
      errorMessage.includes('getaddrinfo')
    ) {
      console.log(
        "\n💡 Tip: Check your MongoDB host/URL. Make sure it's correct."
      );
    } else if (errorMessage.includes('timeout')) {
      console.log(
        '\n💡 Tip: Check your network connection and firewall settings.'
      );
    } else if (errorMessage.includes('Missing MongoDB URI')) {
      console.log(
        '\n💡 Tip: Make sure you have a .env file with MONGODB_URI set.'
      );
    }

    process.exit(1);
  }
}

// Run the test
testConnection();
