import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let rederCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumber: string[];
  phNumber: {
    number: string;
  }[];
  age: number;
  date: Date;
};

export const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "batman@gmail.com",
      channel: "Movies",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumber: ["", ""],
      phNumber: [{ number: "" }],
      age: 0,
      date: new Date(),
    },
    mode: "all",
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumber",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  rederCount++;
  const mainStyle = {
    display: "flex",
    justifyContent: "center",
    height: "97vh",
  };

  return (
    <div style={mainStyle}>
      <div>
        <h1>YouTube Form {rederCount / 2}</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="formControl">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
            <p className="error">{errors.username?.message}</p>
          </div>

          <div className="formControl">
            {" "}
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email format",
                },
              })}
            />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div className="formControl">
            <label htmlFor="channel">Channel</label>
            <input
              type="text"
              id="channel"
              {...register("channel", {
                required: {
                  value: true,
                  message: "channel is required",
                },
              })}
            />
            <p className="error">{errors.channel?.message}</p>
          </div>

          <div className="formControl">
            <label htmlFor="twitter">Twitter</label>
            <input type="text" id="twitter" {...register("social.twitter")} />
          </div>

          <div className="formControl">
            <label htmlFor="facebook">Facebook</label>
            <input type="text" id="facebook" {...register("social.facebook")} />
          </div>

          <div className="formControl">
            <label htmlFor="primary-number">Primary Phone Number</label>
            <input
              type="text"
              id="primary-number"
              {...register("phoneNumber.0")}
            />
          </div>

          <div className="formControl">
            <label htmlFor="secondary-number">Secondary Phone Number</label>
            <input
              type="text"
              id="secondary-number"
              {...register("phoneNumber.1")}
            />
          </div>

          <div>
            <label>List of phone numbers</label>
            <div>
              {fields.map((field, index) => {
                return (
                  <div className="formControl" key={field.id}>
                    <input
                      type="text"
                      {...register(`phNumber.${index}.number` as const)}
                    />

                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}

              <div className="formControl">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  {...register("age", {
                    valueAsNumber: true,
                    required: {
                      value: true,
                      message: "Age is required",
                    },
                  })}
                />
                <p className="error">{errors.age?.message}</p>
              </div>

              <div className="formControl">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  {...register("date", {
                    valueAsDate: true,
                    required: {
                      value: true,
                      message: "Date is required", // Corrected error message
                    },
                  })}
                />
                <p className="error">{errors.date?.message}</p>
              </div>

              <button type="button" onClick={() => append({ number: "" })}>
                Add phone Number
              </button>
            </div>
          </div>
          <button disabled={!isDirty || !isValid}>Submit</button>
        </form>

        <DevTool control={control} />
      </div>
    </div>
  );
};
