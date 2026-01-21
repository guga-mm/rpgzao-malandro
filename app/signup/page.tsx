import { createClient } from "@/util/supabase/server";
import { Form } from "../../components/signup-form";
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dices } from 'lucide-react'

export default async function SignUp() {
  const supabase = await createClient();
  console.log((await supabase.auth.getSession()).data.session ? "logged in" : "not logged");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
            <Dices className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">RPGzão Malandro</h1>
          <p className="text-muted-foreground text-sm mt-1">O portal dos nerdolas</p>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Crie uma conta</CardTitle>
            <CardDescription>Junte-se às nerdices do RPGzão de Malandro</CardDescription>
          </CardHeader>
          <CardContent>
            <Form />

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Já possui uma conta?{' '}
              <Link href="/signin" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Faça login.
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Ao criar uma conta, você concorda em dar um Fim aos Dias.
        </p>
      </div>
    </div>
  );
}
