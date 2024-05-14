'use client'

import { MessageSquareWarning, Percent, Users } from 'lucide-react'

import FrequenciaAlunosChart from '@/app/components/charts/FrequenciaAlunos'
import NotificacoesTurmasChart from '@/app/components/charts/NotificacaoTurmas'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import ListagemAlunosAusentes from '../components/lists/ListagemAlunosAusentes'
export default function Dashboard() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 space-y-3 space-x-0 md:space-y-0 md:space-x-3">
        <div>
          <Card className="border-l-4 border-l-app-green-500 shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suas turmas</CardTitle>
              <Users />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                A escola possui tem 10 turmas
              </p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-l-4 border-l-app-green-500 shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Frequência</CardTitle>
              <Percent />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                A média da escola é de 50%
              </p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-l-4 border-l-app-green-500 shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Notificações
              </CardTitle>
              <MessageSquareWarning />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50</div>
              <p className="text-xs text-muted-foreground">
                A média da escola é de 120
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 space-y-3 space-x-0 lg:space-x-3 lg:space-y-0">
        <div className="lg:col-span-2">
          <Card className="shadow lg:mb-2 md:min-h-full">
            <CardHeader>
              <CardTitle>Alunos com mais faltas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ListagemAlunosAusentes />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="shadow lg:mb-2 md:min-h-full">
            <CardHeader>
              <CardTitle>Estatísticas de notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <NotificacoesTurmasChart
                series={[22, 32, 52, 15, 19]}
                labels={[
                  'catgoria a',
                  'categoria b',
                  'categoria c',
                  'categoria d',
                  'categoria e',
                ]}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card className="shadow lg:mb-2 md:min-h-full">
            <CardHeader>
              <CardTitle>Estatísticas de frequência</CardTitle>
            </CardHeader>
            <CardContent>
              <FrequenciaAlunosChart
                categories={['02/2024', '03/2024']}
                series={[
                  {
                    data: [15, 22],
                    color: '#027313',
                    name: 'Presença',
                  },
                  {
                    data: [12, 32],
                    color: '#BF0A0A',
                    name: 'Ausentes',
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
