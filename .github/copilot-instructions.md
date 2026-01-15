# Proffy - Sistema de Gestão Escolar

## Visão Geral da Arquitetura

Este é um sistema Next.js 14 para gestão escolar (chamada, diários de classe, notificações via WhatsApp) com App Router, TypeScript e autenticação baseada em cookies. Backend separado acessado via REST API.

### Estrutura de Camadas

```
src/
├── app/           # Next.js App Router
│   ├── (private)/ # Rotas protegidas (requerem autenticação)
│   └── (public)/  # Rotas públicas (login)
├── api/           # Funções de comunicação com backend
├── components/    # Componentes React organizados por tipo
├── schemas/       # Validações Zod + tipos TypeScript
├── lib/           # Utilitários e configurações
└── hooks/         # Custom hooks (Jotai para estado)
```

## Padrões Críticos

### Autenticação e Autorização

- Autenticação via cookies: `session-user` e `session-company`
- Middleware em [src/middleware.ts](src/middleware.ts) protege rotas privadas
- Backend retorna cookies HTTP-only automaticamente
- Axios configurado com `withCredentials: true` em [src/lib/AxiosClient.ts](src/lib/AxiosClient.ts)
- **Nunca** manipule tokens manualmente no frontend

### Comunicação com Backend

```typescript
// Padrão: Funções na pasta api/ encapsulam chamadas
// src/api/turma.ts
export async function buscarTurmas() {
  const response = await axiosInstance.get<Array<turmaType>>('turma')
  return response.data
}
```

- Use `axiosInstance` de [src/lib/AxiosClient.ts](src/lib/AxiosClient.ts)
- URL base: `process.env.NEXT_PUBLIC_API_URL`
- Tipos de resposta definidos inline ou importados de schemas

### Validação e Schemas

- Todos os formulários usam Zod + react-hook-form
- Schemas em `src/schemas/` definem **tanto** validação quanto tipos TypeScript
- Exemplo: `schemaAlunosTurma` valida CPF com função customizada [src/schemas/SchemaAlunosTurma.tsx](src/schemas/SchemaAlunosTurma.tsx)

```typescript
// Padrão de schema com validação customizada
cpf: z.string().refine(validarCPF, { message: 'CPF inválido' })
```

### Componentes de UI (shadcn/ui)

- Componentes base em `src/components/ui/` (não editar diretamente)
- Customizações via Tailwind CSS e variantes CVA
- Dialogs seguem padrão: trigger externo + estado controlado
- **Sempre** use componentes existentes antes de criar novos

### Gerenciamento de Estado

- React Query (TanStack Query) para cache de server state
- **searchParams** do Next.js para estado compartilhado na URL (turma, filtros, períodos)
- Jotai para estado local temporário (ex: [src/lib/use-case.ts](src/lib/use-case.ts) para seleção de mensagens)
- **Não** use Context API, Redux ou hooks customizados (como `useTurmaEscola`) - prefira searchParams + React Query

### Padrão SearchParams (Persistência de Estado na URL)

**Quando usar**: Filtros, seleção de turma, período, ou qualquer estado que deve ser compartilhado/preservado

```typescript
// Padrão completo de searchParams
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const turmaSelecionada = searchParams.get('turma') ?? ''
  const periodo = searchParams.get('periodo') ?? ''
  
  const handleSelecionarTurma = (turmaId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('turma', turmaId)
    router.push(`?${params.toString()}`, { scroll: false })
  }
  
  // Use nos queryKeys do React Query
  const { data } = useQuery({
    queryKey: ['dados', turmaSelecionada, periodo],
    queryFn: () => buscarDados(turmaSelecionada, periodo),
    enabled: !!turmaSelecionada
  })
  
  return (
    <Select value={turmaSelecionada} onValueChange={handleSelecionarTurma}>
      {/* ... */}
    </Select>
  )
}
```

