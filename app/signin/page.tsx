
import { createClient } from "@/util/supabase/server";
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dices } from 'lucide-react'
import Form from "@/components/signin-form";

export default async function SignIn() {
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
            <CardTitle className="text-xl">Seja bem-vinde!</CardTitle>
            <CardDescription>Faça login com o Discord para continuar suas nerdices</CardDescription>
          </CardHeader>
          <CardContent>
            <Form />
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Ao fazer login, você concorda em virar o Torturado
        </p>
      </div>
    </div>
  );
}
