import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { alterarPresencaChamada } from '@/api/turma'

export function useAlterarPresencaChamada() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      idChamada,
      presenca,
    }: {
      idChamada: string
      presenca: boolean
    }) => {
      return await alterarPresencaChamada(idChamada, presenca)
    },
    onSuccess: (data) => {
      toast.success(data.mensagem)
      
      // Invalidar caches relacionados
      queryClient.invalidateQueries({
        queryKey: ['historicoFrequencia'],
      })
      queryClient.invalidateQueries({
        queryKey: ['verifica-chamada-turma'],
      })
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.mensagem || 'Erro ao atualizar presença',
      )
    },
  })
}
