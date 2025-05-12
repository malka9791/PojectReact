import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  Tooltip,
  Modal,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Grid,
  Paper,
  Container,
  type SelectChangeEvent,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MenuBook as MenuBookIcon,
  FilterAlt as FilterIcon,
  Category as CategoryIcon,
  FitnessCenter as FitnessCenterIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";

type Recipe = {
  Id: number;
  Name: string;
  Difficulty: number;
  Duration: number;
  Description: string;
  UserId: number;
  Categoryid: number;
  Img: string;
};
type CategoryType = {
  Id: number;
  Name: string;
};
type Duration = {
  value: number;
  label: string;
};
// Define filter options
// const categories = ["מנה ראשונה", "מנה עיקרית", "קינוח", "סלט", "מרק", "ארוחת בוקר"]
const difficultyLevels = ["קל", "בינוני", "קשה"];
const durations: Duration[] = [
  { value: 15, label: "עד 15 דקות" },
  { value: 30, label: "עד 30 דקות" },
  { value: 60, label: "עד שעה" },
  { value: 120, label: "עד שעתיים" },
  { value: 999, label: "מעל שעתיים" },
];

const RecipesCards = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [recipeIdToDelete, setRecipeIdToDelete] = useState<number>();
  const [category, setCategory] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<number | null>();
  const [duration, setDuration] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const userId = localStorage.getItem("userId")
    ? Number(localStorage.getItem("userId"))
    : undefined;

  const handleDeleteClick = (id: number) => {
    setRecipeIdToDelete(id);
    setOpenDelete(true);
  };

  // Handle filter changes
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficultyLevel(Number(event.target.value));
  };

  const handleDurationChange = (event: SelectChangeEvent) => {
    setDuration(event.target.value === "" ? null : Number(event.target.value));
  };

  const handleResetFilters = () => {
    setCategory("");
    setDifficultyLevel(undefined);
    setDuration(null);
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Confirm delete function
  const handleConfirmDelete = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/recipe/delete/${recipeIdToDelete}`
      );

      // Remove the deleted recipe from the state
      setRecipes(recipes.filter((recipe) => recipe.Id !== recipeIdToDelete));
      setFilteredRecipes(
        filteredRecipes.filter((recipe) => recipe.Id !== recipeIdToDelete)
      );

      alert("מחיקה הצליחה");
      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  const getCategories = async () => {
    try {
      const res = await axios.get<CategoryType[]>(
        `http://localhost:8080/api/category`
      );
      setCategories(res?.data);
    } catch (err) {
      console.error("Error feching categories", err);
    }
  };
  const getCategoryNameById = (id: number) => {
    return categories.find((c) => c.Id == id)?.Name;
  };
  //get recipes function
  const getRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/recipe");
      setRecipes(res.data);
      setFilteredRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  // Fetch recipes on loading page
  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);
  // Apply filters
  useEffect(() => {
    let result = [...recipes];
    if (category) {
      result = result.filter(
        (recipe) => recipe.Categoryid === Number(category)
      );
    }

    if (typeof difficultyLevel !== "undefined") {
      result = result.filter(
        (recipe) => recipe.Difficulty === Number(difficultyLevel)
      );
    }

    if (duration !== null) {
      if (duration && duration <= 120) {
        result = result.filter(
          (recipe) => recipe.Duration && recipe.Duration <= duration
        );
      } else {
        result = result.filter(
          (recipe) => recipe.Duration && recipe.Duration > 120
        );
      }
    }

    setFilteredRecipes(result);
  }, [recipes, category, difficultyLevel, duration]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Filter section */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "1200px",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          onClick={toggleFilters}
          sx={{
            mb: 2,
            borderRadius: "20px",
            color: "#d32f2f",
            borderColor: "#d32f2f",
            "&:hover": {
              borderColor: "#d32f2f",
              backgroundColor: "rgba(211, 47, 47, 0.04)",
            },
          }}
        >
          {showFilters ? "הסתר סינון" : "הצג אפשרויות סינון"}
        </Button>

        {showFilters && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 3,
              width: "100%",
              borderRadius: "12px",
              backgroundColor: "#fff8f8",
            }}
          >
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel id="category-label">קטגוריה</InputLabel>
                  <Select
                    labelId="category-label"
                    value={category}
                    onChange={handleCategoryChange}
                    label="קטגוריה"
                    sx={{ borderRadius: "8px" }}
                  >
                    <MenuItem value=""></MenuItem>
                    {categories &&
                      categories.map((cat) => (
                        <MenuItem key={cat.Id} value={cat.Id}>
                          {cat.Name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel id="difficulty-label">רמת קושי</InputLabel>
                  <Select
                    labelId="difficulty-label"
                    value={
                      difficultyLevel === null ||
                      typeof difficultyLevel === "undefined"
                        ? ""
                        : difficultyLevel.toString()
                    }
                    onChange={handleDifficultyChange}
                    label="רמת קושי"
                    sx={{ borderRadius: "8px" }}
                  >
                    <MenuItem value=""></MenuItem>
                    {difficultyLevels.map((level, index) => (
                      <MenuItem key={index} value={index - 1}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel id="duration-label">משך זמן</InputLabel>
                  <Select
                    labelId="duration-label"
                    value={
                      duration === null || typeof duration === "undefined"
                        ? ""
                        : duration.toString()
                    }
                    onChange={handleDurationChange}
                    label="משך זמן"
                    sx={{ borderRadius: "8px" }}
                  >
                    <MenuItem value=""></MenuItem>
                    {durations.map((dur) => (
                      <MenuItem key={dur.value} value={dur.value.toString()}>
                        {dur.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              >
                <Button
                  variant="contained"
                  onClick={handleResetFilters}
                  sx={{
                    backgroundColor: "#d32f2f",
                    "&:hover": { backgroundColor: "#b71c1c" },
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 3,
                  }}
                >
                  נקה סינון
                </Button>
              </Grid>

              {/* Active filters display */}
              {(category || difficultyLevel || duration !== null) && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  {category && (
                    <Chip
                      label={`קטגוריה: ${getCategoryNameById(
                        Number(category)
                      )}`}
                      onDelete={() => {
                        setCategory("");
                      }}
                      color="error"
                      variant="outlined"
                      sx={{ borderRadius: "16px" }}
                    />
                  )}
                  {difficultyLevel != null && (
                    <Chip
                      label={`רמת קושי: ${difficultyLevels[difficultyLevel]}`}
                      onDelete={() => setDifficultyLevel(undefined)}
                      color="error"
                      variant="outlined"
                      sx={{ borderRadius: "16px" }}
                    />
                  )}
                  {duration !== null && (
                    <Chip
                      label={`משך זמן: ${
                        durations.find((d) => d.value === duration)?.label
                      }`}
                      onDelete={() => setDuration(null)}
                      color="error"
                      variant="outlined"
                      sx={{ borderRadius: "16px" }}
                    />
                  )}
                </Grid>
              )}
            </Grid>
          </Paper>
        )}
      </Box>

      {/* Results count */}
      <Typography
        variant="subtitle1"
        sx={{ mb: 3, textAlign: "center", fontWeight: "medium" }}
      >
        {filteredRecipes.length} מתכונים נמצאו
      </Typography>

      {/* Recipe grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          justifyContent: "center",
        }}
      >
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((r) => (
            <Card
              key={r.Id}
              sx={{
                width: "100%",
                borderRadius: 4,
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={r.Img}
                alt={r.Name}
                sx={{
                  objectFit: "cover",
                  transition: "transform 0.5s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.Name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    height: 40,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {r.Description}
                </Typography>

                {/* Recipe metadata */}
                {(r.Categoryid || r.Difficulty || r.Duration) && (
                  <Box
                    sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}
                  >
                    {r.Categoryid && (
                      <Chip
                        icon={<CategoryIcon sx={{ fontSize: 16 }} />}
                        label={getCategoryNameById(r.Categoryid)}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(211, 47, 47, 0.1)",
                          color: "#d32f2f",
                          fontSize: "0.7rem",
                          height: "22px",
                        }}
                      />
                    )}
                    {r.Difficulty && (
                      <Chip
                        icon={<FitnessCenterIcon sx={{ fontSize: 16 }} />}
                        label={difficultyLevels[r.Difficulty - 1]}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(211, 47, 47, 0.1)",
                          color: "#d32f2f",
                          fontSize: "0.7rem",
                          height: "22px",
                        }}
                      />
                    )}
                    {r.Duration && (
                      <Chip
                        icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                        label={`${r.Duration} דקות`}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(211, 47, 47, 0.1)",
                          color: "#d32f2f",
                          fontSize: "0.7rem",
                          height: "22px",
                        }}
                      />
                    )}
                  </Box>
                )}
              </CardContent>

              <CardActions
                sx={{
                  justifyContent: "space-between",
                  paddingX: 2,
                  mt: "auto",
                }}
              >
                <Button
                  component={Link}
                  to={`/recipedetail/${r.Id}`}
                  variant="contained"
                  startIcon={<MenuBookIcon />}
                  sx={{
                    backgroundColor: "#d32f2f",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#d32f2f",
                      border: "1px solid #d32f2f",
                    },
                    borderRadius: "20px",
                    textTransform: "none",
                    fontSize: "0.875rem",
                    padding: "4px 12px",
                    boxShadow: "0 4px 8px rgba(211, 47, 47, 0.2)",
                  }}
                >
                  צפה במתכון
                </Button>

                <div>
                  {userId == r.UserId && (
                    <>
                      <Tooltip title="ערוך מתכון">
                        <IconButton
                          sx={{
                            color: "#d32f2f",
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "scale(1.1)",
                            },
                          }}
                          component={Link}
                          to={`/update/${r.Id}`}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="מחק מתכון">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(r.Id)}
                          sx={{
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </div>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", gridColumn: "1 / -1", my: 4 }}
          >
            לא נמצאו מתכונים התואמים את הסינון שבחרת
          </Typography>
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            p: 4,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            color="#e93345"
            gutterBottom
            fontWeight="bold"
          >
            האם אתה בטוח שברצונך למחוק את המתכון?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}
          >
            <Button
              onClick={() => setOpenDelete(false)}
              variant="outlined"
              sx={{
                color: "#e93345",
                borderColor: "#e93345",
                borderRadius: "20px",
                px: 3,
                "&:hover": {
                  borderColor: "#e93345",
                  backgroundColor: "rgba(233, 51, 69, 0.04)",
                },
              }}
            >
              ביטול
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              sx={{
                backgroundColor: "#e93345",
                "&:hover": { backgroundColor: "#c62828" },
                borderRadius: "20px",
                px: 3,
                boxShadow: "0 4px 8px rgba(233, 51, 69, 0.3)",
              }}
            >
              כן,מחק
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default RecipesCards;
