import { Axios } from 'axios'

export async function uploadFileStorageExternal(file: string) {
  const form = new FormData()

  form.append('file', file)
  form.append('fileName', `report ${new Date().getUTCDate()}`)
  form.append('publicKey', 'public_lTsW6gacZDWr8HXTAg2GmS8ah8Q=')

  const axiosClient = new Axios({
    baseURL: 'https://upload.imagekit.io/api/v1/',
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Basic ${btoa('private_BUBOHpiaKuEsQol0px/QCZ8CoMk=')}`,
    },
  })

  const response = axiosClient
    .post('files/upload', form)
    .then((response) => {
      return {
        status: true,
        msg: 'Imagem salvo com sucesso',
        url: String(response.data.url),
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      return {
        status: false,
        msg: 'Erro ao salvar a imagem',
        url: null,
      }
    })

  return response
}
