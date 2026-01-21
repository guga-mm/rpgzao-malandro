import { createClient } from "@/util/supabase/server";
import { Form } from "@/components/recovery-form";
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dices, ArrowLeft } from 'lucide-react'

export default async function SignUp() {
  const supabase = await createClient();
  console.log((await supabase.auth.getSession()).data.session ? "logged in" : "not logged");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
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
            <CardTitle className="text-xl">Esqueceu sua senha?</CardTitle>
            <CardDescription>
              {"Insira seu email para te enviarmos um link para recuperação!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form />

            <div className="mt-6 text-center">
              <Link
                href="/signin"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
