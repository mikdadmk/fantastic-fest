"use client";

import { useEffect, useState } from "react";
import { Grid, Avatar, Typography, Tooltip, Fab, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { motion } from "framer-motion";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "next/link";

// Image Type
interface Image {
  id: string;
  url: string;
  title: string;
}

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const IMAGES_LIMIT = 8; // Show only 8 images on the current page

  // Fetch images from the backend
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/galleryimages?folder=gallery`);
      const data: Image[] = await res.json();
      if (data && data.length > 0) {
        setImages(data);
      } else {
        console.log("No images found in the gallery.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDownload = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "image.jpg"; // Default to "image.jpg" if no filename is provided
    a.click();
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" sx={{ marginBottom: "20px" }}>
          Image Gallery
        </Typography>
      </Grid>

      {loading ? (
        <Typography variant="h6" align="center" sx={{ width: "100%" }}>
          Loading...
        </Typography>
      ) : images.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ width: "100%" }}>
          No images found in the gallery.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {images.slice(0, IMAGES_LIMIT).map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  src={image.url}
                  variant="square"
                  sx={{
                    height: 250,
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
                <Tooltip title="Download Image">
                  <Fab
                    size="small"
                    color="primary"
                    onClick={() => handleDownload(image.url)}
                    sx={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                    }}
                  >
                    <DownloadIcon sx={{ fontSize: 20 }} />
                  </Fab>
                </Tooltip>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    {image.title}
                  </Typography>
                </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Show More Button */}
      {images.length > IMAGES_LIMIT && (
        <Grid item xs={12} sx={{ textAlign: "center", marginTop: "20px" }}>
          <Link href="/gallery">
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: "10px 20px" }}
            >
              Show More
            </Button>
          </Link>
        </Grid>
      )}
    </Grid>
  );
};

export default Gallery;
