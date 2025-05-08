
import { useEffect, useState } from "react"
import {
  CardMedia,
  Typography,
  Button,
  Container,
  Grid,
  Chip,
  Paper,
  Box,
  Avatar,
  IconButton,
  Skeleton,
  Fade,
  Tooltip,
} from "@mui/material"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import CategoryIcon from "@mui/icons-material/Category"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import BarChartIcon from "@mui/icons-material/BarChart"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PrintIcon from "@mui/icons-material/Print"
import ShareIcon from "@mui/icons-material/Share"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import KitchenIcon from "@mui/icons-material/Kitchen"
import LocalDiningIcon from "@mui/icons-material/LocalDining"

type Recipe = {
  Id: number
  Name: string
  Difficulty: number
  Duration: number
  Description: string
  UserId: number
  Categoryid: number
  Img: string
  Ingridents: {
    Id: number
    Name: string
    Count: number
    Type: string
  }[]
  Instructions: {
    Id: number
    Name: string
  }[]
}

type CategoryType = {
  Id: number
  Name: string
}

const RecipeDetailPage = () => {
  const { recipeId } = useParams<{ recipeId: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [categoryName, setCategoryName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  const getRecipe = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:8080/api/recipe/${recipeId}`)
      const categories = await axios.get<CategoryType[]>(`http://localhost:8080/api/category`)
      const category = categories.data.find((c) => c.Id === res.data.Categoryid)
      setCategoryName(category?.Name ?? " --- ")
      setRecipe(res.data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching recipe details", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (recipeId) {
      getRecipe()
    }
  }, [recipeId])

  const difficultyText = (level: number) => {
    switch (level) {
      case 1:
        return "קל"
      case 2:
        return "בינוני"
      case 3:
        return "קשה"
      default:
        return "לא מוגדר"
    }
  }

  const difficultyColor = (level: number) => {
    switch (level) {
      case 1:
        return "#4caf50" // Green for easy
      case 2:
        return "#ff9800" // Orange for medium
      case 3:
        return "#f44336" // Red for hard
      default:
        return "#757575" // Grey for undefined
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe?.Name || "מתכון טעים",
        text: recipe?.Description || "בדוק את המתכון הזה!",
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("הקישור הועתק ללוח")
    }
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 12, mb: 5 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={400} sx={{ mb: 2, borderRadius: 2 }} />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
          </Grid>
        </Grid>
        <Skeleton variant="rectangular" height={100} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={300} sx={{ mb: 2, borderRadius: 1 }} />
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mb: 8 }}>
      {recipe ? (
        <Fade in={!loading} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              mt: 12,
              p: { xs: 2, sm: 4 },
              borderRadius: 4,
              direction: "rtl",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Recipe Header */}
            <Box sx={{ position: "relative", mb: 4 }}>
              <Typography
                variant="h3"
                align="center"
                sx={{
                  mb: 3,
                  fontWeight: "bold",
                  color: "#d32f2f",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {recipe.Name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                  "& > *": { mx: 0.5 },
                }}
              >
                <Tooltip title="שמור מתכון">
                  <IconButton
                    sx={{
                      color: "#d32f2f",
                      "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.08)" },
                    }}
                  >
                    <BookmarkBorderIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="שתף מתכון">
                  <IconButton
                    onClick={handleShare}
                    sx={{
                      color: "#d32f2f",
                      "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.08)" },
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="הדפס מתכון">
                  <IconButton
                    onClick={handlePrint}
                    sx={{
                      color: "#d32f2f",
                      "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.08)" },
                    }}
                  >
                    <PrintIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Recipe Image */}
            <Box
              sx={{
                position: "relative",
                mb: 4,
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <CardMedia
                component="img"
                height="500"
                image={recipe.Img}
                alt={recipe.Name}
                sx={{
                  objectFit: "cover",
                  transition: "transform 0.5s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {categoryName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2">{recipe.Duration} דקות</Typography>
                </Box>
              </Box>
            </Box>

            {/* Recipe Metadata */}
            <Grid
              container
              spacing={3}
              sx={{
                mb: 4,
                p: 2,
                backgroundColor: "#f9f9f9",
                borderRadius: 3,
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.03)",
              }}
            >
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#d32f2f",
                      width: 56,
                      height: 56,
                      mb: 1,
                      boxShadow: "0 4px 8px rgba(211, 47, 47, 0.2)",
                    }}
                  >
                    <CategoryIcon />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    קטגוריה
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {categoryName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#d32f2f",
                      width: 56,
                      height: 56,
                      mb: 1,
                      boxShadow: "0 4px 8px rgba(211, 47, 47, 0.2)",
                    }}
                  >
                    <AccessTimeIcon />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    זמן הכנה
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {recipe.Duration} דקות
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: difficultyColor(recipe.Difficulty),
                      width: 56,
                      height: 56,
                      mb: 1,
                      boxShadow: `0 4px 8px ${difficultyColor(recipe.Difficulty)}40`,
                    }}
                  >
                    <BarChartIcon />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    רמת קושי
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {difficultyText(recipe.Difficulty)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Recipe Description */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  borderBottom: "2px solid #d32f2f",
                  pb: 1,
                }}
              >
                <RestaurantIcon sx={{ color: "#d32f2f", mr: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                  תיאור המתכון
                </Typography>
              </Box>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                  color: "#333",
                  backgroundColor: "#fff9f9",
                  p: 2,
                  borderRadius: 2,
                  borderRight: "3px solid #d32f2f",
                }}
              >
                {recipe.Description}
              </Typography>
            </Box>

            {/* Recipe Ingredients */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  borderBottom: "2px solid #d32f2f",
                  pb: 1,
                }}
              >
                <KitchenIcon sx={{ color: "#d32f2f", mr: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                  רכיבים
                </Typography>
              </Box>
              <Grid container spacing={1} sx={{ mb: 2 }}>
                {recipe.Ingridents.map((ingredient) => (
                  <Grid item xs={12} sm={6} md={4} key={ingredient.Id}>
                    <Chip
                      label={`${ingredient.Count} ${ingredient.Type} ${ingredient.Name}`}
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px",
                        py: 1.5,
                        px: 1,
                        backgroundColor: "#fff",
                        border: "1px solid rgba(211, 47, 47, 0.3)",
                        color: "#333",
                        fontWeight: "medium",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#d32f2f",
                          color: "#fff",
                          transform: "translateY(-3px)",
                          boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                        },
                        "& .MuiChip-label": {
                          display: "block",
                          whiteSpace: "normal",
                          textAlign: "center",
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Recipe Instructions */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  borderBottom: "2px solid #d32f2f",
                  pb: 1,
                }}
              >
                <LocalDiningIcon sx={{ color: "#d32f2f", mr: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                  אופן הכנה
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 3,
                  p: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                {recipe.Instructions.map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      mb: 3,
                      pb: index < recipe.Instructions.length - 1 ? 3 : 0,
                      borderBottom: index < recipe.Instructions.length - 1 ? "1px dashed #ddd" : "none",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#d32f2f",
                        color: "#fff",
                        mr: 2,
                        boxShadow: "0 4px 8px rgba(211, 47, 47, 0.2)",
                      }}
                    >
                      {index + 1}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.7,
                          color: "#333",
                          pt: 1,
                        }}
                      >
                        {step.Name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Back Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <Button
                component={Link}
                to={`/recipes`}
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{
                  bgcolor: "#d32f2f",
                  color: "#fff",
                  fontSize: "16px",
                  py: 1.5,
                  px: 4,
                  borderRadius: "30px",
                  boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                  "&:hover": {
                    bgcolor: "#fff",
                    color: "#d32f2f",
                    boxShadow: "0 6px 16px rgba(211, 47, 47, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
                size="large"
              >
                חזרה לרשימת המתכונים
              </Button>
            </Box>
          </Paper>
        </Fade>
      ) : (
        <Typography variant="h5" align="center" sx={{ mt: 5, color: "#d32f2f" }}>
          לא נמצא מתכון
        </Typography>
      )}
    </Container>
  )
}

export default RecipeDetailPage
