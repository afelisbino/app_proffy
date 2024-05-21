import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function aplicarMascaraDocumento(valor: string): string {
  const valorNumeros = valor.replace(/\D/g, '')

  if (valorNumeros.length <= 11) {
    return valorNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.***.***-$4')
  }
  return valorNumeros.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.***.***/$4-$5',
  )
}

export function formatarDocumento(valor: string): string {
  const valorNumeros = valor.replace(/\D/g, '')

  if (valorNumeros.length <= 11) {
    return valorNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  return valorNumeros.replace(
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

export function validaCNPJ(cnpj: string) {
  if (cnpj === '') return false

  if (cnpj.length !== 14) return false

  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    return false
  }

  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  const digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--
    if (pos < 2) pos = 9
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== Number(digitos.charAt(0))) return false

  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--
    if (pos < 2) pos = 9
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== Number(digitos.charAt(1))) return false

  return true
}

export function validarCPF(cpf: string) {
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

export function validarDocumento(documento: string) {
  documento = documento.replace(/[^\d]+/g, '')

  return documento.length === 11 ? validarCPF(documento) : validaCNPJ(documento)
}

export function capturarIniciaisNome(nomeUsuario: string) {
  const parts = nomeUsuario.split(' ')
  const initials = parts.map((part: string) =>
    part.substring(0, 1).toUpperCase(),
  )
  return initials.join('')
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