**Benefícios**:
- Estado persiste em URLs compartilháveis
- Histórico do navegador funciona corretamente
- Queries React Query invalidam automaticamente ao mudar params
- Componentes recebem props simples (string) ao invés de objetos complexos

### Estrutura de Dialogs

```typescript
// Padrão: Props incluem trigger e callbacks de sucesso
export function MatriculaAlunoDialog({ 
  children,    // Trigger element
  idTurma,
  onSucesso    // Callback pós-mutação
}: Props) {
  // Usa React Query mutation
  // Invalidate queries relacionadas no onSuccess
}
```

Localização: `src/components/dialogs/` - todos seguem este padrão

## Fluxos de Desenvolvimento

### Adicionar Nova Feature de API

1. Criar função em `src/api/[nome].ts` com tipos definidos
2. Criar schema Zod em `src/schemas/` se necessário
3. Usar React Query hook no componente:
   ```typescript
   const { data } = useQuery({
     queryKey: ['turmas'],
     queryFn: buscarTurmas
   })
   ```

### Criar Novo Formulário

1. Definir schema em `src/schemas/`
2. Criar componente dialog em `src/components/dialogs/`
3. Usar `useForm` com `zodResolver`
4. Mutation com `useMutation` e invalidação de queries

### Rodar Ambiente Local

```bash
pnpm install
pnpm dev  # Localhost:3000
```

**Importante**: Configure `NEXT_PUBLIC_API_URL` no `.env.local` apontando para o backend

### Build e Deploy

```bash
pnpm build
pnpm start
```

Output: `standalone` (veja [next.config.js](next.config.js)) - pronto para Docker

## Convenções Específicas

### Nomenclatura

- Arquivos de componentes: PascalCase com sufixo descritivo
  - `MatriculaAlunoDialog.tsx`
  - `FormChamadaTurma.tsx`
- Funções de API: camelCase descritivo
  - `buscarAlunosTurma()`
  - `matricularAluno()`
- Schemas: prefixo `schema` + tipo
  - `schemaAlunosTurma`

### Utilitários Comuns

- [src/lib/utils.ts](src/lib/utils.ts): `cn()` para classes, `validarCPF()`, `limparFormatacaoDocumento()`
- Formatação de datas: `date-fns`
- Notificações: `sonner` (toast)

### Integração WhatsApp

- Fluxo: Frontend → Backend → WhatsApp API
- Funções em [src/api/message.ts](src/api/message.ts)
- Usa modelos de mensagem reutilizáveis (tabela no banco)

## Diretrizes de Edição

- **Path aliases**: Use `@/` configurado em [tsconfig.json](tsconfig.json)
- **Não** crie componentes em `src/components/ui/` - são do shadcn
- **Sempre** valide com Zod antes de enviar ao backend
- **Server Components** por padrão; marque `'use client'` apenas quando necessário
- Prefira Server Actions para mutations simples (ainda não implementado - use React Query por ora)

## Consultando Documentação de Bibliotecas

