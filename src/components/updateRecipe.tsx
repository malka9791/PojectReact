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
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type FormValues = {
  Recipe: {
    Name: string;
    Img: string;
    Instructions: { Name: string }[];
    Duration: number;
    Difficulty: number;
    Description: string;
    UserId: number;
    Categoryid: number;
    Ingridents: {
      Name: string;
      Count: number;
      Type: string;
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
    Categoryid: yup
      .number()
      .typeError("ID קטגוריה חייב להיות מספר")
      .required("ID קטגוריה הוא שדה חובה"),
    Instructions: yup
      .array()
      .of(
        yup.object().shape({ Name: yup.string().required("שלב הוא שדה חובה") })
      )
      .min(2, "יש להוסיף לפחות 2 שלבים ")
      .required("שלבים הם שדה חובה"),
    Ingridents: yup
      .array()
      .of(
        yup.object().shape({
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
  // const UpdateRecipe = ({ recipeId }: { recipeId: number }) => {
  const { recipeId } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [recipe, setRecipe] = useState<FormValues>();
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
      setRecipe(res.data);
      reset({ Recipe: res.data.Recipe }); // זה הפתרון
    } catch (err) {
      console.error("failed to load the recipe");
    }
  };
  useEffect(() => {
    if (recipeId) {
      getRecipe();
      getCategories();
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
      Recipe: {
        Name: "",
        Img: "",
        Instructions: [{ Name: "" }],
        Duration: undefined,
        Difficulty: undefined,
        Description: "",
        UserId: localStorage.getItem("userId")
          ? Number(localStorage.getItem("userId"))
          : undefined,
        Categoryid: undefined,
        Ingridents: [{ Name: "", Count: 1, Type: "" }],
      },
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
    const fixedData = {
      ...data.Recipe,
      Categoryid: Number(data.Recipe.Categoryid),
      UserId: Number(data.Recipe.UserId),
    };

    console.log("נתונים מתוקנים:", fixedData);
    console.log(JSON.stringify(fixedData, null, 2));

    console.log(data);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/recipe",
        fixedData
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
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
                  {...register("Recipe.Duration", {
                    setValueAs: (v) => (v === "" ? null : Number(v)),
                  })}
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
                  {...register("Recipe.Difficulty", {
                    setValueAs: (v) => (v === "" ? null : Number(v)),
                  })}
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
                  defaultValue={""}
                  {...register("Recipe.Categoryid", {
                    setValueAs: (v) => (v === "" ? null : Number(v)),
                  })}
                  error={!!errors.Recipe?.Categoryid}
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
                  {errors?.Recipe?.Categoryid?.message}
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
                      {...register(`Recipe.Instructions.${index}.Name`)}
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
                  onClick={() => appendInstruction({ Name: "" })}
                  variant="contained"
                  sx={{ bgcolor: "#d32f2f", color: "#ffffff" }}
                  startIcon={<Add />}
                >
                  הוסף שלב
                </Button>
                <Typography color="error">
                  {/* {errors?.Recipe?.Ingridents.} */}
                </Typography>
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
                      {...register(`Recipe.Ingridents.${index}.Count`, {
                        setValueAs: (v) => (v === "" ? null : Number(v)),
                      })}
                      label="כמות"
                      type="number"
                      sx={{ width: "200px" }}
                    />
                    <TextField
                      {...register(`Recipe.Ingridents.${index}.Type`)}
                      label="סוג"
                      sx={{ width: "200px" }}
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
                    appendIngridents({ Name: "", Count: 1, Type: "" })
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
                  onClick={() => {
                    console.log(watchedValues);
                    console.log(JSON.stringify(watchedValues, null, 2));
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
