import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { user, login, authError, setAuthError } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // React Hook Form for handling form state and validation

  useEffect(() => {
    if (user) {
      navigate("/");
    }
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/register"
            className="font-medium text-primary transition-all duration-200 hover:underline">
            Register Now
          </Link>
        </p>
        {authError && (
          <p className="text-red-600 mt-8 text-center">{authError}</p>
        )}
        <form onSubmit={handleSubmit(login)} noValidate>
          <div className="space-y-5 flex flex-col mt-10">
            <input
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              id="username"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <span className="text-red-600 ml-1">
                {errors.username.message}
              </span>
            )}

            <input
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
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
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
