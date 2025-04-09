'use client'

import { useQuery } from '@tanstack/react-query'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { buscarListaDisciplinas } from '@/api/escola'
import { FormNovaDisciplina } from '@/components/forms/NovaDisciplina'
import { ItemDisciplina } from '@/components/lists/ItemDisciplina'

export default function DisciplinasEscolaPage() {
  const disciplinas = useQuery({
    queryKey: ['listaDisciplinaEscola'],
    queryFn: buscarListaDisciplinas,
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
      <div className="col-span-1 md:col-span-3">
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
      </div>
      <div className="col-span-1 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Disciplinas da escola</CardTitle>
            <CardDescription>Disciplinas vinculadas a escola</CardDescription>
          </CardHeader>
          <CardContent>
            {disciplinas.isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full rounded" />
                <Skeleton className="h-10 w-full rounded" />
                <Skeleton className="h-10 w-full rounded" />
              </div>
            ) : (
              <ScrollArea className="max-h-52 overflow-auto">
                {disciplinas.data?.map((disciplina) => (
                  <ItemDisciplina
                    key={disciplina.id}
                    id={disciplina.id}
                    nome={disciplina.nome}
                  />
                ))}
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
