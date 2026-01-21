'use client'

import React from "react"

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Settings } from 'lucide-react'
import type { Character, CharacterStat } from '@/lib/types'

interface CharacterCardProps {
  character: Character
  onStatChange?: (characterId: string, statName: string, newValue: number) => void
  onEdit?: (character: Character) => void
}

function StatBar({ 
  stat, 
  onIncrease, 
  onDecrease 
}: { 
  stat: CharacterStat
  onIncrease: () => void
  onDecrease: () => void
}) {
  const percentage = (stat.current / stat.max) * 100

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{stat.name}</span>
        <span className="text-muted-foreground">{stat.current}/{stat.max}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 shrink-0 bg-transparent"
          onClick={onDecrease}
          disabled={stat.current <= 0}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <div className="relative flex-1 h-3 rounded-full overflow-hidden bg-muted">
          <div 
            className="h-full transition-all duration-200 rounded-full"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: stat.color 
            }}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 shrink-0 bg-transparent"
          onClick={onIncrease}
          disabled={stat.current >= stat.max}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

export function CharacterCard({ character, onStatChange, onEdit }: CharacterCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-32 overflow-hidden bg-muted">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(https://picsum.photos/seed/${character.id}/400/200)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <h3 className="font-bold text-lg leading-tight">{character.name}</h3>
            <p className="text-sm text-muted-foreground">
              Level {character.level} {character.class}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {character.gameSystem}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {character.stats.map((stat) => (
          <StatBar
            key={stat.name}
            stat={stat}
            onIncrease={() => onStatChange?.(character.id, stat.name, Math.min(stat.current + 1, stat.max))}
            onDecrease={() => onStatChange?.(character.id, stat.name, Math.max(stat.current - 1, 0))}
          />
        ))}
        
        <Button 
          variant="outline" 
          className="w-full mt-4 bg-transparent"
          onClick={() => onEdit?.(character)}
        >
          <Settings className="mr-2 h-4 w-4" />
          Edit Character
        </Button>
      </CardContent>
    </Card>
  )
}
