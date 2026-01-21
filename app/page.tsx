import { authenticate, signUp } from "@/util/authentication";
import { createClient } from "@/util/supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  console.log((await supabase.auth.getSession()).data.session ? "logged in" : "not logged");

  return (
  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="/image/torturado.webp" alt="Your Company" className="mx-auto h-12 w-auto" />
      <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-white">RPGzão de Malandro!!</h2>
    </div>

    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <h3 className="text-center mb-3 font-bold">Jogue o SMASH or PASS</h3>
        <div className="flex flex-col items-stretch gap-2">
            <a className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" href="/smashpass/players">Dos Players</a>
            <a className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" href="/smashpass/characters">Dos Personagens</a>
        </div>
    </div>
  </div>
  );
}
