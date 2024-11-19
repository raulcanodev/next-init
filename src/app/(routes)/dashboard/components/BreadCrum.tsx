'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import config from "@/config"

const routeLabels: { [key: string]: string } = {
  dashboard: 'Dashboard',
  admin: 'Admin',
  users: 'Users',
  settings: 'Settings',
  // Add more route labels as needed
}

export function BreadcrumbDemo() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">{config.appName}</BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1

          // If there are more than 3 segments, add a dropdown for the middle ones
          if (pathSegments.length > 3 && index > 0 && index < pathSegments.length - 1) {
            if (index === 1) {
              return (
                <BreadcrumbItem key={segment}>
                  <BreadcrumbSeparator />
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {pathSegments.slice(1, -1).map((dropdownSegment, dropdownIndex) => (
                        <DropdownMenuItem key={dropdownSegment}>
                          <Link href={`/${pathSegments.slice(0, dropdownIndex + 2).join('/')}`}>
                            {routeLabels[dropdownSegment] || dropdownSegment}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>
              )
            }
            return null
          }

          return (
            <BreadcrumbItem key={segment}>
              <BreadcrumbSeparator />
              {isLast ? (
                <BreadcrumbPage>{routeLabels[segment] || segment}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>{routeLabels[segment] || segment}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}