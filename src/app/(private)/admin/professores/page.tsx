'use client'

import { useQuery } from '@tanstack/react-query'
import { UserCog } from 'lucide-react'
import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

import { buscarUsuariosEscola } from '@/api/escola'
import { listarVinculos } from '@/api/turmas-professor'
import { DataTableVinculos } from '@/components/tables/VinculosProfessores/tabela-vinculos'
import { GerenciarVinculosDialog } from '@/components/dialogs/gerenciar-vinculos-professor'

export default function ProfessoresPage() {
  const [professorSelecionado, setProfessorSelecionado] = useState<string>('')
  const [dialogAberto, setDialogAberto] = useState(false)

  const { data: professores, isLoading: carregandoProfessores } = useQuery({
    queryKey: ['professores'],
    queryFn: () => buscarUsuariosEscola('PROFESSOR'),
  })

  const { data: vinculos, isLoading: carregandoVinculos } = useQuery({
    queryKey: ['vinculos-professores', professorSelecionado],
    queryFn: () =>
      listarVinculos(
        professorSelecionado ? { idProfessor: professorSelecionado } : undefined,
      ),
  })

  const professorAtual = professores?.find((p) => p.id === professorSelecionado)

  const handleAbrirDialog = () => {
    if (professorSelecionado) {
      setDialogAberto(true)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar vínculos de professores</CardTitle>
          <CardDescription>
            Vincule turmas aos professores da escola
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {carregandoProfessores ? (
              <Skeleton className="h-10 w-full rounded" />
            ) : (
              <Select
                value={professorSelecionado}
                onValueChange={setProfessorSelecionado}
              >
                <SelectTrigger className="w-full md:flex-1">
                  <SelectValue placeholder="Selecione um professor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className='space-y-2'>
                    <SelectLabel>Professores</SelectLabel>
                    <div>
                      {professores?.map((professor) => (
                        <SelectItem key={professor.id} value={professor.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{professor.nome}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}

            <Button
              onClick={handleAbrirDialog}
              disabled={!professorSelecionado}
              className="w-full md:w-auto gap-2"
            >
              Gerenciar turmas
            </Button>
          </div>
        </CardContent>
      </Card>

      {professorSelecionado && (
        <Card>
          <CardHeader>
            <CardTitle>Turmas vinculadas</CardTitle>
            <CardDescription>
              Lista de turmas vinculadas ao professor selecionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTableVinculos
              data={vinculos?.vinculos ?? []}
              isLoading={carregandoVinculos}
            />
          </CardContent>
        </Card>
      )}

      {!professorSelecionado && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <UserCog className="h-16 w-16 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">Nenhum professor selecionado</h3>
                <p className="text-sm text-muted-foreground">
                  Selecione um professor acima para visualizar e gerenciar seus vínculos
                  com turmas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {professorAtual && (
        <GerenciarVinculosDialog
          professorId={professorSelecionado}
          professorNome={professorAtual.nome}
          open={dialogAberto}
          onOpenChange={setDialogAberto}
        />
      )}
    </div>
  )
}
