"use client";

import { BadgeCheck, Bell, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";

import { useAuthSession } from "../../AuthUserSessionProvider";
import DashboardLogoutButton from "./DashboardLogoutButton";

export function DashboardSidebarUserMenu() {
  const { isMobile } = useSidebar();
  const { user } = useAuthSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <span className="w-8 h-8 bg-muted flex shrink-0 size-full items-center justify-center rounded-full">
          {user.username.charAt(0).toUpperCase()}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <div className="h-8 w-8 bg-muted rounded-lg flex items-center justify-center">
              B
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.username}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DashboardLogoutButton>
          <DropdownMenuItem className="w-full">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DashboardLogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
