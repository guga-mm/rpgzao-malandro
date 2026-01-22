'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/util/style-util'
import { Swords, ScrollText, Users, Flame, Home, Menu, X, Hash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/campaigns', label: 'Campanhas', icon: ScrollText },
  { href: '/characters', label: 'Personagens', icon: Users },
  { href: '/smash-or-pass', label: 'Smash or Pass', icon: Flame },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[72px] flex-col items-center border-r border-border bg-sidebar py-3 md:flex">
        {/* Logo */}
        <Link
          href="/"
          className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-all hover:rounded-xl"
        >
          <Swords className="h-6 w-6" />
        </Link>

        <div className="mx-auto my-2 h-[2px] w-8 rounded-full bg-border" />

        {/* Nav Items */}
        <nav className="flex flex-1 flex-col items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'group relative flex h-12 w-12 items-center justify-center rounded-3xl transition-all hover:rounded-xl',
                      isActive
                        ? 'rounded-xl bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground'
                    )}
                  >
                    {isActive && (
                      <span className="absolute -left-3 h-10 w-1 rounded-r-full bg-foreground" />
                    )}
                    <Icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-semibold">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>

        {/* User Avatar */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex h-12 w-12 items-center justify-center rounded-3xl bg-accent text-accent-foreground transition-all hover:rounded-xl">
              <span className="text-sm font-bold">A</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-semibold">
            Alex
          </TooltipContent>
        </Tooltip>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Swords className="h-4 w-4" />
          </div>
        </Link>

      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <nav className={cn(
        'fixed left-0 top-14 z-50 h-[calc(100vh-56px)] w-64 transform border-r border-border bg-sidebar p-4 transition-transform duration-200 md:hidden',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
          <Hash className="h-4 w-4" />
          Navegação
        </div>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}

        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-md bg-secondary p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <span className="text-xs font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">Alex</p>
            <p className="truncate text-xs text-muted-foreground">Online</p>
          </div>
          <div className="h-2 w-2 rounded-full bg-accent" />
        </div>
      </nav>
    </TooltipProvider>
  )
}
