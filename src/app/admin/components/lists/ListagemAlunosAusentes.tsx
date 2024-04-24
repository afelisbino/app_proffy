import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function ListagemAlunosAusentes() {
  return (
    <div className="space-y-2">
      <div className="flex items-center hover:bg-muted/50 p-5">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">Turma teste</p>
        </div>
        <div className="ml-auto font-medium">15</div>
      </div>
      <div className="flex items-center hover:bg-muted/50 p-5">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">Turma teste</p>
        </div>
        <div className="ml-auto font-medium">11</div>
      </div>
      <div className="flex items-center hover:bg-muted/50 p-5">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">Turma x</p>
        </div>
        <div className="ml-auto font-medium">9</div>
      </div>
    </div>
  )
}
