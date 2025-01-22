import cloudinary from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET  // Your Cloudinary API secret
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder");


  


  if (!folder) {
    return new Response(
      JSON.stringify({ error: "Folder parameter is required" }),
      { status: 400 }
    );
  }

  try {
    // Fetch images dynamically using asset search API
    const result = await cloudinary.v2.search
      .expression(`folder:${folder}/*`)
      .sort_by("public_id", "asc")
      .max_results(500)
      .execute();

    console.log("Cloudinary search result:", result); // For debugging

    const images = result.resources.map((image) => ({
      id: image.public_id,
      url: image.secure_url,
      title: image.original_filename,
    }));

    if (images.length === 0) {
      console.log("No images found in the folder.");
    }

    return new Response(JSON.stringify(images), { status: 200 });
  } catch (error) {
    console.error("Error fetching Cloudinary images:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch images from Cloudinary" }),
      { status: 500 }
    );
  }
}
