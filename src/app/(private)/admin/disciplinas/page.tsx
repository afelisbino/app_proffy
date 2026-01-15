'use client'

import { useQuery } from '@tanstack/react-query'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { buscarListaDisciplinas } from '@/api/escola'
import { FormNovaDisciplina } from '@/components/forms/NovaDisciplina'
import { DataTableDisciplinas } from '@/components/tables/Disciplinas/tabela-disciplinas'

export default function DisciplinasEscolaPage() {
  const disciplinas = useQuery({
    queryKey: ['listaDisciplinaEscola'],
    queryFn: buscarListaDisciplinas,
  })

  return (
    <div className="grid grid-cols-1 gap-2">
      <Card className="h-full pb-4">
        <CardHeader>
          <CardTitle>Nova Disciplina</CardTitle>
          <CardDescription>
            Criar uma nova disciplina e vincular na escola
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormNovaDisciplina />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Disciplinas da escola</CardTitle>
          <CardDescription>Disciplinas vinculadas a escola</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTableDisciplinas
            data={disciplinas.data ?? []}
            isLoading={disciplinas.isLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
