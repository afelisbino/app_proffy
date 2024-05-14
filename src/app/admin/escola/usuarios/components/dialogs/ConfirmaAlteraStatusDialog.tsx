/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface AlteracaoStatusUsuarioDialogProps {
  idUsuario: string
  statusUsuario: boolean
}

export function ConfirmaAlteracaoStatusUsuarioDialog({
  idUsuario,
  statusUsuario,
}: AlteracaoStatusUsuarioDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirma esta ação?</AlertDialogTitle>
        <AlertDialogDescription>
          {`Deseja realmente ${statusUsuario ? 'desativar' : 'ativar'} este usuário?`}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-red-200 text-red-700 hover:bg-red-300 shadow border-0">
          Cancelar
        </AlertDialogCancel>
        <AlertDialogAction className="bg-emerald-200 text-emerald-700 hover:bg-emerald-300 shadow ">
          Confirmar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
