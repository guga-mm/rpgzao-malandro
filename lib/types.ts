export interface Announcement {
  id?: string
  title?: string
  content?: string
  author?: string
  createdAt?: string
  isPinned?: boolean
}

export interface Campaign {
  id?: string
  title?: string
  description?: string
  image_url?: string
  gamemaster?: User
  game?: string
  player_limit?: number
  currentPlayers?: User[]
  pendingRequests?: User[]
  announcements?: CampaignAnnouncement[]
  resources?: CampaignResource[]
  status?: 'active' | 'completed'
  created_at?: string
}

export interface CampaignAnnouncement {
  id?: string
  title?: string
  content?: string
  createdAt?: string
}

export interface CampaignResource {
  id?: string
  name?: string
  description?: string
  type?: string
  url?: string
}

export interface Character {
  id?: string
  name?: string
  gameSystem?: string
  class?: string
  level?: number
  imageUrl?: string
  owner?: string
  stats?: CharacterStat[]
  createdAt?: string
}

export interface CharacterStat {
  name?: string
  current?: number
  max?: number
  color?: string
}

export interface SmashPassCharacter {
  id?: string
  name?: string
  imageUrl?: string
  source?: string
  smashCount?: number
  passCount?: number
  submittedBy?: string
  approved?: boolean
}

export interface User {
  id?: string
  name?: string
  avatar?: string
}