**Use o MCP Context7 (#upstash/context7) para obter documentação atualizada:**

Quando precisar de informações sobre bibliotecas do projeto, use o Context7 para obter documentação precisa e atualizada. Bibliotecas principais deste projeto:

- **Next.js** (`/vercel/next.js`) - App Router, Server Components, middleware
- **React Query** (`/@tanstack/react-query`) - Cache de servidor, mutations, invalidação
- **Zod** (`/colinhacks/zod`) - Validação de schemas e tipos
- **React Hook Form** (`/react-hook-form/react-hook-form`) - Gerenciamento de formulários
- **Tailwind CSS** (`/tailwindlabs/tailwindcss`) - Estilização e classes utilitárias
- **Axios** (`/axios/axios`) - Cliente HTTP
- **Jotai** (`/pmndrs/jotai`) - Gerenciamento de estado atômico
- **date-fns** (`/date-fns/date-fns`) - Manipulação de datas
- **shadcn/ui** - Componentes base (Radix UI + Tailwind)

**Exemplo de uso:**
```
Preciso implementar uma mutação React Query que invalide múltiplas queries após sucesso.
Use #upstash/context7 para consultar a documentação do @tanstack/react-query.
```

Sempre que tiver dúvidas sobre APIs, hooks, ou padrões específicos de uma biblioteca, consulte a documentação via Context7 antes de implementar.
## Funcionalidades Implementadas

### Relatórios de Desempenho Escolar

**Localização**: `src/app/(private)/classe/relatorio_desempenho/page.tsx`

Sistema completo de relatórios de desempenho com três funcionalidades principais:

#### 1. Relatórios Textuais (Observações do Professor)
- **API**: `src/api/relatorios.ts` - Funções `listarRelatorios()`, `criarRelatorio()`, `atualizarRelatorio()`
- **Schema**: `src/schemas/SchemaRelatorios.ts` - Validações Zod para criação e atualização
- **Hooks**: `src/hooks/use-relatorios.tsx` - React Query hooks com invalidação automática
- **Componentes**:
  - `RelatoriosManager` - Lista com filtros (turma, professor, período, tipo)
  - `RelatorioFormDialog` - Form para criar/editar com contador de caracteres (limite 5000)
  - `RelatorioViewerDialog` - Visualização completa com opção de editar
- **Tipos de Período**: mensal (12), bimestral (4), trimestral (4), semestral (2)
- **⚠️ Importante**: O `idProfessor` é obtido automaticamente do cookie `session-user` no backend ao criar relatórios. O formulário não deve incluir campo para professor.

#### 2. Relatório de Frequência (PDF)
- **API**: `gerarFrequenciaPDF()` - Retorna Blob com `responseType: 'blob'`
- **Schema**: `schemaGerarFrequenciaPDF` - Valida datas (dataInicio <= dataFim)
- **Hook**: `useGerarFrequenciaPDF()` - Download automático com nome formatado
- **Componente**: `FrequenciaPDFGenerator` - Form com DatePickers (Calendar do shadcn)
- **Helper**: `src/lib/download.ts` - Função `downloadBlob()` para download automático
- **PDF Contém**: Tabela de chamadas, resumo de frequência, percentuais coloridos

#### 3. Boletim Escolar (PDF com Análise Comparativa)
- **API**: `gerarBoletimPDF()` - Converte array de períodos em CSV
- **Schema**: `schemaGerarBoletimPDF` - Valida ano (4 dígitos), múltiplos períodos (1-12)
- **Hook**: `useGerarBoletimPDF()` - Download automático
- **Componente**: `BoletimPDFGenerator` - CheckboxGroup para múltiplos períodos
- **Análise Comparativa**:
  - ↑ Melhora (verde): Diferença > 1%
  - ↓ Piora (vermelho): Diferença < -1%
  - = Estável (cinza): Variação entre -1% e 1%
- **PDF Contém**: Notas por disciplina, médias, comparação com período anterior

#### Padrões Utilizados
```typescript
// Download de PDF com nome dinâmico
const { mutate: gerarPDF } = useGerarFrequenciaPDF()
gerarPDF({ params, nomeAluno }, {
  onSuccess: (blob) => {
    const filename = formatarNomeFrequenciaPDF(nomeAluno, dataInicio)
    downloadBlob(blob, filename)
    toast.success('PDF gerado!')
  }
})

// Filtros opcionais em queries
const { data } = useListarRelatorios({
  idTurma: '123',
  tipoPeriodo: 'bimestral',
  periodo: '1'
})
```

**Lições Aprendidas**:
- Para PDFs: Sempre usar `responseType: 'blob'` no Axios
- Helper `downloadBlob()` cria link temporário e limpa após download
- Validação de datas com `.refine()` no Zod
- CheckboxGroup para múltiplas seleções (períodos)
- Contador de caracteres com `form.watch()` e `useEffect()`
- Tabs do shadcn/ui para organizar múltiplas funcionalidades em uma página
- Cards informativos para orientar usuário sobre funcionalidades complexas
- **Segurança**: ID do professor obtido automaticamente do cookie `session-user` no backend, nunca enviar manualmente no frontend

---

### Alteração de Presença em Chamada

**Localização**: Implementado em múltiplos arquivos

Sistema completo para correção de presença/ausência de alunos em chamadas já realizadas.

#### Componentes Principais

1. **API e Tipos** (`src/api/turma.ts`):
```typescript
export interface AlterarPresencaChamadaResponse {
  mensagem: string
  presenca: boolean
}

export async function alterarPresencaChamada(
  idChamada: string,
  presenca: boolean,
): Promise<AlterarPresencaChamadaResponse> {
  const response = await axiosInstance.patch<AlterarPresencaChamadaResponse>(
    `/turma/chamada/${idChamada}`,
    { presenca },
  )
  return response.data
}
```

2. **Hook React Query** (`src/hooks/use-chamada.tsx`):
```typescript
export function useAlterarPresencaChamada() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ idChamada, presenca }) => {
      return await alterarPresencaChamada(idChamada, presenca)
    },
    onSuccess: (data) => {
      toast.success(data.mensagem)
      queryClient.invalidateQueries({ queryKey: ['historicoFrequencia'] })
      queryClient.invalidateQueries({ queryKey: ['verifica-chamada-turma'] })
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.mensagem || 'Erro ao atualizar presença')
    },
  })
}
```

3. **Dialog de Confirmação** (`src/components/dialogs/confirmar-alteracao-presenca.tsx`):
- AlertDialog do shadcn/ui
- Badges visuais comparando status atual vs. novo
- Estados de loading
- Cores: verde (presente), vermelho (ausente)

4. **Menu de Ações em Tabela** (`src/components/tables/ConfirmacaoChamada/colunas-tabela-alunos-ausentes.tsx`):
- DropdownMenu com opções "Marcar como presente" e "Marcar como ausente"
- Desabilita automaticamente a opção já selecionada
- Badges coloridos na coluna de presença
- Ícones: Check (presente), X (ausente)

#### Padrões Implementados

```typescript
// Coluna de ações com estado local
function AcoesPresenca({ aluno }: { aluno: AlunoAusentesType }) {
  const [dialogState, setDialogState] = useState<{
    open: boolean
    novaPresenca: boolean
  }>({ open: false, novaPresenca: false })

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setDialogState({ open: true, novaPresenca: true })}
            disabled={aluno.presenca}
          >
            <Check className="mr-2 h-4 w-4 text-green-600" />
            Marcar como presente
          </DropdownMenuItem>
          {/* ... */}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <ConfirmarAlteracaoPresencaDialog
        idChamada={aluno.id}
        presencaAtual={aluno.presenca}
        novaPresenca={dialogState.novaPresenca}
        nomeAluno={aluno.nome}
        open={dialogState.open}
        onOpenChange={(open) => setDialogState({ ...dialogState, open })}
      />
    </>
  )
}
```

**Badges Visuais**:
```tsx
<Badge
  variant={presenca ? 'default' : 'destructive'}
  className={
    presenca
      ? 'bg-green-100 text-green-800 hover:bg-green-200'
      : 'bg-red-100 text-red-800 hover:bg-red-200'
  }
>
  {presenca ? (
    <>
      <Check className="mr-1 h-3 w-3" />
      Presente
    </>
  ) : (
    <>
      <X className="mr-1 h-3 w-3" />
      Ausente
    </>
  )}
</Badge>
```

**Lições Aprendidas**:
- Use DropdownMenu para ações em linhas de tabela
- AlertDialog (não Dialog) para confirmações simples
- Estado local no componente de coluna para controlar dialog
- Desabilite opções já selecionadas para melhor UX
- Badges coloridos oferecem feedback visual imediato
- Invalidar queries relacionadas após mutação bem-sucedida
- Use `disabled={isPending}` em todos os botões durante loading
- Componentes de coluna podem ter estado próprio com `useState`