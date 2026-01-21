'use client';

import { signUp } from "@/util/authentication";
import { useActionState } from "react";
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export function Form() {
  const initialState = {
    error: ''
  };

  const [formState, formAction, isPending] = useActionState(signUp, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-4">
      {formState.error && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {formState.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Nome de Exibição</Label>
        <Input
          id="username"
          name="name"
          type="text"
          placeholder="Escolha seu nome"
          disabled={isPending}
          className="bg-input/50"
        />
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Crie uma senha"
            disabled={isPending}
            className="bg-input/50 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirme a Senha</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmation"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme a sua senha"
            disabled={isPending}
            className="bg-input/50 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Criando conta...
          </>
        ) : (
          'Criar conta'
        )}
      </Button>
    </form>
  )
}