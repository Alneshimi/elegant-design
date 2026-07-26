"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<
      HTMLFormElement
    >
  ) {
    e.preventDefault();

    setLoading(true);

    const form =
      new FormData(
        e.currentTarget
      );

    const email =
      form.get(
        "email"
      ) as string;

    const password =
      form.get(
        "password"
      ) as string;

    const result = await signIn("credentials", {
  email,
  password,
  redirect: false,
});

console.log(result);

   if (result?.ok) {
  window.location.href = "/admin/dashboard";
} else {
  console.log(result);
  alert(result?.error || "Login failed");
}
    setLoading(false);
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="bg-white p-10 rounded-2xl shadow w-full max-w-md space-y-5"
    >
      <h1 className="text-3xl font-bold text-center">
        Admin Login
      </h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-3 rounded-lg"
        required
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        {loading
          ? "Logging in..."
          : "Login"}
      </button>
    </form>
  );
}