'use client'

import { ChevronDown, ChevronUp, ChevronsUpDown, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { IUserAdminDashboardProps } from "@/types/user"

interface ColumnHeaderProps {
  title: string
  field: keyof IUserAdminDashboardProps
  sortDirection: 'asc' | 'desc' | null
  onSort: (field: keyof IUserAdminDashboardProps, direction: 'asc' | 'desc') => void
  onHide: (field: keyof IUserAdminDashboardProps) => void
  className?: string
}

export function Combobox({
  title,
  field,
  sortDirection,
  onSort,
  onHide,
  className,
}: ColumnHeaderProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {sortDirection === 'asc' && <ChevronUp className="ml-2 h-4 w-4" />}
            {sortDirection === 'desc' && <ChevronDown className="ml-2 h-4 w-4" />}
            {sortDirection === null && <ChevronsUpDown className="ml-2 h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onSort(field, 'asc')}>
            <ChevronUp className="mr-2 h-3.5 w-3.5" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSort(field, 'desc')}>
            <ChevronDown className="mr-2 h-3.5 w-3.5" />
            Desc
          </DropdownMenuItem>
          <hr className="my-2 border-t border-muted-foreground/20" />
          <DropdownMenuItem onClick={() => onHide(field)}>
            <EyeOff className="mr-2 h-3.5 w-3.5" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}