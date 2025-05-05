import { TextField, Box, Button, Typography, Grid, Paper } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "./header";

type FormValues = {
  Recipe: {
    name: string;
    imageUrl: string;
    instructions: { step: string }[];
    duration: number;
    difficulty: number;
    description: string;
    userId: number;
    categoryId: number;
    Ingredient: {
      name: string;
      count: number;
      type1: string;
    }[];
  };
};

// סכמת ולידציה עם כל השדות חובה
const schema = yup.object().shape({
  Recipe: yup.object().shape({
    name: yup.string().required("שם המתכון הוא שדה חובה"),
    imageUrl: yup
      .string()
      .url("כתובת התמונה חייבת להיות URL תקין")
      .required("קישור לתמונה הוא שדה חובה"),
    duration: yup
      .number()
      .typeError("זמן ההכנה חייב להיות מספר")
      .required("זמן הכנה הוא שדה חובה")
      .positive("זמן חייב להיות מספר חיובי"),
    difficulty: yup
      .number()
      .typeError("רמת קושי חייבת להיות מספר")
      .required("רמת קושי היא שדה חובה")
      .min(1, "רמת קושי חייבת להיות בין 1 ל-5")
      .max(5, "רמת קושי חייבת להיות בין 1 ל-5"),
    description: yup.string().required("תיאור הוא שדה חובה"),
    userId: yup
      .number()
      .typeError("ID משתמש חייב להיות מספר")
      .required("ID משתמש הוא שדה חובה"),
    categoryId: yup
      .number()
      .typeError("ID קטגוריה חייב להיות מספר")
      .required("ID קטגוריה הוא שדה חובה"),
    instructions: yup
      .array()
      .of(
        yup.object().shape({ step: yup.string().required("שלב הוא שדה חובה") })
      )
      .min(1, "יש להוסיף לפחות שלב אחד")
      .required("שלבים הם שדה חובה"),
    Ingredient: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("שם רכיב הוא שדה חובה"),
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

const AddRecipe = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      Recipe: {
        name: "",
        imageUrl: "",
        instructions: [{ step: "" }],
        duration: undefined,
        difficulty: undefined,
        description: "",
        userId: undefined,
        categoryId: undefined,
        Ingredient: [],
      },
    },
    mode: "onBlur",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    name: "Recipe.instructions",
    control,
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    name: "Recipe.Ingredient",
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

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
                  {...register("Recipe.name")}
                  label="שם המתכון"
                  fullWidth
                  error={!!errors.Recipe?.name}
                />
                <Typography color="error">
                  {errors?.Recipe?.name?.message}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register("Recipe.imageUrl")}
                  label="קישור לתמונה"
                  fullWidth
                  error={!!errors.Recipe?.imageUrl}
                />
                <Typography color="error">
                  {errors?.Recipe?.imageUrl?.message}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register("Recipe.duration")}
                  label="זמן הכנה (דקות)"
                  type="number"
                  fullWidth
                  error={!!errors.Recipe?.duration}
                />
                <Typography color="error">
                  {errors?.Recipe?.duration?.message}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register("Recipe.difficulty")}
                  label="רמת קושי (1-5)"
                  type="number"
                  fullWidth
                  error={!!errors.Recipe?.difficulty}
                />
                <Typography color="error">
                  {errors?.Recipe?.difficulty?.message}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register("Recipe.description")}
                  label="תיאור"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.Recipe?.description}
                />
                <Typography color="error">
                  {errors?.Recipe?.description?.message}
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
                      {...register(`Recipe.instructions.${index}.step`)}
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
                {ingredientFields.map((ingredient, index) => (
                  <Box
                    key={ingredient.id}
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <TextField
                      {...register(`Recipe.Ingredient.${index}.name`)}
                      label="שם רכיב"
                      fullWidth
                    />
                    <TextField
                      {...register(`Recipe.Ingredient.${index}.count`)}
                      label="כמות"
                      type="number"
                      sx={{ width: "80px" }}
                    />
                    <TextField
                      {...register(`Recipe.Ingredient.${index}.type1`)}
                      label="סוג"
                      sx={{ width: "120px" }}
                    />
                    <Button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      color="error"
                    >
                      <Delete />
                    </Button>
                  </Box>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    appendIngredient({ name: "", count: 1, type1: "" })
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
