import { authenticate, signUp } from "@/hooks/authentication";
import Image from "next/image";
import { Form } from "./form";
import supabase from "@/util/supabase/server";

export default async function SignUp() {
  console.log((await supabase.auth.getSession()).data.session ? "logged in" : "not logged");

  return (
  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="/image/torturado.webp" alt="Your Company" className="mx-auto h-12 w-auto" />
      <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-white">Faça sua conta!</h2>
    </div>

    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form />

      <p className="mt-5 text-center text-sm/6 text-gray-400">
        Já tem uma conta? 
        <a href="/signin" className="font-semibold text-indigo-400 hover:text-indigo-300"> Faça login.</a>
      </p>
    </div>
  </div>
  );
}
