"use client"

import { ThemeToggle } from "./theme-toggle"

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">Multi-Step Form</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">{children}</main>
      <footer className="border-t">
        <div className="container flex h-14 items-center">
          <p className="text-sm text-muted-foreground">
            Built with Next.js, Tailwind CSS, and ShadCN UI
          </p>
        </div>
      </footer>
    </div>
  )
}
