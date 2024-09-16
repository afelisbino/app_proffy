import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { TabelaDiarioClasse } from '../../components/tables/Diario/tabela-diario-classe'

export default function DiarioClasse() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Diário da Classe</CardTitle>
      </CardHeader>
      <CardContent>
        <TabelaDiarioClasse data={[]} idTurma={''} isLoading={false} />
      </CardContent>
    </Card>
  )
}
