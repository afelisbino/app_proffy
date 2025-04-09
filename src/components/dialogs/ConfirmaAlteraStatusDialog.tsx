'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import {
    alterarStatusUsuario,
    AlterarStatusUsuarioProps,
} from '@/api/escola'
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface AlteracaoStatusUsuarioDialogProps {
  idUsuario: string
  statusUsuario: boolean
}

export function ConfirmaAlteracaoStatusUsuarioDialog({
  idUsuario,
  statusUsuario,
}: AlteracaoStatusUsuarioDialogProps) {
  const queryClient = useQueryClient()
  const { mutateAsync: mudarStatusUsuario, isPending } = useMutation({
    mutationFn: ({ id, status }: AlterarStatusUsuarioProps) =>
      alterarStatusUsuario({ id, status }),
    onError: () => {
      toast.error(
        `Houve um problema ao ${statusUsuario ? 'desativar' : 'ativar'} o usuário, tente novamente!`,
      )
    },
    onSuccess: (data) => {
      const listaUsuarios:
        | Array<{
            id: string
            nome: string
            email: string
            status: boolean
          }>
        | undefined = queryClient.getQueryData(['usuariosEscola'])

      queryClient.setQueryData(
        ['usuariosEscola'],
        listaUsuarios?.map((usuario) => {
          if (usuario.id === data.id) {
            return {
              id: usuario.id,
              nome: usuario.nome,
              email: usuario.email,
              status: data.status,
            }
          }
          return usuario
        }),
      )
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirma esta ação?</AlertDialogTitle>
        <AlertDialogDescription>
          {`Deseja realmente ${statusUsuario ? 'desativar' : 'ativar'} este usuário?`}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-app-red-300 text-app-red-700 hover:bg-app-red-400 shadow">
          Cancelar
        </AlertDialogCancel>
        {isPending ? (
          <Button
            className="bg-app-green-300 text-app-green-700 hover:bg-app-green-400 shadow "
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Alterando...
          </Button>
        ) : (
          <AlertDialogAction
            onClick={async () => {
              await mudarStatusUsuario({
                id: idUsuario,
                status: statusUsuario !== true,
              })
            }}
            className="bg-app-green-300 text-app-green-700 hover:bg-app-green-400 shadow "
          >
            {statusUsuario ? 'Desativar' : 'Ativar'}
          </AlertDialogAction>
        )}
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
