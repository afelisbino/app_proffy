"use client"

import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar"

export function SiteHeader() {
	const { toggleSidebar } = useSidebar()

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 fixed w-full backdrop-blur-sm bg-background/30 rounded-lg">
			<div className="flex items-center gap-2 px-4">
				<Button 
					variant="secondary"
					size="icon"
          className="rounded-lg bg-sidebar text-sidebar-foreground hover:bg-accent shadow"
					onClick={toggleSidebar}
				>
					<Menu className="size-6"/>
				</Button>
				<Separator orientation="vertical" className="mr-2 h-4" />
			</div>
		</header>
	);
}
