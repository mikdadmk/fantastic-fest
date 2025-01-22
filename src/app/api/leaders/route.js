import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req) {
  try {
    const db = await connectToDatabase(); // Use the existing `connectToDatabase` function
    const imagesCollection = db.collection('leaders-image'); // Your collection name

    // Fetch all images from the collection
    const images = await imagesCollection
      .find({})
      .project({ _id: 0, id: 1, url: 1, title: 1, description: 1 }) // Project necessary fields
      .toArray();

    // Debugging: log fetched images
    console.log('Fetched images:', images);

    if (images.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify(images), { status: 200 });
  } catch (error) {
    // Debugging: log error details
    console.error('Error fetching images from database:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
