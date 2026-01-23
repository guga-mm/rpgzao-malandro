'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Crown, ChevronRight } from 'lucide-react'
import type { Campaign, User } from '@/lib/types'
import Link from 'next/link'

interface CampaignCardProps {
  campaign: Campaign
  onJoinRequest?: (campaignId: string) => void
  currentUser?: User
}

export function CampaignCard({ campaign, onJoinRequest, currentUser }: CampaignCardProps) {
  const isPlayer = campaign.currentPlayers?.some(player => player.id == currentUser?.id);
  const hasPendingRequest = /* campaign.pendingRequests.includes(currentUser) */ false;
  const isGM = campaign.gamemaster?.id === currentUser?.id;
  const isFull = (campaign.currentPlayers?.length || 0) >= (campaign.player_limit || 0);

  console.log(isGM);
  console.log(campaign.gamemaster?.id);
  console.log(currentUser?.id);

  const statusColors = {
    'active': 'bg-chart-3/20 text-chart-3 border-chart-3/30',
    'completed': 'bg-muted text-muted-foreground border-muted'
  }

  const statusLabels = {
    'active': 'Ativa',
    'completed': 'Finalizada'
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-colors hover:border-primary/50">
      <div className="relative h-40 overflow-hidden bg-muted">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(https://picsum.photos/seed/${campaign.id}/400/200)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <Badge className={statusColors[campaign.status || "completed"]}>
            {statusLabels[campaign.status || "completed"]}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-tight text-balance">{campaign.title}</h3>
            <p className="text-sm text-muted-foreground">{campaign.game}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {campaign.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Crown className="h-4 w-4 text-primary" />
            <span>{campaign.gamemaster?.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{campaign.currentPlayers?.length}/{campaign.player_limit}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2 border-t border-border pt-4">
        <Button asChild variant="secondary" className="flex-1">
          <Link href={`/campaigns/${campaign.id}`}>
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        
        {!isGM && !isPlayer && !hasPendingRequest && campaign.status === 'active' && !isFull && (
          <Button 
            onClick={() => onJoinRequest?.(campaign.id || '')}
            className="flex-1"
          >
            Request to Join
          </Button>
        )}
        
        {hasPendingRequest && (
          <Button variant="outline" disabled className="flex-1 bg-transparent">
            Request Pending
          </Button>
        )}
        
        {(isPlayer || isGM) && (
          <Badge variant="outline" className="h-9 px-3 border-primary/50 text-primary">
            {isGM ? 'Game Master' : 'Player'}
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}
