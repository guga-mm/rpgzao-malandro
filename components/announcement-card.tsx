import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pin, Megaphone } from 'lucide-react'
import type { Announcement } from '@/lib/types'

interface AnnouncementCardProps {
  announcement: Announcement
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const date = new Date(announcement.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <Card className={announcement.isPinned ? 'border-primary/50 bg-primary/5' : ''}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold leading-tight text-balance">{announcement.title}</h3>
              <p className="text-sm text-muted-foreground">
                by {announcement.author} · {date}
              </p>
            </div>
          </div>
          {announcement.isPinned && (
            <Badge variant="outline" className="shrink-0 gap-1 border-primary/50 text-primary">
              <Pin className="h-3 w-3" />
              Pinned
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {announcement.content}
        </p>
      </CardContent>
    </Card>
  )
}
