'use client';

import { sendPasswordRecoveryRequest } from "@/util/authentication";
import { useActionState } from "react";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Mail, } from 'lucide-react'

export function Form() {
  const initialState = {
    error: '',
    message: '',
  };

  const [formState, formAction, isPending] = useActionState(sendPasswordRecoveryRequest, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {formState.error && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {formState.error}
        </div>
      )}

      {formState.message && (
        <div className="p-3 rounded-md bg-accent/10 border border-accent/20 text-accent text-sm">
          {formState.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="guga@email.com"
          disabled={isPending}
          className="bg-input/50"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Enviar confirmação
          </>
        )}
      </Button>
    </form>
  )
}