'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface BotaoVoltarProps {
  descricao: string
}

export function BotaoVoltar({ descricao }: BotaoVoltarProps) {
  const router = useRouter()

  return (
    <div className="rounded-md border shadow flex-1 p-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'link'}
            size={'icon'}
            onClick={() => {
              router.back()
            }}
          >
            <ArrowLeft className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{descricao}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
