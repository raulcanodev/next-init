"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Settings, LogOut, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, Separator, Button } from "@/components/ui"
import config from "@/config"


const menuItems = [
  { name: "Page 1", icon: FileText, href: "/dashboard/page1" },
  { name: "Page 2", icon: FileText, href: "/dashboard/page2" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const Sidebar = () => (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-16 items-center px-4 font-bold">
        <Link href="/dashboard">{config.appName}</Link>
      </div>
      <div className="flex-1 overflow-auto">
        <nav className="grid gap-2 px-2">
          {menuItems.map((item) => (
            <Button key={item.name} variant="ghost" className="w-full justify-start" asChild>
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <Separator />
      <div className="p-2">
        <Button variant="ghost" className="w-full justify-start text-secondary-foreground" asChild>
          <Link href="/auth/signout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r bg-background lg:block">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="font-bold">{config.appName}</div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}