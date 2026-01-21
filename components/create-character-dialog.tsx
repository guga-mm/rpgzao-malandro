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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, X } from 'lucide-react'
import type { Character, CharacterStat } from '@/lib/types'

interface CreateCharacterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (character: Omit<Character, 'id' | 'createdAt' | 'owner'>) => void
}

const gameSystemPresets: Record<string, CharacterStat[]> = {
  'D&D 5e': [
    { name: 'HP', current: 10, max: 10, color: 'oklch(0.65 0.2 25)' },
    { name: 'Spell Slots', current: 2, max: 2, color: 'oklch(0.65 0.2 260)' },
  ],
  'Pathfinder 2e': [
    { name: 'HP', current: 15, max: 15, color: 'oklch(0.65 0.2 25)' },
    { name: 'Focus Points', current: 1, max: 1, color: 'oklch(0.75 0.15 65)' },
  ],
  'Call of Cthulhu 7e': [
    { name: 'HP', current: 10, max: 10, color: 'oklch(0.65 0.2 25)' },
    { name: 'Sanity', current: 50, max: 50, color: 'oklch(0.55 0.15 180)' },
    { name: 'Magic Points', current: 10, max: 10, color: 'oklch(0.70 0.12 280)' },
  ],
  'Cyberpunk RED': [
    { name: 'HP', current: 40, max: 40, color: 'oklch(0.65 0.2 25)' },
    { name: 'Humanity', current: 60, max: 60, color: 'oklch(0.65 0.2 180)' },
  ],
  'Blades in the Dark': [
    { name: 'Stress', current: 0, max: 9, color: 'oklch(0.65 0.2 25)' },
    { name: 'Harm', current: 0, max: 4, color: 'oklch(0.55 0.22 25)' },
  ],
  'Other': [
    { name: 'HP', current: 10, max: 10, color: 'oklch(0.65 0.2 25)' },
  ],
}

const gameSystems = Object.keys(gameSystemPresets)

export function CreateCharacterDialog({ open, onOpenChange, onSubmit }: CreateCharacterDialogProps) {
  const [name, setName] = useState('')
  const [gameSystem, setGameSystem] = useState('')
  const [characterClass, setCharacterClass] = useState('')
  const [level, setLevel] = useState('1')
  const [stats, setStats] = useState<CharacterStat[]>([])

  const handleGameSystemChange = (system: string) => {
    setGameSystem(system)
    setStats(gameSystemPresets[system] || [])
  }

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
    
    onSubmit({
      name,
      gameSystem,
      class: characterClass,
      level: parseInt(level),
      imageUrl: '/characters/default.jpg',
      stats: stats.filter(s => s.name.trim() !== '')
    })

    // Reset form
    setName('')
    setGameSystem('')
    setCharacterClass('')
    setLevel('1')
    setStats([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Character</DialogTitle>
          <DialogDescription>
            Add a new character to track. Stats are pre-filled based on the game system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Character Name</Label>
            <Input
              id="name"
              placeholder="e.g., Thorin Ironforge"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gameSystem">Game System</Label>
              <Select value={gameSystem} onValueChange={handleGameSystemChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  {gameSystems.map((system) => (
                    <SelectItem key={system} value={system}>
                      {system}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                type="number"
                min="1"
                max="99"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class / Role</Label>
            <Input
              id="class"
              placeholder="e.g., Paladin, Netrunner, Investigator"
              value={characterClass}
              onChange={(e) => setCharacterClass(e.target.value)}
              required
            />
          </div>

          {stats.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Stats to Track</Label>
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
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name || !gameSystem || !characterClass}>
              Create Character
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
