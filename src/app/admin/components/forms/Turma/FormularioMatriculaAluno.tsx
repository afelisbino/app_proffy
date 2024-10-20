'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Loader2, Save, Trash } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { matricularAluno } from '@/app/admin/api/turma'
import {
  AlunosTurmaType,
  schemaFormularioMatriculaAluno,
} from '@/app/admin/schemas/SchemaAlunosTurma'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
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
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { cn, formatarDocumento } from '@/lib/utils'

export interface FormularioMatriculaAlunoProps {
  idTurma: string
}

export function FormularioMatriculaAluno({
  idTurma,
}: FormularioMatriculaAlunoProps) {
  const queryClient = useQueryClient()
  const formMatriculaAluno = useForm<
    z.infer<typeof schemaFormularioMatriculaAluno>
  >({
    resolver: zodResolver(schemaFormularioMatriculaAluno),
    defaultValues: {
      idTurma,
      nome: '',
      cpf: '',
      rg: '',
      ra: '',
      dataNascimento: new Date(),
      nomeResponsavel: '',
      cpfResponsavel: '',
      telefones: [
        {
          ddd: '',
          telefone: '',
          whatsapp: false,
        },
      ],
    },
    mode: 'onChange',
  })

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: formMatriculaAluno.control,
    name: 'telefones',
  })

  const { mutateAsync: matricular } = useMutation({
    mutationFn: ({
      idTurma,
      nome,
      cpf,
      rg,
      ra,
      dataNascimento,
      nomeResponsavel,
      cpfResponsavel,
      telefones,
    }: z.infer<typeof schemaFormularioMatriculaAluno>) =>
      matricularAluno({
        idTurma,
        nome,
        cpf,
        rg,
        ra,
        dataNascimento,
        nomeResponsavel,
        cpfResponsavel,
        telefones,
      }),
    onError: (erro) => {
      toast.error('Houve um problema ao matricular o aluno, tente novamente!', {
        description: erro.message,
      })
    },
    onSuccess: (data) => {
      const alunosTurma: Array<AlunosTurmaType> | undefined =
        queryClient.getQueryData(['listaAlunosTurma', idTurma])

      queryClient.setQueryData(
        ['listaAlunosTurma', idTurma],
        [...(alunosTurma ?? []), data],
      )

      formMatriculaAluno.reset()
    },
  })

  const salvar = async (
    dados: z.infer<typeof schemaFormularioMatriculaAluno>,
  ) => {
    if (dados.cpf === dados.cpfResponsavel) {
      toast.warning('O CPF do responsável não pode ser igual ao do aluno!')
    } else {
      await matricular(dados)
    }
  }

  return (
    <Form {...formMatriculaAluno}>
      <form
        onSubmit={formMatriculaAluno.handleSubmit(salvar)}
        className="space-y-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <FormField
            control={formMatriculaAluno.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF do aluno</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="000.000.000-00"
                    onChange={(event) => {
                      formMatriculaAluno.setValue(
                        'cpf',
                        formatarDocumento(event.target.value),
                      )
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <FormField
              control={formMatriculaAluno.control}
              name="cpfResponsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF do Responsável</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="000.000.000-00"
                      onChange={(event) => {
                        formMatriculaAluno.setValue(
                          'cpfResponsavel',
                          formatarDocumento(event.target.value),
                        )
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-2">
            <FormField
              control={formMatriculaAluno.control}
              name="nomeResponsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do responsável" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            onClick={() =>
              appendPhone({ ddd: '', telefone: '', whatsapp: false })
            }
          >
            Novo Telefone
          </Button>
          {phoneFields.map((telefone, index) => (
            <div key={index} className="grid gap-2 p-4 border rounded">
              <div className="flex flex-row items-center justify-between md:justify-start gap-2">
                <Button
                  className="shadow"
                  variant={'destructive'}
                  type="button"
                  onClick={() => removePhone(index)}
                >
                  <Trash />
                </Button>
                <div className="flex gap-2">
                  <FormField
                    key={telefone.id}
                    control={formMatriculaAluno.control}
                    name={`telefones.${index}.ddd`}
                    render={({ field }) => (
                      <FormItem className="w-full md:w-36">
                        <FormControl>
                          <Input {...field} placeholder="DDD" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    key={index}
                    control={formMatriculaAluno.control}
                    name={`telefones.${index}.telefone`}
                    render={({ field }) => (
                      <FormItem className="w-auto md:w-full">
                        <FormControl>
                          <Input {...field} placeholder="N° Telefone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={formMatriculaAluno.control}
                name={`telefones.${index}.whatsapp`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between md:justify-normal rounded-lg gap-4 w-full">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Notificações</FormLabel>
                      <FormDescription>
                        Ao marcar, este contato receberá notificações da escola
                        referente ao aluno
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
        <DialogFooter className="flex flex-col md:flex-row items-center gap-2">
          <DialogClose asChild>
            <Button variant={'destructive'} className="shadow w-full md:w-auto">
              Cancelar
            </Button>
          </DialogClose>
          {formMatriculaAluno.formState.isSubmitting ? (
            <Button
              disabled
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow w-full md:w-auto"
            >
              <Loader2 className="size-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow w-full md:w-auto"
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
