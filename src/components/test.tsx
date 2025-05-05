import { duration, TextField, Box } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
type FormValues = {
  Recipe: {
    id: number;
    name: string;
    imageUrl: string;
    duration: number;
    difficulty: number;
    description: string;
    Ingrident:{
      
    }
  }[];
};

const schema = yup.object().shape({
  Recipe: yup.array().of(
    yup.object().shape({
      id: yup
        .number()
        .typeError("ID must be a number") // מוודא שהערך מספרי
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        )
        .required("ID is required"),
      name: yup.string().required("name is required"),
      imageUrl: yup
        .string()
        .required("imageUrl must be positive")
        .typeError("description is required") // מוודא שהערך מספרי
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        ),
      duration: yup
        .number()
        .required("duration is required")
        .typeError("duration is required") // מוודא שהערך מספרי
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        ),
      difficulty: yup
        .number()
        .required("difficulty is required")
        .typeError("dufficulty is required") // מוודא שהערך מספרי
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        ),
      description: yup
        .string()
        .required("description is required")
        .typeError("description is required") // מוודא שהערך מספרי
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        ),
    })
  ),
});

export default function Test() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Recipe: [
        {
          id: undefined,
          name: "",
          imageUrl: "",
          duration: undefined,
          difficulty: undefined,
          description: "",
        },
      ],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "Recipe",
    control,
  });
  const onSubmit = (data: FormValues | any) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <Box
                  sx={{
                    padding: 3,
                    borderRadius: 2,
                    width: 300,
                    margin: "auto",
                    boxShadow: 3,
                  }}
                >
                  <TextField
                    required
                    id="outlined-username"
                    type="number"
                    label="id"
                    variant="outlined"
                    {...register(`Recipe.${index}.id` as const, {
                      required: true,
                      valueAsNumber: true,
                    })}
                    className={errors?.Recipe?.[index]?.id ? "error" : ""}
                    margin="normal"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d32f2f", // Red border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#d32f2f", // Red border color on hover
                        },
                      },
                    }}
                  />
                  <p>{errors?.Recipe?.[index]?.id?.message}</p>
                  <TextField
                    required
                    id="outlined-username"
                    type="string"
                    label="name"
                    variant="outlined"
                    {...register(`Recipe.${index}.name` as const, {
                      required: true,
                    })}
                    className={errors?.Recipe?.[index]?.name ? "error" : ""}
                    margin="normal"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d32f2f", // Red border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#d32f2f", // Red border color on hover
                        },
                      },
                    }}
                  />
                  <p>{errors?.Recipe?.[index]?.name?.message}</p>
                  <TextField
                    required
                    id="outlined-username"
                    type="string"
                    label="imageUrl"
                    variant="outlined"
                    {...register(`Recipe.${index}.imageUrl` as const, {
                      required: true,
                    })}
                    className={errors?.Recipe?.[index]?.imageUrl ? "error" : ""}
                    margin="normal"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d32f2f", // Red border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#d32f2f", // Red border color on hover
                        },
                      },
                    }}
                  />
                  <p>{errors?.Recipe?.[index]?.imageUrl?.message}</p>

                  <TextField
                    required
                    id="outlined-username"
                    type="number"
                    label="duration"
                    variant="outlined"
                    {...register(`Recipe.${index}.duration` as const, {
                      required: true,
                    })}
                    className={errors?.Recipe?.[index]?.duration ? "error" : ""}
                    margin="normal"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d32f2f", // Red border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#d32f2f", // Red border color on hover
                        },
                      },
                    }}
                  />
                  <p>{errors?.Recipe?.[index]?.duration?.message}</p>
                  <TextField
                    required
                    id="outlined-username"
                    type="number"
                    label="difficulty"
                    variant="outlined"
                    {...register(`Recipe.${index}.difficulty` as const, {
                      required: true,
                    })}
                    className={
                      errors?.Recipe?.[index]?.difficulty ? "error" : ""
                    }
                    margin="normal"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d32f2f", // Red border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#d32f2f", // Red border color on hover
                        },
                      },
                    }}
                  />
                  <p>{errors?.Recipe?.[index]?.difficulty?.message}</p>
                  <TextField
                    required
                    id="outlined-username"
                    type="string"
                    label="description"
                    variant="outlined"
                    {...register(`Recipe.${index}.description` as const, {
                      required: true,
                    })}
                    className={
                      errors?.Recipe?.[index]?.description ? "error" : ""
                    }
                    margin="normal"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d32f2f", // Red border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#d32f2f", // Red border color on hover
                        },
                      },
                    }}
                  />
                  <p>{errors?.Recipe?.[index]?.description?.message}</p>
                </Box>

                {/* <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button> */}
              </section>
            </div>
          );
        })}

        {/* <Total control={control} /> */}

        {/* <button
          type="button"
          onClick={
            () => console.log("")

            // append({
            //   id: "",
            //   streetName: "",
            //   streetNumber: 1,
            // })
          }
        >
          APPEND
        </button> */}
        <input className="submit" type="submit" value="Send" />
      </form>
    </div>
  );
}
