import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

let displayedNetworkFailureError = false

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        if (failureCount >= 1) {
          if (displayedNetworkFailureError === false) {
            displayedNetworkFailureError = true

            toast.error(
              'A aplicação está demorando mais que o esperado para carregar, tente novamente em alguns minutos.',
              {
                onDismiss: () => {
                  displayedNetworkFailureError = false
                },
              },
            )
          }

          return false
        } else if (error) {
          if (error.message.includes('401')) {
            toast.error('Acesso não autorizado!')
            return false
          } else {
            toast.error('Erro ao tentar processar uma informação')
            return false
          }
        }

        return true
      },
    },
    mutations: {
      onError(error) {
        if (isAxiosError(error)) {
          if ('message' in error.response?.data) {
            toast.error(error.response?.data.message)
          } else {
            toast.error('Erro ao processar operação!')
          }
        }
      },
    },
  },
})
