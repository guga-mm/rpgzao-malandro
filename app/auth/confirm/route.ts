import { createClient } from '@/util/supabase/server';
import { EmailOtpType, MobileOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export async function GET(request: { url: string | URL; }) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType;
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  redirect('/signin');
}