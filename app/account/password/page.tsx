import { createClient } from "@/util/supabase/server";
import { Form } from "@/components/password-recovery-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft, Dices } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

async function ChangePassword() {
  const supabase = await createClient();
  console.log((await supabase.auth.getSession()).data.session ? "logged in" : "not logged");

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl">Alterar senha</CardTitle>
        <CardDescription>
          Altere sua senha abaixo
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
            Voltar para o login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
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

        <Suspense fallback={
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </CardContent>
          </Card>
        }>
          <ChangePassword />
        </Suspense>
      </div>
    </div>
  )
}
