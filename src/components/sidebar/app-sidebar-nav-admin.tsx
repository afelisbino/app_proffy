import { permissoesAdmin } from "@/hooks/use-permissao";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { ChevronRight } from "lucide-react";

export function AppSidebarNavAdmin() {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Escola</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {
              permissoesAdmin.menu?.map(({ titulo, href, icon: Icon }) => (
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
      {permissoesAdmin.grupo?.map((grupo) => (
        <Collapsible
          key={grupo.titulo}
          title={grupo.titulo}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger>
                {grupo.titulo}{" "}
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {grupo.itens.map(({ titulo, href, icon: Icon }) => (
                    <SidebarMenuItem key={titulo}>
                      <SidebarMenuButton asChild>
                        <a href={href}>
                          {Icon && <Icon className="size-4" />}
                          {titulo}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}

    </>
  )
}