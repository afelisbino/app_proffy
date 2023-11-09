import { cn } from "@/lib/utils"
import Link from "next/link"
import { useId } from "react"

export interface itensNav {
    refRouter: string
    titleItem: string
}

export function NavMainIten({ refRouter, titleItem, className }: itensNav & React.HTMLAttributes<HTMLElement>) {
    const id = useId();

    return (
        <Link

            href={refRouter}
            key={id}
            className={cn("text-sm font-medium transition-colors", className)}
        >
            {titleItem}
        </Link>
    )
}