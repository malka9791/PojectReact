import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Divider,
  Chip,
  Paper,
  Stack,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CategoryIcon from "@mui/icons-material/Category";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";

type Recipe = {
  Id: number;
  Name: string;
  Difficulty: number;
  Duration: number;
  Description: string;
  UserId: number;
  Categoryid: number;
  Img: string;
  Ingridents: {
    Id: number;
    Name: string;
    Count: number;
    Type: string;
  }[];
  Instructions: {
    Id: number;
    Name: string;
  }[];
};

type CategoryType = {
  Id: number;
  Name: string;
};

const RecipeDetailPage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");

  const getRecipe = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/recipe/${recipeId}`
      );
      const categories = await axios.get<CategoryType[]>(
        `http://localhost:8080/api/category`
      );
      const category = categories.data.find(
        (c) => c.Id === res.data.Categoryid
      );
      setCategoryName(category?.Name ?? " --- ");
      setRecipe(res.data);
    } catch (err) {
      console.error("Error fetching recipe details", err);
    }
  };

  useEffect(() => {
    if (recipeId) {
      getRecipe();
    }
  }, [recipeId]);

  const difficultyText = (level: number) => {
    switch (level) {
      case 1:
        return "קל";
      case 2:
        return "בינוני";
      case 3:
        return "קשה";
      default:
        return "לא מוגדר";
    }
  };

  return (
    <Container maxWidth="md">
      {recipe ? (
        <Paper
          elevation={4}
          sx={{ mt: 12, p: 3, borderRadius: 2, direction: "rtl", }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 3, fontWeight: "bold",color:"#d32f2f" }}
          >
            {recipe.Name}
          </Typography>

          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardMedia
              component="img"
              height="400"
              image={recipe.Img}
              alt={recipe.Name}
            />
          </Card>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CategoryIcon color="primary" />
                <Typography variant="body1">
                  <strong>קטגוריה:</strong> {categoryName}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeIcon color="primary" />
                <Typography variant="body1">
                  <strong>זמן הכנה:</strong> {recipe.Duration} דקות
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <BarChartIcon color="primary" />
                <Typography variant="body1">
                  <strong>קושי:</strong> {difficultyText(recipe.Difficulty)}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1,color:"#d32f2f" }}>
            תיאור
          </Typography>
          <Typography variant="body2" paragraph>
            {recipe.Description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1,color:"#d32f2f" }}>
            רכיבים
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
            {recipe.Ingridents.map((ingredient) => (
              <Chip
                key={ingredient.Id}
                label={`${ingredient.Count} ${ingredient.Type} ${ingredient.Name}`}
                variant="outlined"
                sx={{
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                  borderWidth: 2,
                  borderRadius: 2,
                  fontWeight: "bold",
                  paddingX: 1,
                  paddingY: 0.5,
                  "& .MuiChip-label": {
                    padding: "0 8px",
                  },
                  transition: "0.3s",
                  "&:hover": {
                    scale:1.2,
                  },
                }}
              />
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1,color:"#d32f2f" }}>
            אופן הכנה
          </Typography>
          <ol>
            {recipe.Instructions.map((step, index) => (
              <li key={index}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {step.Name}
                </Typography>
              </li>
            ))}
          </ol>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/recipes"
            >
              חזרה לרשימת המתכונים
            </Button>
          </Box>
        </Paper>
      ) : (
        <Typography variant="h5" align="center" sx={{ mt: 5 ,color:"#d32f2f"}}>
          טוען את המתכון...
        </Typography>
      )}
    </Container>
  );
};

export default RecipeDetailPage;
