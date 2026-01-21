'use client';

import { sendPasswordRecoveryRequest } from "@/hooks/authentication";
import { useActionState } from "react";
import { useFormState } from "react-dom";

export function Form() {
    const initialState = {
        message: ''
    };

    const [formState, formAction] = useActionState(sendPasswordRecoveryRequest, initialState);

    return (
        <form action={formAction} className="space-y-6">        
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email</label>
          <div className="mt-2">
            <input id="email" type="email" name="email" required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        {formState?.message && (<div>
          <p className="justify-center">{formState.message}</p>
        </div>)}

        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Recuperar conta</button>
        </div>
      </form>
    )
}