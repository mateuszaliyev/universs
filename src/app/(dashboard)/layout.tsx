import type { Metadata } from "next";

import { DatabaseProvider } from "@/components/database/provider";
import { BookmarkIcon } from "@/components/icons/bookmark";
import { NewspaperIcon } from "@/components/icons/newspaper";
import { PanelIcon } from "@/components/icons/panel";
import { PlusIcon } from "@/components/icons/plus";
import { StarIcon } from "@/components/icons/star";
import { UniverssIcon } from "@/components/icons/universs";
import { Link } from "@/components/link";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/sidebar";
import {
  Sidebar,
  SidebarFeeds,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarUser,
} from "@/components/sidebar/client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";

import { paths } from "@/utilities/url";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardLayout = ({ children }: { children?: React.ReactNode }) => (
  <DatabaseProvider>
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link href={paths.dashboard()}>
                  <UniverssIcon className="!size-8 transition-all group-data-[collapsible=icon]:-ml-1 group-data-[collapsible=icon]:!size-6" />
                  <span className="font-display truncate text-lg font-medium">
                    universs
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Today">
                  <Link href={paths.dashboard()}>
                    <NewspaperIcon />
                    <span>All</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Read Later">
                  <Link href={paths.readLater()}>
                    <BookmarkIcon />
                    <span>Read Later</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Favorites">
                  <Link href={paths.favorites()}>
                    <StarIcon />
                    <span>Favorites</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between">
              Feeds
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarGroupAction asChild>
                    <Link href={paths.feeds.add()}>
                      <PlusIcon className="size-4" />
                      <span className="sr-only">Add feed</span>
                    </Link>
                  </SidebarGroupAction>
                </TooltipTrigger>
                <TooltipContent>Add feed</TooltipContent>
              </Tooltip>
            </SidebarGroupLabel>
            <SidebarFeeds />
          </SidebarGroup>
        </SidebarContent>
        <SidebarUser />
        <SidebarRail />
      </Sidebar>
      <div className="fixed top-2 left-2 z-(--z-popover) flex size-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 md:hidden dark:border-gray-800 dark:bg-gray-900">
        <SidebarTrigger className="flex aspect-square h-full items-center justify-center">
          <PanelIcon className="size-4 -rotate-90" />
        </SidebarTrigger>
      </div>
      {children}
    </SidebarProvider>
  </DatabaseProvider>
);

export default DashboardLayout;
