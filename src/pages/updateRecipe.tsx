import {
  TextField,
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Add, Category, Delete } from "@mui/icons-material";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingCircle from "../components/loading";

type FormValues = {
  Recipe: {
    Name: string;
    Img: string;
    Instructions: { Id?: number; Name: string }[];
    Duration: number;
    Difficulty: number;
    Description: string;
    UserId: number;
    Categoryid: number;
    Ingridents: {
      Id?: number;
      Name: string;
      Count: number;
      Type: string;
    }[];
  };
};
type Recipe = {
  Name: string;
  Img: string;
  Instructions: { Id?: number; Name: string }[];
  Duration: number;
  Difficulty: number;
  Description: string;
  UserId: number;
  Categoryid: number;
  Ingridents: {
    Id?: number;
    Name: string;
    Count: number;
    Type: string;
  }[];
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
    Categoryid: yup
      .number()
      .typeError("ID קטגוריה חייב להיות מספר")
      .required(" קטגוריה הוא שדה חובה"),
    Instructions: yup
      .array()
      .of(
        yup.object().shape({
          Name: yup.string().required("שלב לא יכול להיות ריק"),
          Id: yup.number().optional(),
        })
      )
      .min(2, "יש להוסיף לפחות 2 שלבים ")
      .required("שלבים הם שדה חובה"),
    Ingridents: yup
      .array()
      .of(
        yup.object().shape({
          Id: yup.number().optional(),
          Name: yup.string().required("שם רכיב הוא שדה חובה"),
          Count: yup
            .number()
            .typeError("כמות חייבת להיות מספר")
            .required("כמות היא שדה חובה")
            .positive("כמות חייבת להיות חיובית"),
          Type: yup.string().required("סוג רכיב הוא שדה חובה"),
        })
      )
      .min(2, "יש להוסיף לפחות 2 רכיבים ")
      .required("רכיבים הם שדה חובה"),
  }),
});
type Category = {
  Id: number;
  Name: string;
  createdAt: Date;
  updatedAt: Date;
};

