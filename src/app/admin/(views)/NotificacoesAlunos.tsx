import { TabelaNotificacaoAlunosTurma } from '../components/tables/NotificacoesTurmas/tabela-alunos-turma'

export default function Notificacoes() {
  return (
    <TabelaNotificacaoAlunosTurma
      data={[
        {
          id: crypto.randomUUID(),
          nome: 'Teste da silva',
        },
      ]}
    />
  )
}
