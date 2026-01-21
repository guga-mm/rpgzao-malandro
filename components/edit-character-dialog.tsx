'use client'

import React from "react"

import { useState, useEffect } from 'react'
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
import { Plus, X, Trash2 } from 'lucide-react'
import type { Character, CharacterStat } from '@/lib/types'

interface EditCharacterDialogProps {
  character: Character | null
  onOpenChange: (open: boolean) => void
  onSubmit: (character: Character) => void
  onDelete: (characterId: string) => void
}

export function EditCharacterDialog({ character, onOpenChange, onSubmit, onDelete }: EditCharacterDialogProps) {
  const [name, setName] = useState('')
  const [characterClass, setCharacterClass] = useState('')
  const [level, setLevel] = useState('1')
  const [stats, setStats] = useState<CharacterStat[]>([])

  useEffect(() => {
    if (character) {
      setName(character.name)
      setCharacterClass(character.class)
      setLevel(character.level.toString())
      setStats([...character.stats])
    }
  }, [character])

  const handleStatChange = (index: number, field: keyof CharacterStat, value: string | number) => {
    setStats(stats.map((stat, i) => 
      i === index ? { ...stat, [field]: value } : stat
    ))
  }

  const handleAddStat = () => {
    setStats([...stats, { name: '', current: 10, max: 10, color: 'oklch(0.65 0.2 180)' }])
  }

  const handleRemoveStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (character) {
      onSubmit({
        ...character,
        name,
        class: characterClass,
        level: parseInt(level),
        stats: stats.filter(s => s.name.trim() !== '')
      })
    }
  }

  const handleDelete = () => {
    if (character && window.confirm('Are you sure you want to delete this character?')) {
      onDelete(character.id)
    }
  }

  if (!character) return null

  return (
    <Dialog open={!!character} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Character</DialogTitle>
          <DialogDescription>
            Update your character's details and stats.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Character Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-class">Class / Role</Label>
              <Input
                id="edit-class"
                value={characterClass}
                onChange={(e) => setCharacterClass(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-level">Level</Label>
              <Input
                id="edit-level"
                type="number"
                min="1"
                max="99"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Stats</Label>
              <Button type="button" variant="ghost" size="sm" onClick={handleAddStat}>
                <Plus className="mr-1 h-3 w-3" />
                Add Stat
              </Button>
            </div>
            
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Stat name"
                  value={stat.name}
                  onChange={(e) => handleStatChange(index, 'name', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Current"
                  value={stat.current}
                  onChange={(e) => handleStatChange(index, 'current', parseInt(e.target.value) || 0)}
                  className="w-20"
                />
                <span className="text-muted-foreground">/</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={stat.max}
                  onChange={(e) => handleStatChange(index, 'max', parseInt(e.target.value) || 0)}
                  className="w-20"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveStat(index)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button type="button" variant="destructive" onClick={handleDelete} className="sm:mr-auto">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name || !characterClass}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
