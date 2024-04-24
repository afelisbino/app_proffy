import { TurmaType } from '@/app/admin/schemas/SchemaAlunosTurma'
import { MensagemAlunoType } from '@/app/admin/schemas/SchemaMensagemAlunos'
import { atom, useAtom } from 'jotai'

type ConfigMensagensAlunoType = {
  selected: MensagemAlunoType['id'] | null
}

const ConfigAtomMensagensAluno = atom<ConfigMensagensAlunoType>({
  selected: null,
})

export function useMensagemAluno() {
  return useAtom(ConfigAtomMensagensAluno)
}

type ConfigTurmaEscolaType = {
  selected: TurmaType['id'] | null
}

const ConfigAtomTurma = atom<ConfigTurmaEscolaType>({
  selected: null,
})

export function useTurmaEscola() {
  return useAtom(ConfigAtomTurma)
}
