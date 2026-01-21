import { Navigation } from '@/components/navigation'
import { AnnouncementCard } from '@/components/announcement-card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollText, Users, Flame, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  //const activeCampaigns = campaigns.filter(c => c.status !== 'completed').length
  //const totalCharacters = characters.length
  //const topSmashed = [...smashPassCharacters].sort((a, b) => b.smashCount - a.smashCount)[0]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-6xl px-4 py-8 md:ml-[72px]">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance">
              Welcome to the <span className="text-primary">Quest Board</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Your group's hub for tabletop RPG adventures. Manage campaigns, 
              track characters, and have some fun along the way.
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-12 grid gap-4 sm:grid-cols-3">
          <Link href="/campaigns">
            <Card className="group cursor-pointer transition-colors hover:border-primary/50">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <ScrollText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">{0}</p>
                  <p className="text-sm text-muted-foreground">Active Campaigns</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/characters">
            <Card className="group cursor-pointer transition-colors hover:border-primary/50">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">{0}</p>
                  <p className="text-sm text-muted-foreground">Your Characters</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/smash-or-pass">
            <Card className="group cursor-pointer transition-colors hover:border-primary/50">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-5/20">
                  <Flame className="h-6 w-6 text-chart-5" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">{0}</p>
                  <p className="text-sm text-muted-foreground">Top Smash Count</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Announcements Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Announcements</h2>
            </div>
          </div>

          <div className="space-y-4">
            {/* {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))} */}
          </div>

          {/* {announcements.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">No announcements yet.</p>
              </CardContent>
            </Card>
          )} */}
        </section>

        {/* Quick Actions */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/campaigns">
                <ScrollText className="mr-2 h-4 w-4" />
                Browse Campaigns
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/characters">
                <Users className="mr-2 h-4 w-4" />
                Manage Characters
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/smash-or-pass">
                <Flame className="mr-2 h-4 w-4" />
                Play Smash or Pass
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
