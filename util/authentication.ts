'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/util/supabase/server';

export async function authenticate(
    currentState: { error: string },
    formData: FormData
) {
    const supabase = await createClient();

    const getUrl = () => {
        let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/';
        url = url.startsWith('http') ? url : `https://${url}`;
        url = url.endsWith('/') ? url : `${url}/`;
        return url;
    };

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
            redirectTo: getUrl() + 'auth/callback',
        },
    });

    if (error) {
        return { error: error.message };
    }

    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    };

    return { error: '' };
}

export async function signUp(
    currentState: { error: string },
    formData: FormData
) {
    const supabase = await createClient();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmation = formData.get('confirmation') as string;

    if (confirmation != password) return { error: 'Os campos de confirmação e senha estão diferentes!' }

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
        return { error: error.message }
    } else {
        redirect("/");
    }

}

export async function sendPasswordRecoveryRequest(
    currentState: { error: string, message: string },
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
        return { error: error.message, message: '' };
    } else {
        return { error: '', message: 'Email de recuperação enviado!' };
    }
}

export async function recoverPassword(
    currentState: { error: string },
    formData: FormData
) {
    const supabase = await createClient();
    const password = formData.get('password') as string;
    const confirmation = formData.get('confirmation') as string;

    if (confirmation != password) return { error: 'Os campos de confirmação e senha estão diferentes!' }

    const { data, error } = await supabase.auth.updateUser({
        password
    });

    if (error) {
        return { error: error.message };
    } else {
        redirect("/");
    }
}
