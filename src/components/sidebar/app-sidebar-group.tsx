"use client";

import type { GrupoItensSidebarProps } from "@/hooks/use-permissao";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
} from "../ui/sidebar";

export function SidebarGrupo({ titulo, itens, icon: Icon }: GrupoItensSidebarProps) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel className="capitalize text-sm">{titulo}</SidebarGroupLabel>
			<SidebarMenu>
				<Collapsible
					key={`${titulo}-group`}
					asChild
					className="group/collapsible"
				>
					<SidebarMenuItem key={`${titulo}-item`}>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton tooltip={titulo}>
								{Icon && <Icon />}
								<span className="text-base font-medium">{titulo}</span>
								<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
							</SidebarMenuButton>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<SidebarMenuSub>
								{itens.map((item) => (
									<SidebarMenuButton key={item.titulo} asChild>
										<Link href={item.href}>{item.titulo}</Link>
									</SidebarMenuButton>
								))}
							</SidebarMenuSub>
						</CollapsibleContent>
					</SidebarMenuItem>
				</Collapsible>
			</SidebarMenu>
		</SidebarGroup>
	);
}
