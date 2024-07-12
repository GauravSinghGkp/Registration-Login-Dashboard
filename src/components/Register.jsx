import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { registerUser, authError, setAuthError } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setAuthError("");
  }, []);

  return (
    <div className="flex items-center justify-center w-full py-20">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px] font-bold">
            RLDash
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Register to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign In
          </Link>
        </p>
        {authError && (
          <p className="text-red-600 mt-8 text-center">{authError}</p>
        )}

        <form onSubmit={handleSubmit(registerUser)} noValidate>
          <div className="space-y-5 flex flex-col mt-10">
            <input
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              id="username"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value:
                    /^(?!.*__)(?!.*_$)(?=.{3,15}$)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$/,
                  message:
                    "Username must be 3-15 characters long, contain only letters, numbers, and underscores, and cannot start or end with an underscore or have consecutive underscores",
                },
              })}
            />
            {errors.username && (
              <span className="text-red-600 ml-1">
                {errors.username.message}
              </span>
            )}

            <input
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              id="email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-600 ml-1">{errors.email.message}</span>
            )}

            <input
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-600 ml-1">
                {errors.password.message}
              </span>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-1 px-4 py-2 rounded-lg">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
