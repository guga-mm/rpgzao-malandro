export interface Announcement {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  isPinned: boolean
}

export interface Campaign {
  id: string
  title: string
  description: string
  imageUrl: string
  gameMaster: string
  gameSystem: string
  maxPlayers: number
  currentPlayers: string[]
  pendingRequests: string[]
  announcements: CampaignAnnouncement[]
  resources: CampaignResource[]
  status: 'recruiting' | 'in-progress' | 'completed'
  createdAt: string
}

export interface CampaignAnnouncement {
  id: string
  title: string
  content: string
  createdAt: string
}

export interface CampaignResource {
  id: string
  name: string
  type: 'pdf' | 'image' | 'link' | 'document'
  url: string
}

export interface Character {
  id: string
  name: string
  gameSystem: string
  class: string
  level: number
  imageUrl: string
  owner: string
  stats: CharacterStat[]
  createdAt: string
}

export interface CharacterStat {
  name: string
  current: number
  max: number
  color: string
}

export interface SmashPassCharacter {
  id: string
  name: string
  imageUrl: string
  source: string
  smashCount: number
  passCount: number
  submittedBy: string
  approved: boolean
}

export interface User {
  id: string
  name: string
  avatar: string
  role: 'member' | 'moderator' | 'admin'
}