const UpdateRecipe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const { recipeId } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<number>();
  const [recipe, setRecipe] = useState<Recipe>();
  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/category");
      setCategories(res.data);
    } catch (err) {
      console.error("failed to load the categories");
    }
  };
  const getRecipe = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/recipe/${recipeId}`
      );
      console.log(res.data);
      setRecipe(res.data);
    } catch (err) {
      console.error("failed to load the recipe");
    }
  };
  useEffect(() => {
    if (recipeId) {
      getRecipe();
      getCategories();
      setCurrentCategoryId(Number(recipe?.Categoryid));
    }
  }, [recipeId]);
  //form setting
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      Recipe: recipe,
    },
    mode: "onBlur",
  });
  const watchedValues = useWatch({ control });

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
    setIsSubmitting(true);
    const fixedData = {
      ...data.Recipe,
      Categoryid: Number(data.Recipe.Categoryid),
      UserId: Number(data.Recipe.UserId),
    };

    console.log("נתונים מתוקנים:", fixedData);
    console.log(JSON.stringify(fixedData, null, 2));

    try {
      const res = await axios.post(
        "http://localhost:8080/api/recipe/edit",
        fixedData
      );
      setIsUpdateSuccess(true);
      alert("edit");
      console.log(res.data, isUpdateSuccess);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsUpdateSuccess(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (recipe) {
      console.log(recipe, "here");

      reset({
        Recipe: {
          ...recipe,

          Instructions: recipe.Instructions?.length
            ? recipe.Instructions
            : [{ Name: "" }, { Name: "" }],
          Ingridents: recipe.Ingridents?.length
            ? recipe.Ingridents
            : [
                { Name: "", Count: 1, Type: "" },
                { Name: "", Count: 1, Type: "" },
              ],
        },
      });
      setCurrentCategoryId(Number(recipe?.Categoryid));
      console.log(currentCategoryId);
    }
  }, [recipe, reset]);
  // useEffect(() => {
  //   if (recipe) {
  //     reset({
  //       Recipe: {
  //         ...recipe,
  //         Instructions: recipe.Instructions?.length
  //           ? recipe.Instructions
  //           : [{ Name: "" }, { Name: "" }],
  //         Ingridents: recipe.Ingridents?.length
  //           ? recipe.Ingridents
  //           : [
  //               { Name: "", Count: 1, Type: "" },
  //               { Name: "", Count: 1, Type: "" },
  //             ],
  //       },
  //     });
  //     // להוסיף את שלבי ההכנה ל-fieldArray
  //     if (recipe.Instructions && recipe.Instructions.length > 0) {
  //       instructionReplace(recipe.Instructions);
  //     } else {
  //       instructionReplace([
  //         { Id: undefined, Name: "" },
  //         { Id: undefined, Name: "" },
  //       ]);
  //     }

  //     // להוסיף את הרכיבים ל-fieldArray
  //     if (recipe.Ingridents && recipe.Ingridents.length > 0) {
  //       ingridientsReplace(recipe.Ingridents);
  //     } else {
  //       ingridientsReplace([
  //         { Id: undefined, Name: "", Count: 1, Type: "" },
  //         { Id: undefined, Name: "", Count: 1, Type: "" },
  //       ]);
  //     }
  //   }
  // }, [recipe, reset, instructionReplace, ingridientsReplace]);

  return (
    <>
      {isUpdateSuccess && (
        <Alert severity="success">
          <AlertTitle>Success Update Recipe</AlertTitle>
          the recipe update!!
        </Alert>
      )}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
            עריכת מתכון
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("Recipe.Name")}
                  label="שם המתכון"
                  fullWidth
                  error={!!errors.Recipe?.Name}
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
                />
                <Typography color="error">
                  {errors?.Recipe?.Img?.message}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register("Recipe.Duration", {
                    setValueAs: (v) => (v === "" ? null : Number(v)),
                  })}
                  label="זמן הכנה (דקות)"
                  type="number"
                  fullWidth
                  error={!!errors.Recipe?.Duration}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography color="error">
                  {errors?.Recipe?.Duration?.message}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register("Recipe.Difficulty", {
                    setValueAs: (v) => (v === "" ? null : Number(v)),
                  })}
                  label="רמת קושי (1-5)"
                  type="number"
                  fullWidth
                  error={!!errors.Recipe?.Difficulty}
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  {...register("Recipe.Categoryid", {
                    setValueAs: (v) => (v === "" ? null : Number(v)),
                  })}
                  onChange={(e) => {
                    setCurrentCategoryId(Number(e.target?.value)); // עדכון ה-state
                  }}
                  error={!!errors.Recipe?.Categoryid}
                  InputLabelProps={{ shrink: true }}
                  value={currentCategoryId || ""} // עדכון דינמי
                >
                  <MenuItem value="">{/* <em>בחר קטגוריה</em> */}</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.Id} value={category.Id}>
                      {category.Name}
                    </MenuItem>
                  ))}
                </TextField>

                <Typography color="error">
                  {errors?.Recipe?.Categoryid?.message}
                </Typography>
              </Grid>

              {/* שלבי הכנה */}
              <Grid item xs={12}>
                <Typography variant="h6" color="#d32f2f">
                  שלבי הכנה
                </Typography>
                {instructionFields.map((instruction, index) => (
                  <>
                    <Box
                      key={instruction.Id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <TextField
                        {...register(`Recipe.Instructions.${index}.Name`)}
                        label={`שלב ${index + 1}`}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                      <Button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        color="error"
                      >
                        <Delete />
                      </Button>
                    </Box>
                    <Typography color="error">
                      {errors?.Recipe?.Instructions?.[index]?.Name?.message}
                    </Typography>
                  </>
                ))}
                <Button
                  type="button"
                  onClick={() => appendInstruction({ Id: undefined, Name: "" })}
                  variant="contained"
                  sx={{ bgcolor: "#d32f2f", color: "#ffffff" }}
                  startIcon={<Add />}
                >
                  הוסף שלב
                </Button>
                <Typography color="error">
                  {errors?.Recipe?.Instructions?.message}
                </Typography>
              </Grid>

              {/* רכיבים */}
              <Grid item xs={12}>
                <Typography variant="h6" color="#d32f2f">
                  רכיבים
                </Typography>
                {IngridentsFields.map((Ingridents, index) => (
                  <>
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
                        InputLabelProps={{ shrink: true }}
                      />

                      <TextField
                        {...register(`Recipe.Ingridents.${index}.Count`, {
                          setValueAs: (v) => (v === "" ? null : Number(v)),
                        })}
                        label="כמות"
                        type="number"
                        sx={{ width: "200px" }}
                        InputLabelProps={{ shrink: true }}
                      />

                      <TextField
                        {...register(`Recipe.Ingridents.${index}.Type`)}
                        label="סוג"
                        sx={{ width: "200px" }}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Button
                        type="button"
                        onClick={() => removeIngridents(index)}
                        color="error"
                      >
                        <Delete />
                      </Button>
                    </Box>
                    <Typography color="error">
                      {errors?.Recipe?.Ingridents?.[index]?.Name?.message}
                    </Typography>
                    <Typography color="error">
                      {errors?.Recipe?.Ingridents?.[index]?.Count?.message}
                    </Typography>
                    <Typography color="error">
                      {errors?.Recipe?.Ingridents?.[index]?.Type?.message}
                    </Typography>
                  </>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    appendIngridents({
                      Id: undefined,
                      Name: "",
                      Count: 1,
                      Type: "",
                    })
                  }
                  variant="contained"
                  sx={{ bgcolor: "#d32f2f", color: "#ffffff" }}
                  startIcon={<Add />}
                >
                  הוסף רכיב
                </Button>
                <Typography color="error">
                  {errors?.Recipe?.Ingridents?.message}
                </Typography>
              </Grid>

              {/* כפתור שליחה */}
              <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  onClick={() => {
                    console.log(watchedValues);
                  }}
                >
                  להדפסת הנתונים
                </Button>
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
                  {isSubmitting && <LoadingCircle />}
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

export default UpdateRecipe;
