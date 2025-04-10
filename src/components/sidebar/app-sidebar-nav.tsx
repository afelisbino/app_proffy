import { PermissoesUsuarioType } from "@/hooks/use-permissao";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function AppSidebarNav({ permissoes }: PermissoesUsuarioType) {
  return (
    <TooltipProvider>
      {permissoes?.map(({ itens, titulo }) => (
        <SidebarGroup key={titulo}>
          <SidebarGroupLabel>{titulo}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                itens?.map(({ titulo, href, icon: Icon }) => (
                  <Tooltip key={`menu-${titulo}`}>
                    <TooltipTrigger asChild>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href={href}>
                            {Icon && <Icon className="size-4" />}
                            {titulo}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </TooltipTrigger>
                    <TooltipContent align="start" side="right">
                      <span>{titulo}</span>
                    </TooltipContent>
                  </Tooltip>

                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </TooltipProvider>

  )
}