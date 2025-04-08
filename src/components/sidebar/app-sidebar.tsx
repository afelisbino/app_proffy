"use client";

import {
	Sidebar,
	SidebarContent, SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import type React from "react";
import { SidebarUserMenu } from "./app-sidebar-user";
import { useQuery } from "@tanstack/react-query";
import { buscarDadosUsuario } from "@/app/components/autenticacao/api/auth";
import Image from "next/image";
import { AppSidebarNavAdmin } from "./app-sidebar-nav-admin";
import { AppSidebarNavTeacher } from "./app-sidebar-nav-teacher";

export function AppSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {

	const dadosUsuario = useQuery({
		queryKey: ['dadosUsuarioSessao'],
		queryFn: buscarDadosUsuario,
		refetchOnWindowFocus: true,
		initialData: {
			nome: '',
			email: '',
			perfil: 'PROFESSOR'
		},
	})

	return (
		<Sidebar {...props}>
			<SidebarHeader className="flex items-center justify-between ">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="bg-white dark:bg-sidebar" size="lg" asChild>
							<a className="flex flex-row justify-between px-4" href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
									<Image
										alt="proffy"
										src="/proffy-app-logo.png"
										width={80}
										height={80}
										className="rounded-lg"
									/>
								</div>
								<div className="flex flex-col justify-center items-end leading-none">
									<span className="font-semibold text-base">Proffy</span>
									<span className="text-xs text-muted-foreground dark:text-white/65">v1.0.1</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{dadosUsuario.data.perfil === 'ADMIN' ? <AppSidebarNavAdmin/> : <AppSidebarNavTeacher/>}
			</SidebarContent>
			<SidebarFooter>
				<SidebarUserMenu nome={dadosUsuario.data.nome} email={dadosUsuario.data.email} carregando={dadosUsuario.isFetching} />
			</SidebarFooter>
		</Sidebar>
	);
}
