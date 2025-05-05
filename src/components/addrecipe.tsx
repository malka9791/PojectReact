import {
  TextField,
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  MenuItem,
} from "@mui/material";
import { Add, Category, Delete } from "@mui/icons-material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "./header";
import { useEffect, useState } from "react";
import axios from "axios";

type FormValues = {
  Recipe: {
    Name: string;
    Img: string;
    Instructions: { step: string }[];
    Duration: number;
    Difficulty: number;
    Description: string;
    UserId: number;
    CategoryId: number;
    Ingridents: {
      Name: string;
      count: number;
      type1: string;
    }[];
  };
};

// סכמת ולידציה עם כל השדות חובה
const schema = yup.object().shape({
  Recipe: yup.object().shape({
    Name: yup.string().required("שם המתכון הוא שדה חובה"),
    Img: yup
      .string()
      .url("כתובת התמונה חייבת להיות URL תקין")
      .required("קישור לתמונה הוא שדה חובה"),
    Duration: yup
      .number()
      .typeError("זמן ההכנה חייב להיות מספר")
      .required("זמן הכנה הוא שדה חובה")
      .positive("זמן חייב להיות מספר חיובי"),
    Difficulty: yup
      .number()
      .typeError("רמת קושי חייבת להיות מספר")
      .required("רמת קושי היא שדה חובה")
      .min(1, "רמת קושי חייבת להיות בין 1 ל-5")
      .max(5, "רמת קושי חייבת להיות בין 1 ל-5"),
    Description: yup.string().required("תיאור הוא שדה חובה"),
    UserId: yup
      .number()
      .typeError("ID משתמש חייב להיות מספר")
      .required("ID משתמש הוא שדה חובה"),
    CategoryId: yup
      .number()
      .typeError("ID קטגוריה חייב להיות מספר")
      .required("ID קטגוריה הוא שדה חובה"),
    Instructions: yup
      .array()
      .of(
        yup.object().shape({ step: yup.string().required("שלב הוא שדה חובה") })
      )
      .min(1, "יש להוסיף לפחות שלב אחד")
      .required("שלבים הם שדה חובה"),
    Ingridents: yup
      .array()
      .of(
        yup.object().shape({
          Name: yup.string().required("שם רכיב הוא שדה חובה"),
          count: yup
            .number()
            .typeError("כמות חייבת להיות מספר")
            .required("כמות היא שדה חובה")
            .positive("כמות חייבת להיות חיובית"),
          type1: yup.string().required("סוג רכיב הוא שדה חובה"),
        })
      )
      .min(1, "יש להוסיף לפחות רכיב אחד")
      .required("רכיבים הם שדה חובה"),
  }),
});
type Category = {
  Id: number;
  Name: string;
  createdAt: Date;
  updatedAt: Date;
};
const AddRecipe = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/category");
      setCategories(res.data);
    } catch (err) {
      console.error("failed to load the categories");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      Recipe: {
        Name: "",
        Img: "",
        Instructions: [{ step: "" }],
        Duration: undefined,
        Difficulty: undefined,
        Description: "",
        UserId: localStorage.getItem("UserId")
          ? Number(localStorage.getItem("UserId"))
          : undefined,
        CategoryId: undefined,
        Ingridents: [],
      },
    },
    mode: "onBlur",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    name: "Recipe.Instructions",
    control,
  });

  const {
    fields: IngridentsFields,
    append: appendIngridents,
    remove: removeIngridents,
  } = useFieldArray({
    name: "Recipe.Ingridents",
    control,
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      const res = await axios.post("http://localhost:8080/api/recipe", data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            width: "600px",
            bgcolor: "#ffffff",
            color: "#d32f2f",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            color="#d32f2f"
          >
            הוסף מתכון
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("Recipe.Name")}
                  label="שם המתכון"
                  fullWidth
                  error={!!errors.Recipe?.Name}
                />
                <Typography color="error">
                  {errors?.Recipe?.Name?.message}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register("Recipe.Img")}
                  label="קישור לתמונה"
                  fullWidth
                  error={!!errors.Recipe?.Img}
                />
                <Typography color="error">
                  {errors?.Recipe?.Img?.message}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register("Recipe.Duration")}
                  label="זמן הכנה (דקות)"
                  type="number"
                  fullWidth
                  error={!!errors.Recipe?.Duration}
                />
                <Typography color="error">
                  {errors?.Recipe?.Duration?.message}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register("Recipe.Difficulty")}
                  label="רמת קושי (1-5)"
                  type="number"
                  fullWidth
                  error={!!errors.Recipe?.Difficulty}
                />
                <Typography color="error">
                  {errors?.Recipe?.Difficulty?.message}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register("Recipe.Description")}
                  label="תיאור"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.Recipe?.Description}
                />
                <Typography color="error">
                  {errors?.Recipe?.Description?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="קטגוריה"
                  fullWidth
                  {...register("Recipe.CategoryId")}
                  error={!!errors.Recipe?.CategoryId}
                >
                  <MenuItem value="">
                    <em>בחר קטגוריה</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.Id} value={category.Id}>
                      {category.Name}
                    </MenuItem>
                  ))}
                </TextField>
                <Typography color="error">
                  {errors?.Recipe?.CategoryId?.message}
                </Typography>
              </Grid>

              {/* שלבי הכנה */}
              <Grid item xs={12}>
                <Typography variant="h6" color="#d32f2f">
                  שלבי הכנה
                </Typography>
                {instructionFields.map((instruction, index) => (
                  <Box
                    key={instruction.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <TextField
                      {...register(`Recipe.Instructions.${index}.step`)}
                      label={`שלב ${index + 1}`}
                      fullWidth
                    />
                    <Button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      color="error"
                    >
                      <Delete />
                    </Button>
                  </Box>
                ))}
                <Button
                  type="button"
                  onClick={() => appendInstruction({ step: "" })}
                  variant="contained"
                  sx={{ bgcolor: "#d32f2f", color: "#ffffff" }}
                  startIcon={<Add />}
                >
                  הוסף שלב
                </Button>
              </Grid>

              {/* רכיבים */}
              <Grid item xs={12}>
                <Typography variant="h6" color="#d32f2f">
                  רכיבים
                </Typography>
                {IngridentsFields.map((Ingridents, index) => (
                  <Box
                    key={Ingridents.id}
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <TextField
                      {...register(`Recipe.Ingridents.${index}.Name`)}
                      label="שם רכיב"
                      fullWidth
                    />
                    <TextField
                      {...register(`Recipe.Ingridents.${index}.count`)}
                      label="כמות"
                      type="number"
                      sx={{ width: "80px" }}
                    />
                    <TextField
                      {...register(`Recipe.Ingridents.${index}.type1`)}
                      label="סוג"
                      sx={{ width: "120px" }}
                    />
                    <Button
                      type="button"
                      onClick={() => removeIngridents(index)}
                      color="error"
                    >
                      <Delete />
                    </Button>
                  </Box>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    appendIngridents({ Name: "", count: 1, type1: "" })
                  }
                  variant="contained"
                  sx={{ bgcolor: "#d32f2f", color: "#ffffff" }}
                  startIcon={<Add />}
                >
                  הוסף רכיב
                </Button>
              </Grid>

              {/* כפתור שליחה */}
              <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#d32f2f",
                    color: "#ffffff",
                    fontSize: "18px",
                  }}
                  size="large"
                >
                  שלח מתכון
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default AddRecipe;
