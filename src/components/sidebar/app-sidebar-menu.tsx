import type { MenuSidebar } from "@/hooks/use-permissao";
import Link from "next/link";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

interface MenuSideBarProps {
	menuSideBar?: Array<MenuSidebar>;
}

export function AppSidebarMenu({ menuSideBar }: MenuSideBarProps) {
	return (
		<SidebarMenu>
			<TooltipProvider>
				{menuSideBar?.map(({ titulo, icon: Icon, href }) => (
					<SidebarMenuItem key={titulo}>
						<Tooltip>
							<TooltipTrigger asChild>
								<SidebarMenuButton asChild>
									<Link href={href}>
										{Icon && <Icon />}
										<span className="text-base font-medium">{titulo}</span>
									</Link>
								</SidebarMenuButton>
							</TooltipTrigger>
							<TooltipContent side="right">
								<span>{titulo}</span>
							</TooltipContent>
						</Tooltip>
					</SidebarMenuItem>
				))}
			</TooltipProvider>
		</SidebarMenu>
	);
}
