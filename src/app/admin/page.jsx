import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import AdminWelcomeMessage from './AdminWelcomeMessage'; // Import the Client Component
// import Admindashboard from '@/components/adminpage/Admindashboard';
import Layout from "../(DashboardLayout)/layout";
import Dashboard from '../(DashboardLayout)/dashboard';
// import Resultpage from "@/components/resultdetails/bodycontent"


const SECRET_KEY = "fantastic";

export default function AdminPage() {
  const cookie = cookies().get('admin_token')?.value;

  if (!cookie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <p className="text-lg text-red-600">Access Denied. Please log in as an admin.</p>
        </div>
      </div>
    );
  }

  try {
    const payload = jwt.verify(cookie, SECRET_KEY);

    if (payload.role !== 'admin') {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <p className="text-lg text-red-600">Access Denied. You are not an admin.</p>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Render the Client Component for the Welcome Message */}
       
        
        <div className="flex flex-col items-center justify-center min-h-screen  ">
          {/* <Admindashboard/> */}
          <Layout >
         <Dashboard/>
          </Layout>

        </div>
         <AdminWelcomeMessage username={payload.username} />
      </>
    );
  } catch (error) {
    console.error('Verification Error:', error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <p className="text-lg text-red-600">Access Denied. Invalid or expired token.</p>
        </div>
      </div>
    );
  }
}
