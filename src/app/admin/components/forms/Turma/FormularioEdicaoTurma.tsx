'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface FormularioEdicaoTurmaProps {
  idTurma: string
  nomeTurma: string
}

export function FormularioEdicaoTurma({
  idTurma,
  nomeTurma,
}: FormularioEdicaoTurmaProps) {
  const schemaFormularioEdicaoTurma = z.object({
    id: z.string().uuid(),
    nome: z.string({
      required_error: 'O nome da turma é obrigatório',
    }),
  })

  const formEdicaoTurma = useForm<z.infer<typeof schemaFormularioEdicaoTurma>>({
    resolver: zodResolver(schemaFormularioEdicaoTurma),
    defaultValues: {
      id: idTurma,
      nome: nomeTurma,
    },
    mode: 'onChange',
  })

  return (
    <Form {...formEdicaoTurma}>
      <form className="space-y-8">
        <FormField
          control={formEdicaoTurma.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da turma</FormLabel>
              <FormControl>
                <Input placeholder="1A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center">
          <Button
            type="submit"
            className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
          >
            <Save />
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
