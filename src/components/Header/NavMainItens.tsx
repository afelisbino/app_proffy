import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useId } from 'react'

export interface itensNav {
  refRouter: string
  titleItem: string
}

export function NavMainIten({
  refRouter,
  titleItem,
  className,
}: itensNav & React.HTMLAttributes<HTMLElement>) {
  const id = useId()

  return (
    <Link
      href={refRouter}
      key={id}
      className={cn(
        'text-sm font-medium transition ease-linear delay-100 hover:bg-secondary p-2 rounded duration-75 ...',
        className,
      )}
    >
      {titleItem}
    </Link>
  )
}
