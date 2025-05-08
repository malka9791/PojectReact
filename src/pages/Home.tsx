"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Rating,
  IconButton,
} from "@mui/material";
import {
  Cake as CakeIcon,
  ArrowForward as ArrowForwardIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";
import cake1 from "../images/cake1.jpg";
import cake2 from "../images/cake2.jpg";
import cake3 from "../images/cake3.jpg";
import AboutUs from "./aboutUs";

// Featured products data
const featuredProducts = [
  { id: 1, name: "עוגת שוקולד קלאסית", price: "₪120", image: cake1, rating: 5 },
  {
    id: 2,
    name: "עוגת גבינה ופירות יער",
    price: "₪140",
    image: cake2,
    rating: 4.5,
  },
  {
    id: 3,
    name: "עוגת קרם וניל מיוחדת",
    price: "₪160",
    image: cake3,
    rating: 4.8,
  },
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [cake1, cake2, cake3];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box sx={{ backgroundColor: "#FFF9F5" }}>
      {/* Hero Section */}
      <Box
        sx={{
          // position: "relative",
          height: "80vh",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Background image with animation */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`עוגה ${index + 1}`}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: currentImageIndex === index ? 1 : 0,
                transition: "opacity 1.5s ease-in-out",
              }}
            />
          ))}
        </Box>

        {/* Hero content */}
        <Container
          maxWidth="lg"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            color: "white",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Foody
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                maxWidth: "800px",
                mx: "auto",
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              עוגות בטעם אישי
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#d32f2f",
                "&:hover": {
                  backgroundColor: "#AD1457",
                },
                borderRadius: "30px",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                boxShadow: "0 4px 10px rgba(216, 27, 96, 0.3)",
              }}
            >
              הזמינו עכשיו
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#333",
            }}
          >
            העוגות המובילות שלנו
          </Typography>
          <Divider
            sx={{
              width: "80px",
              mx: "auto",
              borderColor: "#d32f2f",
              borderWidth: "3px",
              mb: 3,
            }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto" }}
          >
            העוגות האהובות ביותר על הלקוחות שלנו, מוכנות בקפידה ובאהבה
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <motion.div
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ mb: 1, fontWeight: 600 }}
                    >
                      {product.name}
                    </Typography>
                    <Rating
                      value={product.rating}
                      precision={0.5}
                      readOnly
                      sx={{ mb: 2 }}
                    />
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 700, mb: 2 }}
                    >
                      {product.price}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<CakeIcon />}
                      sx={{
                        borderRadius: "30px",
                        borderColor: "#d32f2f",
                        color: "#d32f2f",
                        "&:hover": {
                          borderColor: "#AD1457",
                          backgroundColor: "rgba(216, 27, 96, 0.04)",
                        },
                      }}
                    >
                      הזמן עכשיו
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Us Section with enhanced styling */}
      <Box sx={{ py: 8, backgroundColor: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#333",
              }}
            >
              קצת עלינו
            </Typography>
            <Divider
              sx={{
                width: "80px",
                mx: "auto",
                borderColor: "#d32f2f",
                borderWidth: "3px",
                mb: 3,
              }}
            />
          </Box>

          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
            }}
          >
            <AboutUs />
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: "#d32f2f",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 700, mb: 3 }}
          >
            רוצים להזמין עוגה מיוחדת?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            צרו איתנו קשר עוד היום ונכין לכם את העוגה המושלמת לכל אירוע
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            צרו קשר
          </Button>

          <Box
            sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <IconButton
              sx={{
                color: "white",
                border: "2px solid white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              sx={{
                color: "white",
                border: "2px solid white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              sx={{
                color: "white",
                border: "2px solid white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{ py: 4, backgroundColor: "#333", color: "white" }}
      >
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Foody . כל הזכויות שמורות
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
