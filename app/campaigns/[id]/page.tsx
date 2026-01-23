'use client'

import { useState, use, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
    Crown, Users, ArrowLeft, Megaphone, FileText,
    UserPlus, Check, X, Plus, Link as LinkIcon, FileImage
} from 'lucide-react'
import Link from 'next/link'
import type { Campaign, CampaignAnnouncement, CampaignResource, User } from '@/lib/types'
import { createClient } from '@/util/supabase/client'
import Image from 'next/image'

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = createClient();
    const { id } = use(params)
    const [currentUser, setCurrentUser] = useState<User>();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [announcementDialogOpen, setAnnouncementDialogOpen] = useState(false);
    const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
    const [newResource, setNewResource] = useState({ name: '', url: '', type: 'link' as const });

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
                .select(`
                    id, title, description, image_url, 
                    gamemaster ( id, display_name ), 
                    game, player_limit, 
                    campaign_players ( userid ( id, display_name ) ), 
                    status, 
                    campaign_announcement ( id, created_at, title, content, campaignid ),
                    campaign_requests ( userid ( id, display_name ) ),
                    campaign_resource ( id, url, mime_type, title, description )`);

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
                    pendingRequests: row.campaign_requests.map(player => ({ id: (player.userid as any).id, name: (player.userid as any).display_name } as User)),
                    currentPlayers: row.campaign_players.map(player => ({ id: (player.userid as any).id, name: (player.userid as any).display_name } as User)),
                    status: row.status,
                    announcements: row.campaign_announcement.map(announcement => ({
                        id: announcement.id,
                        content: announcement.content,
                        title: announcement.title,
                        createdAt: announcement.created_at
                    } as CampaignAnnouncement)),
                    resources: row.campaign_resource.map(resource => ({
                        id: resource.id,
                        name: resource.title,
                        description: resource.description,
                        type: resource.mime_type,
                        url: resource.url
                    } as CampaignResource))
                } as Campaign;
            });

            setCampaigns(dbCampaigns || []);
            console.log(campaign);
        };

        fetchData();
    }, [supabase, setCampaigns]);

    const campaign = campaigns.find(c => c.id === id)

    if (!campaign) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <main className="mx-auto max-w-6xl px-4 py-8 md:ml-[72px]">
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-lg font-medium">Campaign not found</p>
                            <Button asChild className="mt-4">
                                <Link href="/campaigns">Back to Campaigns</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </main>
            </div>
        )
    }

    const isGM = campaign.gamemaster?.id == currentUser?.id;
    const isPlayer = campaign.currentPlayers?.some(player => player.id == currentUser?.id);

    console.log(campaign.gamemaster?.id);
    console.log(currentUser?.id);

    //   const handleAcceptRequest = (playerName: string) => {
    //     setCampaigns(campaigns.map(c => 
    //       c.id === id 
    //         ? { 
    //             ...c, 
    //             currentPlayers: [...c.currentPlayers, playerName],
    //             pendingRequests: c.pendingRequests.filter(p => p !== playerName)
    //           }
    //         : c
    //     ))
    //   }

    //   const handleRejectRequest = (playerName: string) => {
    //     setCampaigns(campaigns.map(c => 
    //       c.id === id 
    //         ? { ...c, pendingRequests: c.pendingRequests.filter(p => p !== playerName) }
    //         : c
    //     ))
    //   }

    //   const handleAddAnnouncement = () => {
    //     const announcement: CampaignAnnouncement = {
    //       id: `ca-${Date.now()}`,
    //       title: newAnnouncement.title,
    //       content: newAnnouncement.content,
    //       createdAt: new Date().toISOString()
    //     }

    //     setCampaigns(campaigns.map(c => 
    //       c.id === id 
    //         ? { ...c, announcements: [announcement, ...c.announcements] }
    //         : c
    //     ))

    //     setNewAnnouncement({ title: '', content: '' })
    //     setAnnouncementDialogOpen(false)
    //   }

    //   const handleAddResource = () => {
    //     const resource: CampaignResource = {
    //       id: `res-${Date.now()}`,
    //       name: newResource.name,
    //       url: newResource.url,
    //       type: newResource.type
    //     }

    //     setCampaigns(campaigns.map(c => 
    //       c.id === id 
    //         ? { ...c, resources: [...c.resources, resource] }
    //         : c
    //     ))

    //     setNewResource({ name: '', url: '', type: 'link' })
    //     setResourceDialogOpen(false)
    //   }

    const statusColors = {
        'active': 'bg-chart-3/20 text-chart-3 border-chart-3/30',
        'completed': 'bg-muted text-muted-foreground border-muted'
    }

    const statusLabels = {
        'active': 'Ativa',
        'completed': 'Completa'
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="mx-auto max-w-6xl px-4 py-8 md:ml-[72px]">
                {/* Back Button */}
                <Button asChild variant="ghost" className="mb-6">
                    <Link href="/campaigns">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Campaigns
                    </Link>
                </Button>

                {/* Campaign Header */}
                <div className="mb-8 overflow-hidden rounded-lg border border-border">
                    <div className="relative h-48 md:h-64">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(https://picsum.photos/seed/${campaign.id}/1200/400)` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </div>

                    <div className="relative -mt-16 px-6 pb-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <Badge className={`mb-2 ${statusColors[campaign.status ?? "completed"]}`}>
                                    {statusLabels[campaign.status ?? "completed"]}
                                </Badge>
                                <h1 className="text-3xl font-bold tracking-tight text-balance">{campaign.title}</h1>
                                <p className="text-muted-foreground">{campaign.game}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Crown className="h-4 w-4 text-primary" />
                                    <span>{campaign.gamemaster?.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="h-4 w-4" />
                                    <span>{campaign.currentPlayers?.length}/{campaign.player_limit} players</span>
                                </div>
                            </div>
                        </div>

                        <p className="mt-4 text-muted-foreground">{campaign.description}</p>
                    </div>
                </div>

                {/* Content Tabs */}
                <Tabs defaultValue="announcements" className="space-y-6">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="announcements" className="gap-2">
                            <Megaphone className="h-4 w-4" />
                            Announcements
                        </TabsTrigger>
                        <TabsTrigger value="resources" className="gap-2">
                            <FileText className="h-4 w-4" />
                            Resources
                        </TabsTrigger>
                        <TabsTrigger value="players" className="gap-2">
                            <Users className="h-4 w-4" />
                            Players
                            {isGM && (campaign.pendingRequests?.length ?? 0) > 0 && (
                                <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                                    {campaign.pendingRequests?.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="announcements">
                        <div className="space-y-4">
                            {isGM && (
                                <Button onClick={() => setAnnouncementDialogOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Post Announcement
                                </Button>
                            )}

                            {(campaign.announcements?.length ?? 0) > 0 ? (
                                campaign.announcements?.map((ann) => (
                                    <Card key={ann.id}>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg">{ann.title}</CardTitle>
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(ann.createdAt ?? "").toLocaleDateString()}
                                                </span>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{ann.content}</p>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center py-12">
                                        <Megaphone className="mb-4 h-12 w-12 text-muted-foreground" />
                                        <p className="text-muted-foreground">No announcements yet</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="resources">
                        <div className="space-y-4">
                            {isGM && (
                                <Button onClick={() => setResourceDialogOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Resource
                                </Button>
                            )}

                            {(campaign.resources?.length ?? 0) > 0 ? (
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {campaign.resources?.map((resource) => (
                                        <Card key={resource.id} className="cursor-pointer transition-colors hover:border-primary/50">
                                            <CardContent className="flex items-center gap-4 p-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                                                    {resource.type === 'link' ? (
                                                        <LinkIcon className="h-5 w-5 text-primary" />
                                                    ) : resource.type?.startsWith("image") ? (
                                                        <FileImage className="h-5 w-5 text-primary" />
                                                    ) : (
                                                        <FileText className="h-5 w-5 text-primary" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium truncate">{resource.name}</p>
                                                    <p className="text-sm text-muted-foreground uppercase">{resource.type}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center py-12">
                                        <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                                        <p className="text-muted-foreground">No resources yet</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="players">
                        <div className="space-y-6">
                            {/* Pending Requests (GM only) */}
                            {isGM && (campaign.pendingRequests?.length ?? 0) > 0 && (
                                <div>
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                                        <UserPlus className="h-5 w-5 text-primary" />
                                        Pending Requests
                                    </h3>
                                    <div className="space-y-2">
                                        {campaign.pendingRequests?.map((player) => (
                                            <Card key={player.id}>
                                                <CardContent className="flex items-center justify-between p-4">
                                                    <div className="flex items-center gap-3">
                                                        <Image className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20" src={player.avatar ?? "https://placehold.co/400/png"} alt={player.name ?? ""} width={20} height={20} />
                                                        <span className="font-medium">{player.name}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" onClick={() => /* handleAcceptRequest(player) */ null}>
                                                            <Check className="mr-1 h-4 w-4" />
                                                            Accept
                                                        </Button>
                                                        <Button size="sm" variant="outline" onClick={() => /* handleRejectRequest(player) */ null}>
                                                            <X className="mr-1 h-4 w-4" />
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Current Players */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">Current Players</h3>
                                {(campaign.currentPlayers?.length ?? 0) > 0 ? (
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {campaign.currentPlayers?.map((player) => (
                                            <Card key={player.id}>
                                                <CardContent className="flex items-center gap-3 p-4">
                                                    <Image className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20" src={player.avatar ?? "https://placehold.co/400/png"} alt={player.name ?? ""} width={20} height={20} />
                                                    <span className="font-medium">{player.name}</span>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Card>
                                        <CardContent className="flex flex-col items-center justify-center py-12">
                                            <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                                            <p className="text-muted-foreground">No players yet</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            {/* Add Announcement Dialog */}
            <Dialog open={announcementDialogOpen} onOpenChange={setAnnouncementDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Post Announcement</DialogTitle>
                        <DialogDescription>Share updates with your players</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="ann-title">Title</Label>
                            <Input
                                id="ann-title"
                                value={newAnnouncement.title}
                                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                placeholder="Announcement title"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ann-content">Content</Label>
                            <Textarea
                                id="ann-content"
                                value={newAnnouncement.content}
                                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                                placeholder="What would you like to share?"
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAnnouncementDialogOpen(false)}>Cancel</Button>
                        <Button onClick={/* handleAddAnnouncement */ () => null} disabled={!newAnnouncement.title || !newAnnouncement.content}>
                            Post
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Resource Dialog */}
            <Dialog open={resourceDialogOpen} onOpenChange={setResourceDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Resource</DialogTitle>
                        <DialogDescription>Share helpful materials with your players</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="res-name">Resource Name</Label>
                            <Input
                                id="res-name"
                                value={newResource.name}
                                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                                placeholder="e.g., Character Sheet Template"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="res-url">URL</Label>
                            <Input
                                id="res-url"
                                value={newResource.url}
                                onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setResourceDialogOpen(false)}>Cancel</Button>
                        <Button onClick={/* handleAddResource */ () => null} disabled={!newResource.name || !newResource.url}>
                            Add Resource
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}