'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  FormularioEdicaoUsuarioType,
  schemaFormularioEdicaoUsuario,
} from '@/schemas/SchemaUsuariosEscola'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { alterarSenhaUsuario } from '@/api/auth'
import { toast } from 'sonner'
import { UsuarioType } from '@/api/auth'

interface FormularioNovoUsuarioProps {
  dadosUsuario: UsuarioType
}

export function EditarUsuarioForm({
  dadosUsuario,
}: FormularioNovoUsuarioProps) {
  const formEditSenhaUsuario = useForm<FormularioEdicaoUsuarioType>({
    resolver: zodResolver(schemaFormularioEdicaoUsuario),
    defaultValues: {
      id: dadosUsuario.id,
    },
    mode: 'onChange',
  })

  async function salvarDadosSenhaUsuario({ id, novaSenha, confirmaSenha }: FormularioEdicaoUsuarioType) {
    if (novaSenha !== confirmaSenha) {
      formEditSenhaUsuario.setError('confirmaSenha', {
        type: 'manual',
        message: 'As senhas não conferem',
      })
      return
    }

    const response = await alterarSenhaUsuario({
      id,
      novaSenha,
      confirmaSenha
    })

    if (!response.status) {
      toast.error(response.msg)
    }
    if (response.status) {
      toast.success('Senha alterada com sucesso!')
    }
    formEditSenhaUsuario.reset()
  }

  return (
    <Form {...formEditSenhaUsuario}>
      <form
        className="space-y-4"
        onSubmit={formEditSenhaUsuario.handleSubmit(salvarDadosSenhaUsuario)}
      >
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={formEditSenhaUsuario.control}
            name="novaSenha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formEditSenhaUsuario.control}
            name="confirmaSenha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme a senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="flex flex-col md:flex-row gap-2 md:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'destructive'}
              onClick={() => formEditSenhaUsuario.reset()}
              className="shadow-md text-sm leading-none rounded"
            >
              Cancelar
            </Button>
          </DialogClose>
          {formEditSenhaUsuario.formState.isSubmitting ? (
            <Button
              className="shadow-md text-sm leading-none rounded bg-app-green-500 hover:bg-app-green-600"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              className="shadow-md text-sm leading-none rounded bg-app-green-500 hover:bg-app-green-600"
              type="submit"
            >
              Salvar
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}
