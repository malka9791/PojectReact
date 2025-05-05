import { TextField, Box, Button } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  Recipe: {
    id: number;
    name: string;
    imageUrl: string; 
    instructions: string[];
    duration: number;
    difficulty: number;
    description: string;
    userId: number;
    categoryId: number;
    Ingrident: {
      name: string;
      count: number;
      type1: string;
    }[];
  };
};

// סכמת ולידציה עם yup
const schema = yup.object().shape({
  Recipe: yup
    .object()
    .shape({
      id: yup
        .number()
        .typeError("ID must be a number")
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        )
        .required("ID is required"),
      name: yup.string().required("Name is required"),
      imageUrl: yup.string().required("Image URL is required"),
      duration: yup
        .number()
        .typeError("duration must be a number")
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        )
        .required("Duration is required"),
      difficulty: yup
        .number()
        .typeError("difficulty must be a number")
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        )
        .required("Difficulty is required"),
      description: yup.string().required("Description is required"),
      instructions: yup.array().of(yup.string().required("Instructions is required")).required(),
      userId: yup
        .number()
        .typeError("USERID must be a number")
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        )
        .required("userId is required"),
      categoryId: yup
        .number()
        .typeError("CATEGORYID must be a number")
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        )
        .required("categoryId is required"),

      Ingrident: yup
        .array()
        .of(
          yup.object().shape({
            name: yup.string().required("Ingredient name is required"),
            count: yup
              .number()
              .required("Count is required")
              .positive()
              .typeError("count must be a number")
              .transform((value, originalValue) =>
                originalValue === "" ? undefined : value
              ),
            type1: yup.string().required("Type is required"),
          })
        )
        .required("Ingredients are required")
        .min(1, "At least one ingredient is required"),
    })
    .required("Recipe is required"),
});

export default function Test() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      Recipe: {
        id: undefined,
        name: "",
        imageUrl: "",
        instructions:[],
        duration: undefined,
        difficulty: undefined,
        description: "",
        userId: undefined,
        categoryId: undefined,
        Ingrident: [],
      },
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "Recipe.Ingrident", // ניגש לרשימת המרכיבים בתוך המתכון
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            padding: 3,
            borderRadius: 2,
            width: 400,
            margin: "auto",
            boxShadow: 3,
          }}
        >
          <h3>הוסף מתכון</h3>
          <TextField
            {...register("Recipe.name")}
            label="Name"
            fullWidth
            margin="normal"
            error={!!errors.Recipe?.name}
          />
          <p>{errors?.Recipe?.name?.message}</p>
          <TextField
            {...register("Recipe.instructions")}
            label="Instructions"
            fullWidth
            margin="normal"
            error={!!errors.Recipe?.name}
          />
          <p>{errors?.Recipe?.instructions?.message}</p>

          <TextField
            {...register("Recipe.imageUrl")}
            label="Image URL"
            fullWidth
            margin="normal"
            error={!!errors.Recipe?.imageUrl}
          />
          {errors.Recipe?.imageUrl && <p>{errors.Recipe.imageUrl.message}</p>}

          <TextField
            {...register("Recipe.duration")}
            label="Duration"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.Recipe?.duration}
          />
          {errors.Recipe?.duration && <p>{errors.Recipe.duration.message}</p>}

          <TextField
            {...register("Recipe.difficulty" as const, {
              valueAsNumber: true,
              required: true,
            })}
            label="Difficulty"
            type="number"
            fullWidth
            margin="normal"
            // error={!!errors.Recipe?.difficulty}
          />
          {/* {errors.Recipe?.difficulty && */}
          <p>{errors?.Recipe?.difficulty?.message}</p>
          {/* } */}

          <TextField
            {...register("Recipe.description")}
            label="Description"
            fullWidth
            type="text"
            margin="normal"
            error={!!errors.Recipe?.description}
          />
          <p>{errors?.Recipe?.description?.message}</p>
          <TextField
            {...register("Recipe.userId" as const, {
              valueAsNumber: true,
              required: true,
            })}
            label="UserId"
            type="number"
            fullWidth
            margin="normal"
          />
          <p>{errors?.Recipe?.userId?.message}</p>
          <TextField
            {...register("Recipe.categoryId" as const, {
              valueAsNumber: true,
              required: true,
            })}
            label="CategoryId"
            type="number"
            fullWidth
            margin="normal"
          />
          <p>{errors?.Recipe?.categoryId?.message}</p>
          {fields.map((ingredient, ingrIndex) => (
            <div key={ingredient.id}>
              <>רכיב נוסף</>
              <TextField
                {...register(`Recipe.Ingrident.${ingrIndex}.name`)}
                label="Ingredient Name"
                fullWidth
                margin="normal"
                error={!!errors.Recipe?.Ingrident?.[ingrIndex]?.name}
              />
              {errors.Recipe?.Ingrident?.[ingrIndex]?.name && (
                <p>{errors.Recipe?.Ingrident?.[ingrIndex].name.message}</p>
              )}

              <TextField
                {...register(`Recipe.Ingrident.${ingrIndex}.count` as const, {
                  valueAsNumber: true,
                })}
                label="Count"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.Recipe?.Ingrident?.[ingrIndex]?.count}
              />
              {errors.Recipe?.Ingrident?.[ingrIndex]?.count && (
                <p>{errors.Recipe.Ingrident[ingrIndex].count.message}</p>
              )}

              <TextField
                {...register(`Recipe.Ingrident.${ingrIndex}.type1`)}
                label="Type"
                fullWidth
                margin="normal"
                // error={!!errors.Recipe?.Ingrident?.[ingrIndex]?.type1}
              />
              {errors.Recipe?.Ingrident?.[ingrIndex]?.type1 && (
                <p>{errors.Recipe?.Ingrident[ingrIndex]?.type1.message}</p>
              )}
              <Button type="button" onClick={() => remove(ingrIndex)}>
                DELETE
              </Button>
            </div>
          ))}

          {/* כפתור להוספת מרכיב חדש */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => append({ name: "", count: 1, type1: "" })}
          >
            הוסף מרכיב
          </Button>
          <br />
          <input className="submit" type="submit" value="Send" />
        </Box>
      </form>
    </div>
  );
}
