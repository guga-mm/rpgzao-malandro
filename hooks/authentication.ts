'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/util/supabase/server';

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
        return { message: '' };
    }

}

export async function sendPasswordRecoveryRequest(
    currentState: { message: string },
    formData: FormData
) {
    const supabase = await createClient();
    const email = formData.get('email') as string;

    const getUrl = () => {
        let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/';
        url = url.startsWith('http') ? url : `https://${url}`;
        url = url.endsWith('/') ? url : `${url}/`;
        return url;
    }

    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getUrl() + "/signin/recovery/password"
    });

    if (error) {
        return { message: error.message }
    } else {
        return { message: 'Email de recuperação enviado!' };
    }
}

export async function recoverPassword(
    currentState: { message: string },
    formData: FormData
) {
    const supabase = await createClient();
    const password = formData.get('password') as string;
    const confirmation = formData.get('confirmation') as string;

    if (confirmation != password) return { message: 'Os campos de confirmação e senha estão diferentes!' }

    console.log(await supabase.auth.getSession());

    const { data, error } = await supabase.auth.updateUser({
        password
    });

    if (error) {
        return { message: error.message }
    } else {
        redirect("/");
        return { message: '' };
    }
}
