import { atom, useAtom } from 'jotai'

import { TurmaType } from '@/app/admin/schemas/SchemaAlunosTurma'
import {
  MensagemAlunoType,
  ModeloMensagensType,
} from '@/app/admin/schemas/SchemaMensagemAlunos'

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

type ConfigModelosNotificacaoType = {
  selected: ModeloMensagensType['id'] | null
}

const ConfigAtomModelosNotificacao = atom<ConfigModelosNotificacaoType>({
  selected: null,
})

export function useModelosNotificacao() {
  return useAtom(ConfigAtomModelosNotificacao)
}
