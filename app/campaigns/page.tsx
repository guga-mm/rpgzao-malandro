'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { CampaignCard } from '@/components/campaign-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Plus, ScrollText } from 'lucide-react'
import type { Campaign, User } from '@/lib/types'
import { CreateCampaignDialog } from '@/components/create-campaign-dialog'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Loading from './loading';
import { createClient } from '@/util/supabase/client'

type FilterStatus = 'all' | 'recruiting' | 'in-progress' | 'completed'

export default function CampaignsPage() {
    const supabase = createClient();
    const searchParams = useSearchParams()
    const [currentUser, setCurrentUser] = useState<User>();
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<FilterStatus>('all')
    const [createDialogOpen, setCreateDialogOpen] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            let { data: user, error: userError } = await supabase
                .from('users')
                .select("*")
                .eq("id", (await supabase.auth.getSession()).data.session?.user.id)
                .limit(1);

            if (userError) throw userError;
            if (user != null) setCurrentUser({
                id: user[0].id,
                name: user[0].display_name,
                avatar: user[0].avatar_url
            } as User)

            let { data: campaign, error: campaignError } = await supabase
                .from('campaign')
                .select('id, title, description, image_url, gamemaster (id, display_name), game, player_limit, campaign_players ( userid ), status');

            if (campaignError) throw campaignError;

            const dbCampaigns = campaign?.map(row => {
                return {
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    image_url: row.image_url,
                    gamemaster: {
                        id: (row.gamemaster as any).id,
                        name: (row.gamemaster as any).display_name,
                    } as User,
                    game: row.game,
                    player_limit: row.player_limit as number,
                    currentPlayers: row.campaign_players.map(player => ({ id: player.userid } as User)),
                    status: row.status,
                } as Campaign;
            });

            setCampaigns(dbCampaigns || []);
            console.log(campaign);
        };

        fetchData();
    }, [supabase, setCampaigns]);

    const handleCreateCampaign = async (newCampaign: Omit<Campaign, 'id' | 'createdAt' | 'gamemaster' | 'currentPlayers' | 'pendingRequests' | 'announcements' | 'resources'>) => {
        const campaign: Campaign = {
            ...newCampaign,
            currentPlayers: [],
            pendingRequests: [],
            announcements: [],
            resources: []
        };

        const { data, error } = await supabase
            .from('campaign')
            .insert([
                {
                    ...newCampaign,
                    gamemaster: (await supabase.auth.getSession()).data.session?.user?.id
                },
            ])
            .select("id, created_at");

        if (error) throw error;

        if (data) {
            campaign.created_at = data[0].created_at;
            campaign.id = data[0].id;
            setCampaigns([campaign, ...campaigns]);
            setCreateDialogOpen(false);
        }
    }

    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch = campaign.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.game?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.gamemaster?.name?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const filterButtons: { value: FilterStatus; label: string }[] = [
        { value: 'all', label: 'All' },
        { value: 'recruiting', label: 'Recruiting' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' }
    ]

    return (
        <div className="min-h-screen bg-background">
            <Suspense fallback={<Loading />}>
                <Navigation />
            </Suspense>

            <main className="mx-auto max-w-6xl px-4 py-8 md:ml-[72px]">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Campaign Board</h1>
                        <p className="text-muted-foreground">Find your next adventure or start one of your own</p>
                    </div>
                    <Button onClick={() => setCreateDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Campaign
                    </Button>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1 sm:max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {filterButtons.map((filter) => (
                            <Badge
                                key={filter.value}
                                variant={statusFilter === filter.value ? 'default' : 'outline'}
                                className="cursor-pointer px-3 py-1 text-sm"
                                onClick={() => setStatusFilter(filter.value)}
                            >
                                {filter.label}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Campaign Grid */}
                {filteredCampaigns.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCampaigns.map((campaign) => (
                            <CampaignCard
                                key={campaign.id}
                                campaign={campaign}
                                onJoinRequest={() => { }}
                                currentUser={currentUser}
                            />
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <ScrollText className="mb-4 h-12 w-12 text-muted-foreground" />
                            <p className="text-lg font-medium">No campaigns found</p>
                            <p className="text-sm text-muted-foreground">Try adjusting your filters or create a new campaign</p>
                        </CardContent>
                    </Card>
                )}
            </main>

            <CreateCampaignDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                onSubmit={handleCreateCampaign}
            />
        </div>
    )
}
