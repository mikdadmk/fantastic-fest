"use client";

import { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, Fab } from "@mui/material";
import { motion } from "framer-motion";
import DownloadIcon from "@mui/icons-material/Download";

// Image Type
interface Image {
  id: string;
  url: string;
  title: string;
}

const GalleryPage = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch images from the backend
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/galleryimages?folder=gallery`);
      const data: Image[] = await res.json();
      if (data && data.length > 0) {
        setImages(data);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f9f9f9" }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: "30px", fontWeight: "bold", color: "#333" }}
      >
        Complete Gallery
      </Typography>

      {loading ? (
        <Typography variant="h6" align="center" sx={{ color: "#666" }}>
          Loading...
        </Typography>
      ) : images.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ color: "#666" }}>
          No images found in the gallery.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {images.map((image, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={image.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.05 }}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#fff",
                }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
                <motion.div
                  whileHover={{
                    opacity: 1,
                  }}
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    padding: "10px",
                    opacity: 0,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body1">{image.title}</Typography>
                </motion.div>
                <Tooltip title="Download Image" arrow>
                  <Fab
                    size="small"
                    color="primary"
                    onClick={() => window.open(image.url, "_blank")}
                    sx={{
                      position: "absolute",
                      bottom: "15px",
                      right: "15px",
                      zIndex: 10,
                    }}
                  >
                    <DownloadIcon />
                  </Fab>
                </Tooltip>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </motion.div>
  );
};

export default GalleryPage;
