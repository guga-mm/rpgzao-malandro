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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Campaign } from '@/lib/types'

interface CreateCampaignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'currentPlayers' | 'pendingRequests' | 'announcements' | 'resources'>) => void
}

const gameSystems = [
  'D&D 5e',
  'Pathfinder 2e',
  'Call of Cthulhu 7e',
  'Cyberpunk RED',
  'Blades in the Dark',
  'Vampire: The Masquerade',
  'Shadowrun 6e',
  'FATE Core',
  'Other'
]

export function CreateCampaignDialog({ open, onOpenChange, onSubmit }: CreateCampaignDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gameSystem, setGameSystem] = useState('')
  const [maxPlayers, setMaxPlayers] = useState('4')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    onSubmit({
      title,
      description,
      imageUrl: '/campaigns/default.jpg',
      gameMaster: 'Alex the Brave',
      gameSystem,
      maxPlayers: parseInt(maxPlayers),
      status: 'recruiting'
    })

    // Reset form
    setTitle('')
    setDescription('')
    setGameSystem('')
    setMaxPlayers('4')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Set up a new campaign for your group. You'll be the Game Master.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title</Label>
            <Input
              id="title"
              placeholder="e.g., The Lost Mine of Phandelver"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gameSystem">Game System</Label>
            <Select value={gameSystem} onValueChange={setGameSystem} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a game system" />
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
            <Label htmlFor="maxPlayers">Maximum Players</Label>
            <Select value={maxPlayers} onValueChange={setMaxPlayers}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} players
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your campaign setting, themes, and what players can expect..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title || !gameSystem || !description}>
              Create Campaign
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
