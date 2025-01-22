import { connectToDatabase } from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "fantastic"; // Replace with your secret key

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const db = await connectToDatabase();
    const user = await db.collection('admin_users').findOne({ username });

    if (!user || user.password !== password) {
      return new Response(
        JSON.stringify({ message: 'Invalid credentials or not an admin' }),
        { status: 401 }
      );
    }

    if (user.role !== 'admin') {
      return new Response(
        JSON.stringify({ message: 'You do not have admin privileges' }),
        { status: 403 }
      );
    }

    // Log the successful login
    await db.collection('user_logins').insertOne({
      username,
      login_time: new Date(),
    });

    // Generate JWT
    // In the login API
    const token = jwt.sign({ username, role: user.role }, SECRET_KEY, {
      expiresIn: '1h', // Token expiration
    });
    
    return new Response(
      JSON.stringify({ message: 'Login successful' }),
      {
        status: 200,
        headers: {
          'Set-Cookie': `admin_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      }
    );
    

  } catch (error) {
    console.error('Error during login:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
