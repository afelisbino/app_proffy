import { PermissoesUsuarioType } from "@/hooks/use-permissao";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";


export function AppSidebarNav({ permissoes }: PermissoesUsuarioType) {
  return (
    permissoes?.map(({ itens, titulo }) => (
      <SidebarGroup>
        <SidebarGroupLabel>{titulo}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {
              itens?.map(({ titulo, href, icon: Icon }) => (
                <SidebarMenuItem key={titulo}>
                  <SidebarMenuButton asChild>
                    <a href={href}>
                      {Icon && <Icon className="size-4" />}
                      {titulo}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            }
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ))
  )
}