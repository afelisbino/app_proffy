import { cn } from "@/lib/utils";
import { NavMainIten, itensNav } from "./NavMainItens";
import { PropsWithChildren } from "react";

export function NavMain({
    listaItensMenu,
    className,
    ...props
}: PropsWithChildren<{ listaItensMenu: Array<itensNav>; className: string; }>) {
    return (
        <nav className={cn("flex items-center space-x-6 lg:space-x-6", className)} {...props} >
            {listaItensMenu.map((itemNav) => {
                return (
                    <NavMainIten
                        refRouter={itemNav.refRouter}
                        titleItem={itemNav.titleItem}
                        className={"hover:text-primary"}
                    />
                )
            })}
        </nav>
    )
}