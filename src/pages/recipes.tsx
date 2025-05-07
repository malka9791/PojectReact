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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MenuBook as MenuBookIcon,
} from "@mui/icons-material";
import axios from "axios";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

type Recipe = {
  Id: number;
  Name: string;
  Description: string;
  Img: string;
  UserId: number;
};

const RecipeReviewCard = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [openDeleten, setOpenDelete] = useState(false);
  const [recipeIdToDelete, setRecipeIdToDelete] = useState<number>();
  const userId = localStorage.getItem("userId")
    ? Number(localStorage.getItem("userId"))
    : undefined;
  // const handleExpandClick = (id: number) => {
  //   setExpandedRecipeId(expandedRecipeId === id ? null : id); // אם נלחץ שוב על אותו כרטיס, נסגור אותו
  // };
  const handleDeleteClick = (id: number) => {
    setRecipeIdToDelete(id);
    setOpenDelete(true);
  };
  //confirm delete func
  const handleConfirmDelete = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/recipe/delete/${recipeIdToDelete}`
      );
      console.log("here");

      alert("delete success");
      setOpenDelete(false);
    } catch (error) {
      console.error("Error delete album:", error);
    }
  };
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/recipe");
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipes();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
      }}
    >
      {recipes.map((r) => (
        <Card
          key={r.Id}
          sx={{ width: 300, minWidth: 300, borderRadius: 4, boxShadow: 3 }}
        >
          <CardMedia component="img" height="180" image={r.Img} alt={r.Name} />
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 1 }}
              noWrap
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
              }}
            >
              {r.Description}
            </Typography>
          </CardContent>

          <CardActions sx={{ justifyContent: "space-between", paddingX: 2 }}>
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
                },
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "0.875rem",
                padding: "4px 12px",
              }}
            >
              צפה במתכון
            </Button>

            <div>
              {userId == r.UserId && (
                <>
                  <Tooltip title="ערוך מתכון">
                    <IconButton sx={{ color: "#d32f2f" }} onClick={() => {}}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="מחק מתכון">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(r.Id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </div>
            {/* <IconButton onClick={() => handleExpandClick(r.Id)}>
              <ExpandMoreIcon sx={{ transform: expandedRecipeId === r.Id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
            </IconButton> */}
          </CardActions>

          {/* <Collapse in={expandedRecipeId === r.Id} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                אופן ההכנה
              </Typography>
              <Typography variant="body2">
                {/* פה ניתן להוסיף את אופן ההכנה */}
          {/* </Typography>
            </CardContent> */}
          {/* </Collapse> */}
        </Card>
      ))}
      <Modal open={openDeleten} onClose={() => setOpenDelete(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" color="#e93345" gutterBottom>
            Are you sure you want delete this recipe?
          </Typography>
          <Button
            onClick={() => setOpenDelete(false)}
            sx={{ mt: 2, color: "#e93345" }}
          >
            Close
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{ mt: 2, color: "#e93345" }}
          >
            Yes
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RecipeReviewCard;
