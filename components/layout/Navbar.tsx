import * as React from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl text-primary">
              ReachNova
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/campaigns"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Campaigns
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Dashboard
            </Link>
          </nav>
        </div>
        
        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger className="mr-2 px-0 text-base md:hidden focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" className="inline-flex items-center whitespace-nowrap md:w-64 w-full justify-start text-muted-foreground">
              <Search className="mr-2 h-4 w-4" />
              Search campaigns...
            </Button>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="flex flex-col space-y-3">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold text-xl text-primary">ReachNova</span>
      </Link>
      <div className="flex flex-col space-y-2 mt-4">
        <Link href="/campaigns" className="text-muted-foreground hover:text-foreground">
          Campaigns
        </Link>
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
          Dashboard
        </Link>
      </div>
    </div>
  )
}
