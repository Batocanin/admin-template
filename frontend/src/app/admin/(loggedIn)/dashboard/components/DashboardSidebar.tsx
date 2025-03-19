"use client";

import {
  BookOpen,
  Bot,
  LayoutDashboard,
  LogOut,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { DashboardSidebarMenuItems } from "./DashboardSidebarMenuItems";
import { DashboardSidebarLogo } from "./DashboardSidebarLogo";
import { Button } from "@/components/ui/button";
import DashboardLogoutButton from "./DashboardLogoutButton";

// This is sample data.
const data = {
  dashboard: {
    title: "",
    menuItems: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
    ],
  },
  navMain: {
    title: "Projects",
    menuItems: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: false,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        isActive: false,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        isActive: false,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        isActive: false,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
  },
};
export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <DashboardSidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <DashboardSidebarMenuItems
          title={data.dashboard.title}
          items={data.dashboard.menuItems}
        />
        <DashboardSidebarMenuItems
          title={data.navMain.title}
          items={data.navMain.menuItems}
        />
      </SidebarContent>
      <SidebarFooter>
        <DashboardLogoutButton>
          <Button variant="outline" className="w-full">
            <LogOut />
            {open && "Log out"}
          </Button>
        </DashboardLogoutButton>
      </SidebarFooter>
    </Sidebar>
  );
}
