/**
 * Helper para fazer download de arquivos Blob
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * Formata o nome do arquivo de frequência PDF
 */
export function formatarNomeFrequenciaPDF(nomeAluno: string, dataInicio: string): string {
  const aluno = nomeAluno.toLowerCase().replace(/\s+/g, '-')
  return `frequencia-${aluno}-${dataInicio}.pdf`
}

/**
 * Formata o nome do arquivo de boletim PDF
 */
export function formatarNomeBoletimPDF(nomeAluno: string, ano: string): string {
  const aluno = nomeAluno.toLowerCase().replace(/\s+/g, '-')
  return `boletim-${aluno}-${ano}.pdf`
}
