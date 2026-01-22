import { Navigation } from '@/components/navigation'
import { AnnouncementCard } from '@/components/announcement-card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollText, Users, Flame, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/util/supabase/server'

export default async function HomePage() {
  const supabase = await createClient();
  let { data: campaigns, error: campaignError } = await supabase
    .from('campaign')
    .select('status');
  
  const activeCampaigns = campaigns ? campaigns.filter(c => c.status !== 'completed').length : 0;
  //const totalCharacters = characters.length
  //const topSmashed = [...smashPassCharacters].sort((a, b) => b.smashCount - a.smashCount)[0]

  return (
    <div className="min-h-screen bg-background relative md:flex">
      <Navigation />

      <main className="mx-auto grow px-4 py-8 md:ml-[72px]">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance">
              Bem-vinde ao <span className="text-primary">RPGzão Malandro</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              O portal dos nerdolas.<br /> Anuncie e gerencie campanhas, gerencie personagens e se divirta.
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
                  <p className="text-2xl font-bold">{activeCampaigns}</p>
                  <p className="text-sm text-muted-foreground">Campanhas ativas</p>
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
                  <p className="text-sm text-muted-foreground">Seus personagens</p>
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
                  <p className="text-sm text-muted-foreground">Smash or pass</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Announcements Section */}
        <section>
          <div className="mb-6 flex items-center justify-center">
            <h2 className="text-2xl font-bold">Anúncios do RPGzão</h2>
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
      </main>
    </div>
  )
}
