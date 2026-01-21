'use client'

import React from "react"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

interface SubmitCharacterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (character: { name: string; source: string }) => void
}

export function SubmitCharacterDialog({ open, onOpenChange, onSubmit }: SubmitCharacterDialogProps) {
  const [name, setName] = useState('')
  const [source, setSource] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, source })
    setName('')
    setSource('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit a Character</DialogTitle>
          <DialogDescription>
            Request to add a new character to the Smash or Pass game.
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Submitted characters will be reviewed by moderators before appearing in the game.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="char-name">Character Name</Label>
            <Input
              id="char-name"
              placeholder="e.g., Geralt of Rivia"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="char-source">Source / Game</Label>
            <Input
              id="char-source"
              placeholder="e.g., The Witcher, D&D"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name || !source}>
              Submit for Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
