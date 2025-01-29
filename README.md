# Next.js Web App

This is a Next.js web app. Follow the instructions below to clone, set up, and run the project.

## Prerequisites

Before you begin, make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) for the database (or set up a MongoDB Atlas cluster)

## Getting Started

# 1. Clone the repository
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name

# 2. Install dependencies
npm install

# If you encounter errors related to peer dependencies
npm install --legacy-peer-deps

# 3. Set up environment variables
echo "DATABASE_URL=mongodb://localhost:27017/" >> .env
echo "CLOUDINARY_CLOUD_NAME=example" >> .env
echo "CLOUDINARY_API_KEY=873895146482516" >> .env
echo "CLOUDINARY_API_SECRET=kuX82dWw88GiJnDXvnE7OIypkwk" >> .env

# 4. Build the project
npm run build

# 5. Run the project in development mode
npm run dev
