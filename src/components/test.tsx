import { duration, TextField } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import  * as yup from "yup"
type FormValues = {
  Recipe: {
    id: number;
    name: string;
    pictureUrl: string;
    duration: number;
    difficulty: number;
    description: string;
  }[];
};

const schema = yup.object().shape({

  Recipe: yup.array().of(
    yup.object().shape({
      id: yup.number().required("City is required"),
      name: yup.string().required("Street name is required"),
      pictureUrl: yup.string().required("Street number must be positive"),
      duration: yup.number().required("City is required"),
      difficulty: yup.number().required("City is required"),
      description: yup.string().required("Street number must be positive"),
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
    resolver:yupResolver(schema),
    defaultValues: {
      Recipe: [
        {
          id: undefined,
          name: "",
          pictureUrl: "",
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
                <TextField
                  placeholder="id"
                  type="number"
                  label="id"
                  {...register(`Recipe.${index}.id` as const, {
                    required: true,
                  })}
                  className={errors?.Recipe?.[index]?.id ? "error" : ""}
                />
                <p>{errors?.Recipe?.[index]?.id?.message}</p>

                <TextField
                  placeholder="name"
                  type="string"
                  label="name"
                  {...register(`Recipe.${index}.name` as const, {
                    required: true,
                  })}
                  className={errors?.Recipe?.[index]?.name ? "error" : ""}
                />
                <p>{errors?.Recipe?.[index]?.name?.message}</p>

                <TextField
                  placeholder="pictureUrl"
                  type="string"
                  label="picture"
                  {...register(`Recipe.${index}.pictureUrl` as const, {
                    // valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.Recipe?.[index]?.pictureUrl ? "error" : ""}
                />
                 <TextField
                  placeholder="duration"
                  type="string"
                  label="picture"
                  {...register(`Recipe.${index}.duration` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.Recipe?.[index]?.duration ? "error" : ""}
                /> <TextField
                placeholder="difficulty"
                type="string"
                label="difficulty"
                {...register(`Recipe.${index}.difficulty` as const, {
                  valueAsNumber: true,
                  required: true,
                })}
                className={errors?.Recipe?.[index]?.difficulty ? "error" : ""}
              />
                <p>{errors?.Recipe?.[index]?.difficulty?.message}</p>
                <TextField
                  placeholder="description"
                  type="string"
                  label="description"
                  {...register(`Recipe.${index}.description` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.Recipe?.[index]?.description ? "error" : ""}
                />
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}

        {/* <Total control={control} /> */}

        <button
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
        </button>
        <input className="submit" type="submit" value="Send" />
      </form>
    </div>
  );
}
