import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function aplicarMascaraDocumento(documento: string): string {
  documento = documento.replace(/[^\d]+/g, '')

  if (documento.length <= 11) {
    return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.***.***-$4')
  }
  return documento.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.***.***/$4-$5',
  )
}

export function formatarDocumento(documento: string): string {
  documento = documento.replace(/[^\d]+/g, '')

  if (documento.length <= 11) {
    return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  return documento.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5',
  )
}

export function formatarValorMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

export function limparFormatacaoDocumento(documento: string): string {
  return documento.replace(/[^\d]+/g, '')
}

export function validarCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, '')

  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false
  }

  let sum, rest
  sum = 0

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }

  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cpf.substring(9, 10))) return false

  sum = 0

  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }
  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cpf.substring(10, 11))) return false

  return true
}

export function capturarIniciaisNome(nomeUsuario: string) {
  const parts = nomeUsuario.split(' ')
  const initials = parts.map((part: string) =>
    part.substring(0, 1).toUpperCase(),
  )
  return initials.join('')
}

export function mascararNome(nome: string) {
  const parts = nome.split(' ')

  return `${parts[0]} ${parts[1]}`
}

export function encodeFileToBase64(file: File | string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof file === 'string') {
      resolve(btoa(file))
    } else {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    }
  })
}
