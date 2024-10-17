'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, ChevronLeft, Loader2, Save } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  atualizarDadosMatricula,
  ResponseDadosAluno,
} from '@/app/admin/api/matricula'
import { schemaFormularioEdicaoMatriculaAluno } from '@/app/admin/schemas/SchemaAlunosTurma'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface FormularioEdicaoMatriculaAlunoProps {
  idAluno: string
  nomeAluno: string
  cpfAluno: string
  rgAluno: string
  raAluno: string
  dataNascimento: Date
}

export type FormEdicaoMatriculaType = z.infer<
  typeof schemaFormularioEdicaoMatriculaAluno
>

export function FormularioEdicaoMatriculaAluno({
  idAluno,
  nomeAluno,
  cpfAluno,
  rgAluno,
  raAluno,
  dataNascimento,
}: FormularioEdicaoMatriculaAlunoProps) {
  const queryClient = useQueryClient()
  const formMatriculaAluno = useForm<FormEdicaoMatriculaType>({
    resolver: zodResolver(schemaFormularioEdicaoMatriculaAluno),
    defaultValues: {
      idAluno,
      nome: nomeAluno,
      cpf: cpfAluno,
      rg: rgAluno,
      ra: raAluno,
      dataNascimento,
    },
    mode: 'onChange',
  })

  const { mutateAsync: salvarModificacoesMatricula } = useMutation({
    mutationFn: atualizarDadosMatricula,
    onError: (errr) => {
      toast.error('Houve um problema ao salvar modificação da matrícula', {
        description: errr.message,
      })
    },
    onSuccess: (data) => {
      if (data.status) {
        const dadosMatriculaAluno: ResponseDadosAluno | undefined =
          queryClient.getQueryData(['matriculaAluno', idAluno])

        queryClient.setQueryData(['matriculaAluno', idAluno], {
          ...dadosMatriculaAluno,
          dados: {
            ...dadosMatriculaAluno?.dados,
            nome: data.dados?.nome,
            cpf: data.dados?.cpf,
            rg: data.dados?.rg,
            ra: data.dados?.ra,
            dataNascimento: data.dados?.dataNascimento,
          },
        })

        toast.success('Matrícula atualizada com sucesso!', {
          description: data.msg,
        })
      } else {
        toast.error(data.msg, {
          description: data.error,
        })
      }
    },
  })

  const handleSubmitUpdateStudent = async (data: FormEdicaoMatriculaType) => {
    await salvarModificacoesMatricula(data)
  }

  return (
    <Form {...formMatriculaAluno}>
      <form
        onSubmit={formMatriculaAluno.handleSubmit(handleSubmitUpdateStudent)}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <FormField
              control={formMatriculaAluno.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF do aluno</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-2">
            <FormField
              control={formMatriculaAluno.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do aluno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <FormField
            control={formMatriculaAluno.control}
            name="rg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RG do aluno</FormLabel>
                <FormControl>
                  <Input placeholder="00.000.000-0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMatriculaAluno.control}
            name="ra"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RA do aluno</FormLabel>
                <FormControl>
                  <Input placeholder="00000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMatriculaAluno.control}
            name="dataNascimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de nascimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'P', {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Selecione a data de nascimento...</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode={'single'}
                      captionLayout="dropdown-buttons"
                      fromYear={1990}
                      toYear={new Date().getFullYear()}
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={ptBR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="flex items-center">
          <DialogClose>
            <Button
              type="button"
              className="bg-app-red-500 hover:bg-app-red-600 gap-2 shadow"
            >
              <ChevronLeft className="size-5" />
              Voltar
            </Button>
          </DialogClose>
          {formMatriculaAluno.formState.isSubmitting ? (
            <Button
              disabled
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
            >
              <Loader2 className="size-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
            >
              <Save />
              Salvar
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}
