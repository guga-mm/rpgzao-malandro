'use client';

import { authenticate } from "@/util/authentication";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useActionState, useState } from "react";
import Link from "next/link";

export default function Form() {
    const initialState = {
        error: '',
    };

    const [formState, formAction, isLoading] = useActionState(authenticate, initialState);
    const [showPassword, setShowPassword] = useState(false)

    return (
        <form action={formAction} className="space-y-4">
            {formState.error && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {formState.error}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="guga@email.com"
                    disabled={isLoading}
                    className="bg-input/50"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                        href="/signin/recovery"
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        Esqueceu a senha?
                    </Link>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        disabled={isLoading}
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

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Fazendo login...
                    </>
                ) : (
                    'Faça login'
                )}
            </Button>
        </form>
    )
}