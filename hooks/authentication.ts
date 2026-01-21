'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function authenticate(
    formData: FormData
) {
    const supabase = await createClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error(error.message);
    } else {
        redirect("/");
    }
}

export async function signUp(
    currentState: { message: string },
    formData: FormData
) {
    const supabase = await createClient();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmation = formData.get('confirmation') as string;

    if (confirmation != password) return { message: 'Os campos de confirmação e senha estão diferentes!' }

    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: name
            }
        }
    });

    if (error) {
        return { message: error.message }
    } else {
        redirect("/");
    }

    return { message: '' };
}
