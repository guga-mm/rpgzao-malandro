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
import { createClient } from "@/util/supabase/client"

interface CreateCampaignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'currentPlayers' | 'pendingRequests' | 'announcements' | 'resources'>) => void
}

const gameSystems = [
  'Ordem Paranormal RPG',
  'D&D',
  'Call of Cthulhu',
  'Daggerheart',
  'Candela Obscura',
  'Sacramento RPG',
  'Outro'
]

export function CreateCampaignDialog({ open, onOpenChange, onSubmit }: CreateCampaignDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGameSystem, setSelectedGameSystem] = useState('');
  const [gameSystem, setGameSystem] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('4');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      title,
      description,
      image_url: '/campaigns/default.jpg',
      game: gameSystem,
      player_limit: parseInt(maxPlayers),
      status: 'active'
    })

    // Reset form
    setTitle('')
    setDescription('')
    setSelectedGameSystem('')
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
            <Select value={selectedGameSystem}
              onValueChange={(value) => {setSelectedGameSystem(value); setGameSystem(value);}}
              required>
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
            {selectedGameSystem == 'Outro' ? (
              <Input
                id="othergame"
                placeholder="Sistema underground que ninguém nunca ouviu falar"
                value={gameSystem}
                onChange={(e) => setGameSystem(e.target.value)}
                required
              />
            ) : ""}
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
            <Button type="submit" disabled={!title || !selectedGameSystem || !description}>
              Create Campaign
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
