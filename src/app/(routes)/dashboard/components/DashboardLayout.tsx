'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Settings, LogOut, Menu, ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Button,
  Separator,
} from '@/components/ui';
import config from '@/config';
import { VisuallyHidden } from '@react-aria/visually-hidden';

const menuItems = [
  { name: 'Demo', icon: FileText, href: '/dashboard/demo' },
  { name: 'Admin', icon: FileText, href: '/dashboard/admin' },
];

const settingsItems = [
  { name: 'Profile', href: '/dashboard/settings/profile' },
  // { name: "General", href: "/dashboard/settings/general" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();

  function handleResize() {
      setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  const Sidebar = () => (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-16 items-center px-4 font-bold">
        <Link href="/dashboard">{config.appName}</Link>
      </div>
      <div className="flex-1 overflow-auto">
        <nav className="grid gap-2 px-2">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
          <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isSettingsOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-2">
              {settingsItems.map((item) => (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
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
  );

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden w-40 border-r bg-background lg:block">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <VisuallyHidden>
              <SheetTitle>Menu</SheetTitle>
            </VisuallyHidden>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="font-bold">{config.appName}</div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
