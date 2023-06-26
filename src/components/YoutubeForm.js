import React, { useEffect } from "react";
import "./Youtube.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const YoutubeForm = () => {
  const form = useForm({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();

      return {
        name: "",
        email: "",
        channel: "",
        social: {
          instagram: "",
          facebook: "",
        },
        phoneNumbers: ["", ""],
        interests: [{ interest: "" }],
        age: "",
        dob: new Date(),
      };
    },
    mode: "all",
  });
  const { register, control, handleSubmit, formState, getValues, reset } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "interests",
    control,
  });

  const onSubmit = (data) => {
    console.log("data", data);
  };

  const handleGetValues = () => {
    console.log("getValues", getValues("age"));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="main">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-div">
          <label htmlFor="name">Name</label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => {
              return (
                <input
                  type="text"
                  id="name"
                  {...field}
                  {...register("name", {
                    required: "Name is Required",
                  })}
                />
              );
            }}
          />
          <p className="err-msg">{errors.name?.message}</p>
        </div>

        <div className="social">
          <div className="input-div">
            <label htmlFor="email">Email Id</label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                  message: "invalid Email",
                },
              })}
            />
            <p className="err-msg">{errors.email?.message}</p>
          </div>

          <div className="input-div">
            <label htmlFor="channel">Channel</label>
            <input type="text" id="channel" {...register("channel")} />
            <p className="err-msg">{errors.channel?.message}</p>
          </div>
        </div>

        <div className="social">
          <div className="input-div">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="text"
              id="instagram"
              {...register("social.instagram", {
                required: "This field is required",
              })}
            />
            <p className="err-msg">{errors.social?.instagram?.message}</p>
          </div>

          <div className="input-div">
            <label htmlFor="facebook">facebook</label>
            <input type="text" id="facebook" {...register("social.facebook")} />
          </div>
        </div>

        <div className="social">
          <div className="input-div">
            <label htmlFor="primary">Primary Phone Number</label>
            <input
              type="text"
              id="primary"
              {...register("phoneNumbers.0", {
                required: "This field is required",
                pattern: {
                  value: /^[6-9]{1}[0-9]{9}$/,
                  message: "invalid phone Number",
                },
              })}
            />
            <p className="err-msg">{errors.phoneNumbers?.[0]?.message}</p>
          </div>

          <div className="input-div">
            <label htmlFor="secondary">Secondary Phone Number</label>
            <input
              type="text"
              id="secondary"
              {...register("phoneNumbers.1", {
                pattern: {
                  value: /^[6-9]{1}[0-9]{9}$/,
                  message: "invalid phone Number",
                },
              })}
            />
            <p className="err-msg">{errors.phoneNumbers?.[1]?.message}</p>
          </div>
        </div>

        <div className="social">
          <div className="input-div">
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
            <p className="err-msg">{errors.age?.message}</p>
          </div>

          <div className="input-div">
            <label htmlFor="dob">DOB</label>
            <input
              type="date"
              id="dob"
              {...register("dob", {
                valueAsDate: true,
                required: {
                  value: true,
                  message: "DOB is required",
                },
              })}
            />
            <p className="err-msg">{errors.dob?.message}</p>
          </div>
        </div>

        <div>
          <label htmlFor="interest">Interests</label>
          <div className="interests-div">
            {fields.map((field, index) => {
              return (
                <div className="interests-div" key={field.id}>
                  <input
                    type="text"
                    {...register(`interests.${index}.interest`)}
                  />
                  {index > 0 && (
                    <button
                      className="new-btn red"
                      onClick={() => remove(index)}
                    >
                      remove
                    </button>
                  )}
                </div>
              );
            })}
            <button
              className="new-btn green"
              onClick={() => append({ interest: "" })}
            >
              Add
            </button>
          </div>
        </div>

        <div className="handle-btns">
          <button className="submit-btn">Submit</button>
          <button type="button" onClick={() => reset()} className="submit-btn">
            Reset
          </button>
          <button
            onClick={handleGetValues}
            type="button"
            className="submit-btn"
          >
            Get Values
          </button>
        </div>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
