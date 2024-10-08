import { atom, useAtom } from 'jotai'

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

type ConfigModelosNotificacaoType = {
  selected: ModeloMensagensType['id'] | null
}

const ConfigAtomModelosNotificacao = atom<ConfigModelosNotificacaoType>({
  selected: null,
})

export function useModelosNotificacao() {
  return useAtom(ConfigAtomModelosNotificacao)
}
