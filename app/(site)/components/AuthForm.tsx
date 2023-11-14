"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant == "LOGIN") setVariant("REGISTER");
    else setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant == "REGISTER") {
      axios
        .post("/api/register", data)
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => setIsLoading(false));
    }
    if (variant == "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials");
          } else if (callback?.ok) {
            toast.success("Signed In Successfully");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok) {
          console.log("logged in");
          toast.success("Login Successful");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full mx-auto shadow-md rounded-lg bg-white">
      <div className="px-8 py-5">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              register={register}
              id="name"
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            label="Email Adress"
            register={register}
            id="email"
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label="Password"
            register={register}
            type={"password"}
            id="password"
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign-In" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-500" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-sm text-gray-500">
                Or Continue With
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-6">
          <AuthSocialButton
            onClick={() => socialAction("github")}
            icon={BsGithub}
          />
          <AuthSocialButton
            onClick={() => socialAction("google")}
            icon={BsGoogle}
          />
        </div>

        <div className="flex gap-2 text-gray-500 justify-center text-sm mt-6 px-2">
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an Account?"}
          </div>
          <div
            onClick={toggleVariant}
            className={"text-sky-500 underline cursor-pointer"}
          >
            {variant === "LOGIN" ? "Create an Account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
