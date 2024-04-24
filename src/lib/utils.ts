import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function aplicarMascaraDocumento(valor: string): string {
  const valorNumeros = valor.replace(/\D/g, '')

  if (valorNumeros.length <= 11) {
    return valorNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  } else {
    return valorNumeros.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    )
  }
}

export function validarCPF(cpf: string) {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

  if (!regex.test(cpf)) return false

  let sum, rest
  sum = 0

  if (cpf === '00000000000') return false

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cpf.substring(10, 11))) return false
  return true
}
