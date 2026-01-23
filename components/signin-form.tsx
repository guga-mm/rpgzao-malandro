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